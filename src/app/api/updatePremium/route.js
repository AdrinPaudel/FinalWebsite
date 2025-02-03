import { handlePremiumUpdate } from '../write2Json.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { formData, premium } = await request.json();
    handlePremiumUpdate(formData, premium);
    return NextResponse.json({ message: 'Premium updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Premium update error:', error);
    return NextResponse.json({ error: 'Failed to update premium' }, { status: 500 });
  }
}
