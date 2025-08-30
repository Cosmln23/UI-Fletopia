import { NextResponse, type NextRequest } from 'next/server';
import { updateProfileAction } from '@/app/(app)/settings/actions';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const result = await updateProfileAction(form);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result, { status: 200 });
}


