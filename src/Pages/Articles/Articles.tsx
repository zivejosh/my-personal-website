import { motion } from 'framer-motion';
import NavBar from '../../WebTools/NavBar';
import Footer from '../HomePage/Footer'; // Reusing your existing footer!
import './Articles.css';
import { articlesStack } from '../../data/articlesData.ts';

function Articles() {
  return (
    <div className="app-container">
      
      <NavBar />

      <div className="layout-container">
        
        {/* Articles Page Header */}
        <motion.section 
          className="articles-page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1>My Articles & Insights</h1>
          <p>Explore my latest thoughts, tutorials, and deep-dives into software development and technology trends.</p>
        </motion.section>

        {/* Full Articles Grid */}
        <section className="articles-page-grid">
          {articlesStack.map((article, index) => (
            <motion.div 
              key={article.id} 
              className="article-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.15, duration: 0.5 }}
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
        </section>

        <Footer />

      </div>
    </div>
  );
}

export default Articles;