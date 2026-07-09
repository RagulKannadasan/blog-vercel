export default function Loading() {
  return (
    <>
      <header className="hero-profile">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton skeleton-title" style={{ width: '200px', height: '3.5rem' }}></div>
        <div className="skeleton skeleton-text short"></div>
      </header>
      
      <main>
        <div className="controls-container" style={{ marginBottom: '2rem' }}>
           <div className="skeleton" style={{ height: '3rem', width: '100%', borderRadius: '50px' }}></div>
        </div>
        
        <div className="posts-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="post-card skeleton-card">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text short" style={{ marginBottom: '1.5rem' }}></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
