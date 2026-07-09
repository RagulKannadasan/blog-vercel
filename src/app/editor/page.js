'use client';
import { useState, useEffect, useRef } from 'react';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();
  
  const textAreaRef = useRef(null);
  const mdeRef = useRef(null);

  useEffect(() => {
    // Set default date
    setDate(new Date().toISOString().split('T')[0]);

    // Initialize EasyMDE
    if (typeof window !== 'undefined' && textAreaRef.current && !mdeRef.current) {
      import('easymde').then((EasyMDE) => {
        mdeRef.current = new EasyMDE.default({
          element: textAreaRef.current,
          spellChecker: false,
          autofocus: true,
          status: ['lines', 'words', 'cursor'],
          placeholder: "Write your masterpiece here...",
          renderingConfig: {
            singleLineBreaks: false,
            codeSyntaxHighlighting: true,
          }
        });
      });
    }
  }, []);

  const handleSubmit = async () => {
    setStatus('');
    const content = mdeRef.current ? mdeRef.current.value().trim() : '';

    if (!title || !content) {
      alert('Title and Content are required!');
      return;
    }

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const postObject = {
      id,
      title,
      date,
      summary,
      content
    };

    setStatus('Saving...');

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postObject),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('Post published successfully!');
      setTitle('');
      setSummary('');
      if (mdeRef.current) mdeRef.current.value('');
      
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1500);
    } else {
      setStatus(`Error: ${data.message}`);
    }
  };

  return (
    <>
      <header className="editor-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="glow-text">Create Post</h1>
          <p className="subtitle">Write your markdown and publish directly to MongoDB.</p>
      </header>

      <main className="editor-main">
          <div className="editor-card">
              <div className="form-group">
                  <label htmlFor="post-title">Title</label>
                  <input 
                    type="text" 
                    id="post-title" 
                    className="form-control" 
                    placeholder="e.g., My Awesome New Post"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
              </div>
              
              <div className="form-group">
                  <label htmlFor="post-summary">Summary</label>
                  <input 
                    type="text" 
                    id="post-summary" 
                    className="form-control" 
                    placeholder="A brief description..."
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                  />
              </div>

              <div className="form-group">
                  <label htmlFor="post-date">Date</label>
                  <input 
                    type="date" 
                    id="post-date" 
                    className="form-control"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
              </div>

              <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label htmlFor="md-editor">Content (Markdown)</label>
                  <div className="mde-container">
                      <textarea ref={textAreaRef} id="md-editor"></textarea>
                  </div>
              </div>

              {status && <p style={{ margin: '1rem 0', color: status.includes('Error') ? 'red' : 'var(--accent)' }}>{status}</p>}

              <button onClick={handleSubmit} className="primary-btn">Publish Post</button>
          </div>
      </main>
    </>
  );
}
