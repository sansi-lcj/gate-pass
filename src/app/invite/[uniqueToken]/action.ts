'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type InvitationStatus = 'PENDING' | 'OPENED' | 'ACCEPTED' | 'DECLINED';

export async function respondInvitation(token: string, status: InvitationStatus) {
  const invitation = await prisma.invitation.findUnique({
    where: { uniqueToken: token },
    include: { 
      createdBy: {
        select: { wechatId: true, name: true }
      }
    },
  });

  if (!invitation) return { error: 'Not found' };
  
  // Build update data based on status
  const updateData: Record<string, unknown> = { status };
  
  if (status === 'ACCEPTED') {
    updateData.acceptedAt = new Date();
  } else if (status === 'DECLINED') {
    updateData.declinedAt = new Date();
  }
  
  // Update status
  await prisma.invitation.update({
    where: { id: invitation.id },
    data: updateData,
  });

  // Trigger WeCom Notification
  if (status === 'ACCEPTED' || status === 'DECLINED') {
    await sendWeComNotification(invitation, status);
  }

  revalidatePath(`/invite/${token}`);
  return { success: true };
}

// Track visit and update status to OPENED on first visit
export async function trackVisit(token: string, userAgent?: string) {
  const invitation = await prisma.invitation.findUnique({
    where: { uniqueToken: token },
  });

  if (!invitation) return;

  const updateData: Record<string, unknown> = {
    visitCount: { increment: 1 },
  };

  // First visit - update status to OPENED
  if (invitation.status === 'PENDING') {
    updateData.status = 'OPENED';
    updateData.openedAt = new Date();
  }

  if (userAgent) {
    updateData.userAgent = userAgent;
  }

  await prisma.invitation.update({
    where: { id: invitation.id },
    data: updateData,
  });
}

// Send WeCom Webhook Notification with logging
async function sendWeComNotification(
  invitation: { id: string; guestName: string; discountCode: string | null; createdBy: { wechatId: string | null; name: string | null } },
  status: 'ACCEPTED' | 'DECLINED'
) {
  // Get webhook URL from SystemConfig
  const config = await prisma.systemConfig.findUnique({ where: { id: 'global' } });
  
  if (!config?.wecomWebhook) {
    console.log(`[WeCom] No webhook configured. Guest ${invitation.guestName} ${status}`);
    // Log even when no webhook configured
    await prisma.notificationLog.create({
      data: {
        invitationId: invitation.id,
        guestName: invitation.guestName,
        status,
        success: false,
        errorMessage: 'No webhook URL configured',
      },
    });
    return;
  }

  const statusEmoji = status === 'ACCEPTED' ? '✅' : '❌';
  const statusText = status === 'ACCEPTED' ? '已接受' : '已拒绝';
  const mentionTag = invitation.createdBy.wechatId ? `<@${invitation.createdBy.wechatId}>` : '';
  
  const content = `**📩 邀请函反馈通知**
> 客户: **${invitation.guestName}**
> 状态: ${statusEmoji} <font color="${status === 'ACCEPTED' ? 'info' : 'warning'}">${statusText}</font>
${status === 'ACCEPTED' && invitation.discountCode ? `> 折扣码: \`${invitation.discountCode}\`` : ''}
> ${mentionTag}`;

  try {
    const response = await fetch(config.wecomWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        msgtype: 'markdown',
        markdown: { content },
      }),
    });

    // Log to database
    await prisma.notificationLog.create({
      data: {
        invitationId: invitation.id,
        guestName: invitation.guestName,
        status,
        success: response.ok,
        httpStatus: response.status,
        errorMessage: response.ok ? null : `HTTP ${response.status}`,
      },
    });

    if (!response.ok) {
      console.error(`[WeCom] Webhook failed: ${response.status}`);
    } else {
      console.log(`[WeCom] Notification sent for ${invitation.guestName}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[WeCom] Webhook error:`, error);
    
    // Log failure to database
    await prisma.notificationLog.create({
      data: {
        invitationId: invitation.id,
        guestName: invitation.guestName,
        status,
        success: false,
        errorMessage,
      },
    });
  }
}
