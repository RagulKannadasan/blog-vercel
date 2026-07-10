import dbConnect from '@/lib/db';
import Post from '@/models/Post';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { isAuthenticated } from '@/lib/auth';

export const revalidate = 0;

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function SinglePost({ params }) {
  await dbConnect();
  
  const p = await params;
  const post = await Post.findOne({ id: p.id }).lean();
  
  if (!post) {
    return notFound();
  }

  const auth = await isAuthenticated();

  if (post.isPrivate && !auth) {
    return notFound();
  }

  // Fetch backlinks
  const titlePattern = `\\[\\[${escapeRegex(post.title)}\\]\\]`;
  const idPattern = `\\[\\[${escapeRegex(post.id)}\\]\\]`;

  const backlinksQuery = {
    $and: [
      {
        $or: [
          { content: { $regex: titlePattern, $options: 'i' } },
          { content: { $regex: idPattern, $options: 'i' } }
        ]
      },
      { id: { $ne: post.id } },
      ...(auth ? [] : [{ isPrivate: { $ne: true } }])
    ]
  };

  const backlinks = await Post.find(backlinksQuery).select('id title').lean();

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
              {post.isExternal && post.externalUrl && (
                <div style={{ marginTop: '3rem', padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px', borderLeft: '4px solid #3b49df' }}>
                  <p style={{ margin: 0 }}>This article was originally published on <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>dev.to</a>.</p>
                </div>
              )}
          </article>

          {backlinks.length > 0 && (
            <section className="backlinks-section" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>References to this post</h2>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {backlinks.map(bl => (
                  <li key={bl.id} style={{ marginBottom: '0.5rem' }}>
                    <Link href={`/post/${bl.id}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                      {bl.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
      </main>
    </>
  );
}
