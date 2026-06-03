import React from 'react';
import { Link } from 'react-router-dom';
import { Vault } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem 0', marginTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem' }}>
              <Vault size={24} color="var(--text-primary)" />
              <span>FreeVault</span>
            </Link>
            <p className="body-large" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '300px' }}>
              The internet's largest collection of free tools, assets, software, courses, libraries, media, templates, and open-source resources.
            </p>
          </div>
          <div>
            <h4 className="h3" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Platform</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Home</Link></li>
              <li><Link to="/categories" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Categories</Link></li>
              <li><Link to="/collections" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="h3" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Top Categories</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link to="/category/developer-tools" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Developer Tools</Link></li>
              <li><Link to="/category/free-design-tools-resources" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Design Tools</Link></li>
              <li><Link to="/category/video-editing-vfx-transitions" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Video Editing</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <p>© {new Date().getFullYear()} FreeVault. No rights reserved. Open internet for all.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
