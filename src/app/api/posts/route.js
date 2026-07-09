import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Create new post
    const post = await Post.create(body);
    
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error saving post:', error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: 'A post with this ID already exists.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Failed to save post' }, { status: 500 });
  }
}
