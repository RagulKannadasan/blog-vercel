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
  
  const serializedPosts = posts.map(post => ({
    ...post,
    _id: post._id.toString()
  }));

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
