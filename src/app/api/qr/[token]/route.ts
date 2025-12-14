import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { token } = await params;

  // Verify invitation exists
  const invitation = await prisma.invitation.findUnique({
    where: { uniqueToken: token },
  });

  if (!invitation) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Generate QR code URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const inviteUrl = `${baseUrl}/invite/${token}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(inviteUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    // Return as base64 data URL
    return NextResponse.json({ 
      qrCode: qrDataUrl,
      url: inviteUrl,
    });
  } catch (error) {
    console.error('QR generation error:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
