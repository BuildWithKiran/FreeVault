import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, ExternalLink } from 'lucide-react';
import dataset from '../data/dataset.json';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : onClose(); // handled externally in Navigation, just prevent default
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    // Add custom event listener for buttons that can't trigger state directly
    const handleCustomOpen = () => {
      // In a real app we'd dispatch an action to a global store, 
      // but since this component is rendered in Navigation, it might need to tell Navigation to open.
      // Actually, let's fix it so it works: if they dispatch this, the Navigation component is listening.
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  // Flatten dataset for search
  const allResources = dataset.flatMap(cat => 
    cat.resources.map(res => ({ ...res, categoryId: cat.id, categoryName: cat.name, icon: cat.icon }))
  );

  const results = query.trim() === '' ? [] : allResources.filter(res => 
    res.name.toLowerCase().includes(query.toLowerCase()) || 
    res.description?.toLowerCase().includes(query.toLowerCase()) ||
    res.categoryName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh', paddingLeft: '1rem', paddingRight: '1rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: 'relative', width: '100%', maxWidth: '600px', backgroundColor: 'var(--bg-color)',
              borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)',
              overflow: 'hidden', display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <Search size={20} color="var(--text-muted)" style={{ marginRight: '0.75rem' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search tools, assets, courses..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '1.125rem', padding: '0.25rem 0' }}
              />
              <button onClick={onClose} style={{ color: 'var(--text-muted)', padding: '0.25rem' }}>
                <kbd style={{ padding: '0.2rem 0.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem' }}>ESC</kbd>
              </button>
            </div>

            <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '1rem' }}>
              {query.trim() === '' && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
                  <p>Start typing to search 1000+ free resources</p>
                </div>
              )}
              {query.trim() !== '' && results.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
                  <p>No resources found for "{query}"</p>
                </div>
              )}
              {results.length > 0 && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {results.map((res, i) => (
                    <li key={i}>
                      <a 
                        href={res.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                          padding: '0.75rem', borderRadius: 'var(--radius-md)', transition: 'background-color var(--transition-fast)',
                          textDecoration: 'none'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={onClose}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{res.name}</span>
                            <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
                              {res.icon} {res.categoryName}
                            </span>
                          </div>
                          {res.description && (
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {res.description}
                            </p>
                          )}
                        </div>
                        <ExternalLink size={16} color="var(--text-muted)" style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
