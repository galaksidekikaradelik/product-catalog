import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import ProductCard from '../components/ProductCard';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        if (cancelled) return;
        setProduct(data);
        setActiveImg(0);
        if (data?.category) {
          const rel = await getProductsByCategory(data.category, 0, 5);
          if (cancelled) return;
          setRelated((rel.products || []).filter(p => p.id !== data.id).slice(0, 4));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="loading">Yüklənir...</div>;
  if (!product) return <div className="no-results">Məhsul tapılmadı.</div>;

  const fav = isFavorite(product.id);
  const discountPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const stockClass = () => {
    if (product.availabilityStatus === 'In Stock') return 'stock-in';
    if (product.availabilityStatus === 'Low Stock') return 'stock-low';
    return 'stock-out';
  };

  const stockPercent = product.availabilityStatus === 'In Stock' ? 85
    : product.availabilityStatus === 'Low Stock' ? 25 : 0;

  const handleFav = () => {
    toggleFavorite(product);
    addToast(fav ? 'Favoritlərdən çıxarıldı' : 'Favoritelərə əlavə edildi', fav ? 'info' : 'success');
  };

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Geri</button>

      <div className="detail-container">
        <div className="detail-gallery">
          <img src={product.images[activeImg]} alt={product.title} className="detail-main-img" />
          <div className="detail-thumbs">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt={`thumb-${i}`}
                className={`detail-thumb ${activeImg === i ? 'active' : ''}`}
                onClick={() => setActiveImg(i)} />
            ))}
          </div>
        </div>

        <div className="detail-info">
          <p className="detail-brand">{product.brand}</p>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-price-row">
            {discountPrice ? (
              <>
                <span className="detail-price">${discountPrice}</span>
                <span className="detail-original-price">${product.price}</span>
                <span className="detail-discount-badge">-{Math.round(product.discountPercentage)}%</span>
              </>
            ) : (
              <span className="detail-price">${product.price}</span>
            )}
          </div>

          <p className="detail-desc">{product.description}</p>

          <div className="detail-meta">
            <div className="meta-row">
              <span className="meta-label">Reytinq:</span>
              <span>⭐ {product.rating}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Stok:</span>
              <div className="stock-wrap">
                <span className={`stock-badge ${stockClass()}`}>{product.availabilityStatus}</span>
                <div className="stock-bar">
                  <div className="stock-fill" style={{ width: `${stockPercent}%` }} />
                </div>
              </div>
            </div>
            <div className="meta-row">
              <span className="meta-label">Kateqoriya:</span>
              <span>{product.category}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Brend:</span>
              <span>{product.brand}</span>
            </div>
          </div>

          <div className="detail-tags">
            {product.tags?.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
          </div>

          <button className={`fav-detail-btn ${fav ? 'active' : ''}`} onClick={handleFav}>
            {fav ? '❤️ Favoritlərdən çıxar' : '🤍 Favoritelərə əlavə et'}
          </button>

          {product.reviews?.length > 0 && (
            <div className="reviews-section">
              <h3 className="reviews-title">Rəylər ({product.reviews.length})</h3>
              {product.reviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <span className="review-name">{r.reviewerName}</span>
                    <span className="review-rating">{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <p className="review-comment">{r.comment}</p>
                  <span className="review-date">{new Date(r.date).toLocaleDateString('az-AZ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h2 className="related-title">Oxşar məhsullar</h2>
          <div className="product-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;