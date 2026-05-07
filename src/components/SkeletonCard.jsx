function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-brand" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-title short" />
        <div className="skeleton-footer">
          <div className="skeleton skeleton-price" />
          <div className="skeleton skeleton-rating" />
        </div>
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}