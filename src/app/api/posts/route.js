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
    
    // Create new post locally
    const post = await Post.create(body);

    // Cross-post to dev.to if API key is present, post is not private, and user opted in
    if (!body.isPrivate && body.postToDevTo && process.env.DEVTO_API_KEY) {
      try {
        const devToRes = await fetch('https://dev.to/api/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.DEVTO_API_KEY
          },
          body: JSON.stringify({
            article: {
              title: body.title,
              body_markdown: body.content,
              published: true
            }
          })
        });

        if (!devToRes.ok) {
          console.error('Failed to cross-post to dev.to:', await devToRes.text());
        } else {
          console.log('Successfully cross-posted to dev.to!');
        }
      } catch (devToError) {
        console.error('Error in dev.to cross-posting block:', devToError);
      }
    }
    
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
