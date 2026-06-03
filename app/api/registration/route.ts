import { NextResponse } from 'next/server';

// for test purposes
export async function GET() {
    return NextResponse.json({ message: 'ok' });
}
