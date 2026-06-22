import { motion } from 'framer-motion';
import './ArticlesProjectGrid.css';
import { articlesStack } from '../../data/articlesData.ts';

function ArticlesProjectGrid() {
  // Only show the 3 most recent articles on the home page
  const recentArticles = articlesStack.slice(0, 3);

  return (
    <motion.section 
      className="articles-section" 
      id="articles"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>My Recent Updates</h2>
      <div className="articles-grid">
        {recentArticles.map((article, index) => (
          <motion.div 
            key={article.id} 
            className="article-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            <div className="article-image" style={{ backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="article-content">
              <span className="category-badge">{article.category}</span>
              <h3 className="article-title">{article.title}</h3>
              <div className="article-meta">{article.date} &bull; {article.author}</div>
              <p className="article-excerpt">{article.excerpt}</p>
              <a href={`/articles/${article.id}`} className="article-link">Read More &rarr;</a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default ArticlesProjectGrid;