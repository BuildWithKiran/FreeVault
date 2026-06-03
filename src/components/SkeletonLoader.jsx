import React from 'react';

const SkeletonLoader = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse"
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            height: '200px'
          }}
        >
          <div style={{ height: '24px', width: '60%', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}></div>
          <div style={{ height: '16px', width: '90%', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem' }}></div>
          <div style={{ height: '16px', width: '80%', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}></div>
          
          <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
            <div style={{ height: '24px', width: '80px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)' }}></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
