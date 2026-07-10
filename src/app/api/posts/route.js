import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

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

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  try {
    await dbConnect();
    
    // Fetch only public posts for the static blog
    const posts = await Post.find({ isPrivate: { $ne: true } }).sort({ date: -1 }).lean();
    
    return NextResponse.json(posts, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch posts' }, { status: 500, headers: corsHeaders });
  }
}
