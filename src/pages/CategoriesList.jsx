import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import dataset from '../data/dataset.json';

const CategoriesList = () => {
  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 className="h1">All Categories</h1>
          <p className="body-large" style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            Explore {dataset.length} categories packed with 100% free, un-paywalled resources for your next big project.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {dataset.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}
            >
              <Link
                to={`/category/${cat.id}`}
                className="glass-card"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.5rem', textDecoration: 'none', transition: 'all var(--transition-normal)',
                  height: '100%'
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cat.name}</span>
                </div>
                <span style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {cat.resources.length}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
