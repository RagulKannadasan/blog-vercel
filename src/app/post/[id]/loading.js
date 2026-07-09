export default function PostLoading() {
  return (
    <>
      <nav className="top-nav" style={{ marginBottom: '2rem' }}>
          <div className="skeleton skeleton-text short" style={{ width: '150px' }}></div>
      </nav>
      
      <main className="post-main">
          <article className="post-container">
              <header className="post-header">
                  <div className="skeleton skeleton-title" style={{ width: '100%', height: '3rem' }}></div>
                  <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
              </header>
              <div className="post-content">
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
                  <div className="skeleton skeleton-text" style={{ marginTop: '2rem' }}></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
              </div>
          </article>
      </main>
    </>
  );
}
