import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Star, Users, Briefcase, Code, Palette, Zap, Shield, Unlock, Heart } from 'lucide-react';
import Hero from '../components/Hero';
import ResourceCard from '../components/ResourceCard';
import SkeletonLoader from '../components/SkeletonLoader';
import dataset from '../data/dataset.json';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalResources = dataset.reduce((acc, cat) => acc + cat.resources.length, 0);
  const totalCategories = dataset.length;

  const allResources = dataset.flatMap(cat => 
    cat.resources.map(res => ({ ...res, categoryId: cat.id, categoryName: cat.name, icon: cat.icon }))
  );
  const featuredResources = allResources.slice(0, 8);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  return (
    <div>
      <Hero onOpenSearch={openSearch} />
      
      {/* What is this for? */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="h2" style={{ marginBottom: '1.5rem' }}>What is FreeVault?</h2>
            <p className="body-large" style={{ fontSize: '1.125rem' }}>
              We were tired of "free" resources hiding behind login walls, email captures, and premium tiers. 
              FreeVault is an aggressively curated collection of 100% free, CC0, and open-source tools. 
              No accounts. No credit cards. Ever.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { title: "No Accounts Required", text: "We believe in zero friction. You will never be asked to create an account, verify an email, or remember a password to access these resources.", icon: <Unlock size={24} color="var(--text-primary)" /> },
              { title: "Privacy First", text: "Your data is yours. We don't track your downloads, we don't sell your browsing habits, and we don't bombard you with targeted advertisements.", icon: <Shield size={24} color="var(--text-primary)" /> },
              { title: "Community Driven", text: "Everything here is either open-source, CC0, or completely free for commercial use. Built on the generosity of the internet.", icon: <Heart size={24} color="var(--text-primary)" /> }
            ].map((principle, i) => (
              <div key={i} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {principle.icon}
                  </div>
                  <h3 className="h3" style={{ margin: 0 }}>{principle.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', flex: 1, lineHeight: 1.6, margin: 0 }}>{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="h2">Built for every workflow</h2>
            <p className="body-large" style={{ marginTop: '1rem' }}>Whether you're writing code, editing a film, or designing a brand.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ margin: '0 auto 1.5rem', width: '64px', height: '64px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code size={32} color="var(--text-primary)" />
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>For Developers</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Open source libraries, learning paths, free APIs, and interview prep materials.</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ margin: '0 auto 1.5rem', width: '64px', height: '64px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Palette size={32} color="var(--text-primary)" />
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>For Designers</h3>
              <p style={{ color: 'var(--text-secondary)' }}>CC0 Stock photos, free fonts, UI kits, mockups, and open-source icons.</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ margin: '0 auto 1.5rem', width: '64px', height: '64px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={32} color="var(--text-primary)" />
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>For Creators</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Royalty-free music, VFX packs, sound effects, and video templates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section style={{ padding: '3rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', textAlign: 'center' }}>
            <div>
              <h3 className="h2" style={{ color: 'var(--text-primary)' }}>{totalResources}+</h3>
              <p className="body-large" style={{ fontSize: '0.9rem' }}>Free Resources</p>
            </div>
            <div>
              <h3 className="h2" style={{ color: 'var(--text-primary)' }}>{totalCategories}</h3>
              <p className="body-large" style={{ fontSize: '0.9rem' }}>Categories</p>
            </div>
            <div>
              <h3 className="h2" style={{ color: 'var(--text-primary)' }}>100%</h3>
              <p className="body-large" style={{ fontSize: '0.9rem' }}>Open Source</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources Preview */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 className="h2">Trending Now</h2>
              <p className="body-large" style={{ marginTop: '0.5rem' }}>The most popular tools in our directory.</p>
            </div>
          </div>
          
          <div className="grid-responsive" style={{ marginBottom: '3rem' }}>
            {loading ? (
              <SkeletonLoader count={8} />
            ) : (
              featuredResources.map((res, i) => (
                <ResourceCard 
                  key={i} 
                  resource={res} 
                  categoryIcon={res.icon} 
                  categoryName={res.categoryName} 
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: '8rem 0', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h2 className="h1" style={{ marginBottom: '1.5rem' }}>Ready to discover?</h2>
          <p className="body-large" style={{ marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            No signups. No paywalls. Just pure, unadulterated free resources for creators, developers, and designers.
          </p>
          <button className="btn btn-primary" onClick={openSearch} style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            <Search size={20} />
            Search Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
