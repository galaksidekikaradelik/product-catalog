import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import { HighlightText } from '../utils/highlight';

function ProductCard({ product, searchQuery = '' }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();
  const fav = isFavorite(product.id);

  const discountPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
    addToast(fav ? 'Favoritlərdən çıxarıldı' : 'Favoritelərə əlavə edildi', fav ? 'info' : 'success');
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-card-img-wrap">
        <img src={product.thumbnail} alt={product.title} className="product-card-img" />
        {product.discountPercentage > 0 && (
          <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
        )}
        <button className={`fav-btn ${fav ? 'active' : ''}`} onClick={handleFavorite} aria-label="Favorite">
          {fav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-card-body">
        <p className="product-card-brand">{product.brand}</p>
        <h3 className="product-card-title">
          <HighlightText text={product.title} query={searchQuery} />
        </h3>
        <div className="product-card-footer">
          <div className="price-wrap">
            {discountPrice ? (
              <>
                <span className="product-card-price">${discountPrice}</span>
                <span className="original-price">${product.price}</span>
              </>
            ) : (
              <span className="product-card-price">${product.price}</span>
            )}
          </div>
          <span className="product-card-rating">⭐ {product.rating}</span>
        </div>
        <button className="product-card-btn" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
          Ətraflı bax
        </button>
      </div>
    </div>
  );
}

export default ProductCard;