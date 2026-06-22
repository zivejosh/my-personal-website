import './HomePage.css';
import NavBar from '../../WebTools/NavBar';
import HeroSection from './HeroSection';
import ArticlesProjectGrid from './ArticlesProjectGrid';
import Categories from './Categories';
import Footer from './Footer';

function HomePage() {
  return (
    <div className="app-container">
      
      {/* 1. Header / Navigation Bar */}
      <NavBar />

      <div className="layout-container">
        
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Articles / Project Grid */}
        <ArticlesProjectGrid />

        {/* 4. Category Section */}
        <Categories />

        {/* 5. Footer */}
        <Footer />

      </div>
    </div>
  )
}

export default HomePage