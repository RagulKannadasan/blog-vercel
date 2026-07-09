import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import PostsGrid from '@/components/PostsGrid';

export const revalidate = 0; 

export default async function Home() {
  await dbConnect();
  
  const posts = await Post.find({}).sort({ date: -1 }).lean();
  
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
