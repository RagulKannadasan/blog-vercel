import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export const revalidate = 0;

export default async function SinglePost({ params }) {
  await dbConnect();
  
  const p = await params;
  const post = await Post.findOne({ id: p.id }).lean();
  
  if (!post) {
    return notFound();
  }

  return (
    <>
      <nav className="top-nav" style={{ marginBottom: '2rem' }}>
          <Link href="/" className="back-link">← Back to Posts</Link>
      </nav>
      
      <main className="post-main">
          <article className="post-container">
              <header className="post-header">
                  <h1 className="glow-text">{post.title}</h1>
                  <p className="post-date">{post.date}</p>
              </header>
              <div className="post-content">
                  <MarkdownRenderer content={post.content} />
              </div>
          </article>
      </main>
    </>
  );
}
