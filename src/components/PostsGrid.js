'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function PostsGrid({ initialPosts }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...initialPosts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        post => post.title.toLowerCase().includes(q) || post.summary.toLowerCase().includes(q)
      );
    }

    if (sort === 'newest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return result;
  }, [initialPosts, search, sort]);

  return (
    <>
      <div className="controls-container">
        <input 
          type="text" 
          id="search-input" 
          placeholder="Search posts..." 
          aria-label="Search posts"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select 
          id="sort-select" 
          aria-label="Sort posts"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="posts-grid">
        {filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map(post => (
            <Link href={`/post/${post.id}`} className="post-card" key={post.id}>
              <h3>{post.title}</h3>
              <p className="post-date">{post.date}</p>
              <p className="post-summary">{post.summary}</p>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
            No posts found matching your search.
          </div>
        )}
      </div>
    </>
  );
}
