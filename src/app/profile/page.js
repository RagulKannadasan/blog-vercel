export default function Profile() {
  return (
    <main className="profile-main">
        <div className="profile-card">
            <div className="profile-header">
                <div className="avatar-container">
                    <div className="avatar-placeholder">R</div>
                </div>
                <div className="profile-title">
                    <h1 className="glow-text">Ragul</h1>
                    <p className="subtitle">Software Engineer & Creator</p>
                </div>
            </div>
            
            <div className="profile-bio">
                <p>Hello! I'm a passionate developer who loves exploring the intersections of code, design, and life. I build tools and web experiences that aim to wow the user. When I'm not coding, you can find me writing about tech or tweaking my personal blog.</p>
            </div>
            
            <div className="profile-section">
                <h3>Technologies & Skills</h3>
                <div className="skills-container">
                    <span className="skill-tag">HTML5 / CSS3</span>
                    <span className="skill-tag">JavaScript (ES6+)</span>
                    <span className="skill-tag">React & Next.js</span>
                    <span className="skill-tag">Node.js</span>
                    <span className="skill-tag">UI/UX Design</span>
                    <span className="skill-tag">Git & GitHub</span>
                </div>
            </div>

            <div className="profile-section">
                <h3>Connect</h3>
                <div className="social-links">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn">LinkedIn</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn">Twitter</a>
                </div>
            </div>
        </div>
    </main>
  );
}
