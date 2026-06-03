import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ResourceCard = ({ resource, categoryIcon, categoryName }) => {
  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, boxShadow: 'var(--shadow-lg)' }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="group"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', paddingRight: '1rem' }}>
          {resource.name}
        </h3>
        <ExternalLink size={18} color="var(--text-muted)" style={{ flexShrink: 0, transition: 'color var(--transition-fast)' }} />
      </div>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, marginBottom: '1.5rem', lineHeight: 1.6 }}>
        {resource.description || "Free resource for your projects."}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
        <span className="badge">
          {categoryIcon} {categoryName}
        </span>
      </div>

      {/* Subtle hover glow effect via CSS */}
      <style>{`
        a.group:hover svg { color: var(--text-primary) !important; }
      `}</style>
    </motion.a>
  );
};

export default ResourceCard;
