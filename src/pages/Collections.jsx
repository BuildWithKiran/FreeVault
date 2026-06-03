import React from 'react';
import { motion } from 'framer-motion';
import dataset from '../data/dataset.json';
import ResourceCard from '../components/ResourceCard';

const Collections = () => {
  // We'll create some "fake" collections dynamically from the dataset for demonstration
  // by grabbing resources from related categories.
  const allResources = dataset.flatMap(cat => 
    cat.resources.map(res => ({ ...res, categoryId: cat.id, categoryName: cat.name, icon: cat.icon }))
  );

  const getCollection = (keywords, count = 4) => {
    return allResources
      .filter(res => keywords.some(kw => res.categoryName.toLowerCase().includes(kw) || res.name.toLowerCase().includes(kw)))
      .slice(0, count);
  };

  const collections = [
    {
      title: "Ultimate Developer Toolkit",
      description: "The absolute essentials for building modern software.",
      resources: getCollection(['coding', 'open source', 'developer'])
    },
    {
      title: "Best Free Design Resources",
      description: "UI/UX, fonts, icons, and mockups for premium designs.",
      resources: getCollection(['design', 'fonts', 'icons', 'mockup', 'ui/ux'])
    },
    {
      title: "Creator Starter Pack",
      description: "Video editing, sound effects, music, and social media tools.",
      resources: getCollection(['video', 'music', 'sound', 'reels'])
    }
  ];

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 className="h1">Curated Collections</h1>
          <p className="body-large" style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            Hand-picked groups of the best resources for specific workflows and projects.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {collections.map((collection, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <h2 className="h2">{collection.title}</h2>
                <p className="body-large" style={{ marginTop: '0.5rem' }}>{collection.description}</p>
              </div>
              <div className="grid-responsive">
                {collection.resources.map((res, j) => (
                  <ResourceCard 
                    key={j} 
                    resource={res} 
                    categoryIcon={res.icon} 
                    categoryName={res.categoryName} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
