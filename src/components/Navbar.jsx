import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { Moon, Sun, Heart, ChefHat } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar glass">
      <Link to="/" className="nav-brand">
        <ChefHat size={32} />
        <span>RecipeCraft</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/favorites" className="nav-link">
          <Heart size={20} />
          <span>Favorites</span>
        </Link>
        <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
