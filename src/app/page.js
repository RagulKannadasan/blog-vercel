import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import PostsGrid from '@/components/PostsGrid';
import { isAuthenticated } from '@/lib/auth';

export const revalidate = 0; 

export default async function Home() {
  await dbConnect();
  
  const auth = await isAuthenticated();
  const query = auth ? {} : { isPrivate: { $ne: true } };
  
  const posts = await Post.find(query).sort({ date: -1 }).lean();
  
  let serializedPosts = posts.map(post => ({
    ...post,
    _id: post._id.toString()
  }));

  // Fetch from dev.to to display on the Next.js homepage
  if (process.env.DEVTO_API_KEY) {
    try {
      const devToRes = await fetch('https://dev.to/api/articles/me/published', {
        headers: { 'api-key': process.env.DEVTO_API_KEY },
        next: { revalidate: 60 } // cache for 60 seconds
      });
      
      if (devToRes.ok) {
        const devToArticles = await devToRes.json();
        const localTitles = new Set(serializedPosts.map(p => p.title.toLowerCase().trim()));
        
        const externalPosts = devToArticles
          .filter(article => !localTitles.has(article.title.toLowerCase().trim()))
          .map(article => ({
            _id: `devto-${article.id}`,
            id: `devto-${article.id}`,
            title: article.title,
            date: article.published_at ? article.published_at.split('T')[0] : '',
            summary: article.description,
            tags: article.tag_list,
            content: '',
            isExternal: true,
            externalUrl: article.url
          }));
          
        serializedPosts = [...serializedPosts, ...externalPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    } catch (e) {
      console.error('Error fetching dev.to posts for homepage:', e);
    }
  }

  return (
    <>
      <header className="hero-profile">
        <div className="hero-avatar">R</div>
        <h1 className="glow-text">Ragul</h1>
        <p className="subtitle">Software Engineer & Creator</p>
      </header>
      
      <main>
        <PostsGrid initialPosts={serializedPosts} />
      </main>
    </>
  );
}
