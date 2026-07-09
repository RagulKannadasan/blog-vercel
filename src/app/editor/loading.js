export default function EditorLoading() {
  return (
    <>
      <header className="editor-header" style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="skeleton skeleton-title" style={{ width: '200px', height: '3rem' }}></div>
          <div className="skeleton skeleton-text short" style={{ width: '300px' }}></div>
      </header>

      <main className="editor-main">
          <div className="editor-card">
              <div className="form-group">
                  <div className="skeleton skeleton-text short" style={{ width: '80px', marginBottom: '0.5rem' }}></div>
                  <div className="skeleton" style={{ height: '3.5rem', borderRadius: '12px' }}></div>
              </div>
              
              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <div className="skeleton skeleton-text short" style={{ width: '100px', marginBottom: '0.5rem' }}></div>
                  <div className="skeleton" style={{ height: '3.5rem', borderRadius: '12px' }}></div>
              </div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <div className="skeleton skeleton-text short" style={{ width: '60px', marginBottom: '0.5rem' }}></div>
                  <div className="skeleton" style={{ height: '3.5rem', borderRadius: '12px' }}></div>
              </div>

              <div className="form-group" style={{ marginTop: '2rem' }}>
                  <div className="skeleton skeleton-text short" style={{ width: '150px', marginBottom: '0.5rem' }}></div>
                  <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }}></div>
              </div>

              <div className="skeleton" style={{ height: '3.5rem', borderRadius: '12px', marginTop: '2rem' }}></div>
          </div>
      </main>
    </>
  );
}
