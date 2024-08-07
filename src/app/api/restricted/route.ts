import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    return NextResponse.json({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    return NextResponse.json({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}