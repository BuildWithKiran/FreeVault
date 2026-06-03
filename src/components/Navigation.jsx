import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Search, Moon, Sun, Menu, X, Vault } from 'lucide-react';
import SearchModal from './SearchModal';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleOpenSearch = () => {
      setSearchOpen(true);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('open-search', handleOpenSearch);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-search', handleOpenSearch);
    };
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '72px',
          zIndex: 50,
          transition: 'all var(--transition-normal)',
          borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        }}
        className={isScrolled ? 'glass' : ''}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <Vault size={24} color="var(--text-primary)" />
            <span>FreeVault</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Home</Link>
            <Link to="/categories" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Categories</Link>
            <Link to="/collections" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Collections</Link>
            
            <button 
              onClick={() => setSearchOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                transition: 'all var(--transition-fast)'
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-muted)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <Search size={16} />
              <span>Search resources...</span>
              <kbd style={{ marginLeft: '1rem', padding: '0.1rem 0.4rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', fontSize: '0.7rem' }}>⌘K</kbd>
            </button>

            <button onClick={toggleTheme} style={{ color: 'var(--text-secondary)' }}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="mobile-toggle">
            <button onClick={() => setSearchOpen(true)} style={{ color: 'var(--text-secondary)' }}>
              <Search size={20} />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'var(--text-primary)' }}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', top: '72px', left: 0, right: 0, bottom: 0,
          backgroundColor: 'var(--bg-color)', zIndex: 40, padding: '2rem 1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1.5rem'
        }}>
          <Link to="/" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ fontSize: '1.25rem', fontWeight: 600 }}>Home</Link>
          <Link to="/categories" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ fontSize: '1.25rem', fontWeight: 600 }}>Categories</Link>
          <Link to="/collections" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ fontSize: '1.25rem', fontWeight: 600 }}>Collections</Link>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500 }}>Theme</span>
            <button onClick={toggleTheme} style={{ padding: '0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)' }}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Responsive Styles (inline for simplicity, but could be in css) */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-toggle { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navigation;
