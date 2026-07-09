export default function LoginLoading() {
  return (
    <main className="profile-main" style={{ minHeight: '60vh', alignItems: 'center' }}>
      <div className="profile-card" style={{ maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="skeleton skeleton-title" style={{ width: '150px', height: '2.5rem', marginBottom: '1.5rem' }}></div>
        
        <div className="form-group" style={{ width: '100%' }}>
            <div className="skeleton skeleton-text short" style={{ width: '80px', marginBottom: '0.5rem' }}></div>
            <div className="skeleton" style={{ height: '3.5rem', borderRadius: '12px' }}></div>
        </div>
        
        <div className="form-group" style={{ width: '100%', marginTop: '1.5rem' }}>
            <div className="skeleton skeleton-text short" style={{ width: '80px', marginBottom: '0.5rem' }}></div>
            <div className="skeleton" style={{ height: '3.5rem', borderRadius: '12px' }}></div>
        </div>
        
        <div className="skeleton" style={{ height: '3.5rem', borderRadius: '12px', width: '100%', marginTop: '1.5rem' }}></div>
      </div>
    </main>
  );
}
