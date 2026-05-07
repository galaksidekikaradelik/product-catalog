import ProductCard from './ProductCard';
import { SkeletonGrid } from './SkeletonCard';

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3>Heç bir məhsul tapılmadı</h3>
      <p>Axtarış sorğunuzu dəyişdirməyi cəhd edin</p>
    </div>
  );
}

function ProductGrid({ products, loading, initialLoading, searchQuery, hasMore, onLoadMore, loadingMore }) {
  if (initialLoading) return <SkeletonGrid count={12} />;
  if (!loading && products.length === 0) return <EmptyState />;

  return (
    <div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} searchQuery={searchQuery} />
        ))}
        {loadingMore && <SkeletonGrid count={4} />}
      </div>

      {hasMore && !loadingMore && (
        <div className="load-more-wrap">
          <button className="load-more-btn" onClick={onLoadMore}>
            Daha çox yüklə
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;