// pages/FavoritesPage.jsx
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import ProductCard from '../components/ProductCard';

function FavoritesPage() {
  const { favorites} = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🤍</div>
        <h3>Hələ heç bir favorit yoxdur</h3>
        <p>Bəyəndiyiniz məhsulları favoritleərə əlavə edin</p>
        <button className="load-more-btn" onClick={() => navigate('/')}>
          Məhsullara bax
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <h1 className="related-title">Favoritlərim ({favorites.length})</h1>
      <div className="product-grid">
        {favorites.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;