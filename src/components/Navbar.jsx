import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

function Navbar({ theme, toggleTheme }) {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ShopExplorer
      </Link>
      <div className="navbar-actions">
        <Link to="/favorites" className="fav-nav-btn">
          ❤️
          {favorites.length > 0 && (
            <span className="fav-count">{favorites.length}</span>
          )}
        </Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;