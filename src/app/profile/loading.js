export default function ProfileLoading() {
  return (
    <main className="profile-main">
        <div className="profile-card">
            <div className="profile-header">
                <div className="avatar-container">
                    <div className="skeleton skeleton-avatar"></div>
                </div>
                <div className="profile-title" style={{ flexGrow: 1 }}>
                    <div className="skeleton skeleton-title" style={{ width: '250px' }}></div>
                    <div className="skeleton skeleton-text short" style={{ width: '200px' }}></div>
                </div>
            </div>
            
            <div className="profile-bio" style={{ marginBottom: '3rem' }}>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
            </div>
            
            <div className="profile-section">
                <div className="skeleton skeleton-title" style={{ width: '200px', height: '1.5rem', marginBottom: '1.5rem' }}></div>
                <div className="skills-container">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="skeleton" style={{ width: '100px', height: '36px', borderRadius: '50px' }}></div>
                    ))}
                </div>
            </div>
        </div>
    </main>
  );
}
