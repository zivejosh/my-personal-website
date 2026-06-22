import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Categories.css';

const categoriesData = [
  {
    label: 'OPEN SOURCE TECH',
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--primary-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3"></circle>
        <circle cx="6" cy="6" r="3"></circle>
        <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
        <line x1="6" y1="9" x2="6" y2="21"></line>
      </svg>
    ), // Represents a Git branch/node network
    blurb: "I believe open source tech is a vital part of the future of personal computing, and reliable systems in the future of the tech industry. We are entering an age where tech is becomming more expensive and more valuble as a personal commdity and learning about how we can make tech our own is a vital part of that."
  },
  {
    label: 'PERSONAL GROWTH',
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--primary-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"></path>
        <path d="M12 12C12 7 16 5 20 5C20 9 17 12 12 12Z"></path>
        <path d="M12 16C12 13 9 11 6 11C6 14 8 16 12 16Z"></path>
      </svg>
    ), // Represents a sprouting plant/leaf
    blurb: "Personal growth is one of my passions throughout every sphere. Something I pride myself in is being able to grow, mentally, intellectually and physically. This doesn't just apply to the tech world too! Whether it be fighting the dangers of social media or working out, I believe personal growth is vital to my world."
  },
  {
    label: 'CREATIVE CODING',
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--primary-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ), // Represents code brackets with a creative node/center
    blurb: "Creative coding is something that I've always pushed. A massive part of what I do, is not due to a specific love for programming so to speak, but rather due to my love for creating things. One of my large goals is to be able to influence the world in a way that inspires others to get out there and show the world what they can do!"
  },
  {
    label: 'SECURITY',
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--primary-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ), // Represents a minimalist shield
    blurb: "Security is not just a passion of mine but something I believe that needs to be talked about within the tech world. We currently live in a world of technological ignorance where people are willing to fling their information around everywhere. I want to be able to show people how wrong that is, and how we can prevent that and create better systems for our own personal computing goals."
  }
];

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <motion.section 
      className="categories-section" 
      id="topics"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>My Skill & Interest Categories</h2>
      <div className="categories-grid">
        {categoriesData.map((category, index) => (
          <div
            key={category.label}
            className="category-container"
            onMouseEnter={() => setSelectedCategory(category.label)}
            onMouseLeave={() => setSelectedCategory(null)}
          >
            <AnimatePresence>
              {selectedCategory === category.label && (
                <motion.div
                  className="category-widget"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {categoriesData.find(c => c.label === selectedCategory)?.icon}
                  <p>{categoriesData.find(c => c.label === selectedCategory)?.blurb}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div 
              className="category-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="category-icon">
                {category.icon}
              </div>
              <div className="category-label">{category.label}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default Categories;