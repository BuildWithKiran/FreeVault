import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import dataset from '../data/dataset.json';
import ResourceCard from '../components/ResourceCard';
import SkeletonLoader from '../components/SkeletonLoader';

const Category = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest'); // newest, az

  const category = useMemo(() => dataset.find(cat => cat.id === id), [id]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [id]);

  if (!category) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 className="h1">Category not found</h1>
        <Link to="/" className="btn btn-secondary" style={{ marginTop: '2rem' }}>Go Home</Link>
      </div>
    );
  }

  const sortedResources = useMemo(() => {
    let sorted = [...category.resources];
    if (sortBy === 'az') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    // "newest" we'll just leave as default order for now
    return sorted;
  }, [category, sortBy]);

  return (
    <div>
      {/* Category Header */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '4rem 0 3rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <Link to="/categories" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 500 }}>
            <ArrowLeft size={16} />
            Back to Categories
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '3rem' }}>{category.icon}</span>
            <h1 className="h1">{category.name}</h1>
          </div>
          <p className="body-large" style={{ maxWidth: '600px' }}>
            Explore {category.resources.length} completely free resources in {category.name}. No paywalls or subscriptions.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="h3">All Resources <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 400 }}>({category.resources.length})</span></h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Filter size={16} />
                Sort by:
              </span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '0.5rem 2rem 0.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  appearance: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                <option value="newest">Default</option>
                <option value="az">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="grid-responsive">
            {loading ? (
              <SkeletonLoader count={category.resources.length || 8} />
            ) : (
              sortedResources.map((res, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }} // Stagger up to a limit
                >
                  <ResourceCard 
                    resource={res} 
                    categoryIcon={category.icon} 
                    categoryName={category.name} 
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
