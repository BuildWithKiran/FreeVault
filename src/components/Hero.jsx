import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';

const Hero = ({ onOpenSearch }) => {
  return (
    <section style={{ position: 'relative', padding: '6rem 0 4rem 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {/* Background glowing effects */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '50vw', background: 'radial-gradient(circle, var(--glow-color) 0%, transparent 60%)', zIndex: -1, pointerEvents: 'none' }}></div>
      
      <div className="container" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 1rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', marginRight: '0.5rem' }}></span>
            100% Free Resources
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h1"
          style={{ marginBottom: '1.5rem' }}
        >
          <span className="text-gradient">1000+ Free Resources.</span><br />
          Zero Paywalls.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="body-large"
          style={{ marginBottom: '2.5rem', maxWidth: '600px' }}
        >
          Discover the internet's best free tools, assets, software, courses, libraries, media, templates, and open-source resources.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button className="btn btn-primary" onClick={onOpenSearch}>
            <Search size={18} />
            Explore Resources
          </button>
          <Link to="/categories" className="btn btn-secondary">
            Browse Categories
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
