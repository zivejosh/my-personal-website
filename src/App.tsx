import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import './App.css';

import Articles from './Pages/Articles/Articles';
import ArticleViewer from './Pages/Articles/ArticleViewer';
import ScrollToTop from './WebTools/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* When the URL is exactly "/", show the HomePage */}
        <Route path="/" element={<HomePage />} />
        
        {/* When the URL is "/articles", show the fully built Articles page */}
        <Route path="/articles" element={<Articles />} />
        
        {/* Dynamic route to display a single article based on its ID */}
        <Route path="/articles/:id" element={<ArticleViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;