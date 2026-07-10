import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.DEVTO_API_KEY) {
      return NextResponse.json({ success: false, message: 'DEVTO_API_KEY is not configured.' }, { status: 400 });
    }

    await dbConnect();

    // 1. Fetch published articles from dev.to
    const devToRes = await fetch('https://dev.to/api/articles/me/published', {
      headers: {
        'api-key': process.env.DEVTO_API_KEY
      }
    });

    if (!devToRes.ok) {
      return NextResponse.json({ success: false, message: 'Failed to fetch from dev.to' }, { status: 500 });
    }

    const devToArticles = await devToRes.json();

    // 2. Get existing local posts to deduplicate
    const localPosts = await Post.find({}).select('title id').lean();
    const localTitles = new Set(localPosts.map(p => p.title.toLowerCase().trim()));
    const localIds = new Set(localPosts.map(p => p.id));

    let syncedCount = 0;

    // 3. Process each dev.to article
    for (const article of devToArticles) {
      // Check if we already have a post with this title
      if (localTitles.has(article.title.toLowerCase().trim())) {
        continue; // Skip
      }

      // Check if we already have this dev.to ID in case titles changed slightly
      const devtoIdString = `devto-${article.id}`;
      if (localIds.has(devtoIdString)) {
        continue;
      }

      // We found a new article! Fetch the full markdown content
      const singleRes = await fetch(`https://dev.to/api/articles/${article.id}`);
      if (!singleRes.ok) continue; // skip if error fetching single article

      const fullArticle = await singleRes.json();

      // Store in MongoDB
      await Post.create({
        id: devtoIdString,
        title: fullArticle.title,
        date: fullArticle.published_at ? fullArticle.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
        summary: fullArticle.description || '',
        tags: fullArticle.tags || [],
        content: fullArticle.body_markdown || '*No content*',
        isPrivate: false,
        isExternal: true,
        externalUrl: fullArticle.url
      });

      syncedCount++;
    }

    return NextResponse.json({ success: true, message: `Successfully synced ${syncedCount} new articles from dev.to.` });
  } catch (error) {
    console.error('Error in sync endpoint:', error);
    return NextResponse.json({ success: false, message: error.message || 'An error occurred during sync' }, { status: 500 });
  }
}
