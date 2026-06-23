import { useState } from 'react';
import './NavBar.css';
import profileImage from '../assets/Home_Page_Assets/Josh_Zive_NoBackground.png';
import { NavLink, Link } from 'react-router-dom';
import { CopyIcon, CheckIcon } from './Icons';

function NavBar() {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const email = 'zivejoshua7@gmail.com';
  const [hideTimeoutId, setHideTimeoutId] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Reset after 2 seconds
    });
  };

  const startHideTimer = () => {
    const id = setTimeout(() => {
      hideWidget();
    }, 200); // Small delay to allow moving between button and widget
    setHideTimeoutId(id);
  };

  const clearHideTimer = () => {
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
      setHideTimeoutId(null);
    }
  };

  const showWidget = () => {
    setIsWidgetVisible(true);
    setAnimationClass('fade-in-slide-up');
    clearHideTimer(); // Clear any pending hide timer when showing the widget
  };

  const hideWidget = () => {
    setAnimationClass('fade-out-slide-down');
    setTimeout(() => {
      setIsWidgetVisible(false);
      setAnimationClass(''); // Reset animation class after animation
    }, 300); // Duration of the fade-out-slide-down animation
  };

  const handleContactClick = () => {
    if (isWidgetVisible) {
      hideWidget();
    } else {
      showWidget();
    }
  };

  return (
    <header className="site-header">
      <div className="branding">
                <img src={profileImage} alt="Joshua Zive" className="avatar" />
        <div className="branding-text">
          <strong>Joshua Zive</strong> | Code & Commentary
        </div>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/articles" className={({ isActive }) => isActive ? "active" : ""}>Articles</NavLink></li>
        <li><Link to="/#topics">Topics</Link></li>
      </ul>
      <div className="contact-container">
        <button
          onClick={handleContactClick}
          onMouseEnter={clearHideTimer}
          onMouseLeave={startHideTimer}
          className="btn-primary"
        >
          CONTACT ME
        </button>
        {isWidgetVisible && (
          <div
            className={`contact-widget ${animationClass}`}
            onMouseEnter={clearHideTimer}
            onMouseLeave={startHideTimer}
            onClick={hideWidget} // Widget animates out when clicked anywhere on it
          >
            <span className="email-text">{email}</span>
            <button
              onClick={(e) => { e.stopPropagation(); handleCopy(); }} // Prevent widget from closing when copy button is clicked
              className="btn-copy"
            >
              {isCopied ? <CheckIcon className="check-icon" /> : <CopyIcon />}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;