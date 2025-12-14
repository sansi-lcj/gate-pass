'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function updateSystemConfigAction(prevState: unknown, formData: FormData) {
  const session = await getSession();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const eventTime = formData.get('eventTime') as string;
  const eventEndTime = formData.get('eventEndTime') as string;
  const meetingLink = formData.get('meetingLink') as string;
  const wecomWebhook = formData.get('wecomWebhook') as string;

  try {
    await prisma.systemConfig.upsert({
      where: { id: 'global' },
      update: {
        eventTime: eventTime || null,
        eventEndTime: eventEndTime || null,
        meetingLink: meetingLink || null,
        wecomWebhook: wecomWebhook || null,
      },
      create: {
        id: 'global',
        eventTime,
        eventEndTime,
        meetingLink,
        wecomWebhook,
      },
    });

    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to update config:', error);
    return { error: 'Failed to update configuration' };
  }
}

// Get all sales users
export async function getSalesUsers() {
  const session = await getSession();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return [];
  }

  return prisma.user.findMany({
    where: { role: 'SALES' },
    select: {
      id: true,
      username: true,
      name: true,
      isActive: true,
      wechatId: true,
      createdAt: true,
      _count: { select: { invitations: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

// Create new sales user
export async function createSalesUserAction(prevState: unknown, formData: FormData) {
  const session = await getSession();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const username = formData.get('username') as string;
  const name = formData.get('name') as string;
  const wechatId = formData.get('wechatId') as string;

  if (!username) {
    return { error: 'Username is required' };
  }

  // Check if username exists
  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return { error: 'Username already exists' };
  }

  // Generate random password
  const bcrypt = await import('bcryptjs');
  const randomPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  try {
    await prisma.user.create({
      data: {
        username,
        name: name || null,
        password: hashedPassword,
        role: 'SALES',
        wechatId: wechatId || null,
      },
    });

    revalidatePath('/admin/users');
    return { success: true, password: randomPassword };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { error: 'Failed to create user' };
  }
}

// Toggle user active status
export async function toggleUserActiveAction(userId: string) {
  const session = await getSession();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { error: 'User not found' };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { isActive: !user.isActive },
  });

  revalidatePath('/admin/users');
  return { success: true };
}

// Reset user password
export async function resetPasswordAction(userId: string) {
  const session = await getSession();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const bcrypt = await import('bcryptjs');
  const randomPassword = Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  revalidatePath('/admin/users');
  return { success: true, password: randomPassword };
}

// Export accepted guests as CSV
export async function exportAcceptedGuestsCSV() {
  const session = await getSession();
  if (!session?.user?.role || session.user.role !== 'ADMIN') {
    return null;
  }

  const invitations = await prisma.invitation.findMany({
    where: { status: 'ACCEPTED' },
    include: { createdBy: { select: { username: true, name: true } } },
    orderBy: { acceptedAt: 'desc' },
  });

  const header = 'Guest Name,Discount Code,Language,Accepted At,Created By\n';
  const rows = invitations.map((inv: any) => 
    `"${inv.guestName}","${inv.discountCode}","${inv.language}","${inv.acceptedAt?.toISOString() || ''}","${inv.createdBy.name || inv.createdBy.username}"`
  ).join('\n');

  return header + rows;
}
