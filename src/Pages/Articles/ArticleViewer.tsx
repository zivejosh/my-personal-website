import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../../WebTools/NavBar';
import Footer from '../HomePage/Footer';
import ReactMarkdown from 'react-markdown';
import { articlesStack } from '../../data/articlesData';
import './ArticleViewer.css';

function ArticleViewer() {
  // Grab the specific article ID from the URL bar
  const { id } = useParams<{ id: string }>();
  
  // Find the matching article in our mock database
  const article = articlesStack.find(a => a.id === id);

  // If the user navigates to a URL that doesn't exist in our stack, show a friendly fallback!
  if (!article) {
    return (
      <div className="app-container">
        <NavBar />
        <div className="layout-container" style={{ textAlign: 'center', padding: '120px 0', minHeight: '60vh' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>404 - Article Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>The article you are looking for doesn't seem to exist.</p>
          <Link to="/articles" className="btn-primary">Return to Articles</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <NavBar />
      <div className="layout-container">
        <motion.article 
          className="article-viewer-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link to="/articles" className="back-link">&larr; Back to Articles</Link>
          
          <header className="viewer-header">
            <span className="viewer-category">{article.category}</span>
            <h1 className="viewer-title">{article.title}</h1>
            <div className="viewer-meta">{article.date} &bull; {article.author}</div>
          </header>

          {article.imageUrl && (
            <div className="viewer-image" style={{ backgroundImage: `url(${article.imageUrl})` }}></div>
          )}

          <div className="viewer-body">
            {article.excerpt && <p className="viewer-excerpt">{article.excerpt}</p>}
            
            <div className="viewer-content">
              {article.content ? (
                <ReactMarkdown>{article.content}</ReactMarkdown>
              ) : (
                <p><em>Full article content coming soon...</em></p>
              )}
            </div>
          </div>
        </motion.article>
        <Footer />
      </div>
    </div>
  );
}

export default ArticleViewer;