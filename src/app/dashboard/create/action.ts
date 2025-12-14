'use server'

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { nanoid } from 'nanoid';

export async function createInvitationAction(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: 'Unauthorized' };
  }

  const guestName = formData.get('guestName') as string;
  const styleId = formData.get('styleId') as string;
  const language = formData.get('language') as string || 'en';
  const salesNote = formData.get('salesNote') as string;

  if (!guestName || !styleId) {
    return { error: 'Missing required fields' };
  }

  const user = await prisma.user.findUnique({ where: { username: session.user?.username }});
  if (!user) return { error: 'User not found' };

  try {
    const uniqueToken = nanoid(10);
    // Discount code logic? Random for now.
    const discountCode = 'RS-' + nanoid(6).toUpperCase();

    await prisma.invitation.create({
      data: {
        guestName,
        styleId,
        language,
        salesNote,
        userId: user.id,
        uniqueToken,
        discountCode,
      }
    });
  } catch (e) {
    console.error(e);
    return { error: 'Failed to create invitation' };
  }

  redirect('/dashboard/invitations');
}
