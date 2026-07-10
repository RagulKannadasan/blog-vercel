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
    const { postToDevTo, ...postData } = await request.json();
    
    // Create new post locally
    const post = await Post.create(postData);

    // Cross-post to dev.to if API key is present, post is not private, and user opted in
    if (!postData.isPrivate && postToDevTo && process.env.DEVTO_API_KEY) {
      try {
        const devToRes = await fetch('https://dev.to/api/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.DEVTO_API_KEY
          },
          body: JSON.stringify({
            article: {
              title: postData.title,
              body_markdown: postData.content,
              published: true,
              tags: postData.tags || []
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
    return NextResponse.json({ success: false, message: error.message || 'Failed to save post' }, { status: 500 });
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
    let posts = await Post.find({ isPrivate: { $ne: true } }).sort({ date: -1 }).lean();
    
    // Fetch from dev.to
    if (process.env.DEVTO_API_KEY) {
      try {
        const devToRes = await fetch('https://dev.to/api/articles/me/published', {
          headers: {
            'api-key': process.env.DEVTO_API_KEY
          }
        });
        
        if (devToRes.ok) {
          const devToArticles = await devToRes.json();
          
          // Create a Set of local post titles for deduplication (case-insensitive)
          const localTitles = new Set(posts.map(p => p.title.toLowerCase().trim()));
          
          const externalPosts = devToArticles
            .filter(article => !localTitles.has(article.title.toLowerCase().trim()))
            .map(article => ({
              id: `devto-${article.id}`, // Use internal ID format
              title: article.title,
              date: article.published_at ? article.published_at.split('T')[0] : '',
              summary: article.description,
              tags: article.tag_list,
              content: '', // Dev.to API /me/published doesn't return full body, but summary is enough for the list
              isExternal: true,
              externalUrl: article.url
            }));
            
          // Merge and sort chronologically
          posts = [...posts, ...externalPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
      } catch (devToError) {
        console.error('Error fetching from dev.to:', devToError);
      }
    }
    
    return NextResponse.json(posts, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch posts' }, { status: 500, headers: corsHeaders });
  }
}
