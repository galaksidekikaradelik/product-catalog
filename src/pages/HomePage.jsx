import { useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import { useQuerySync } from '../hooks/useQuerySync';
import { getAllProducts, getProductsByCategory, searchProducts, PAGE_LIMIT } from '../services/api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const isFirstRender = useRef(true);

  useQuerySync({ search, selectedCategory, sort, setSearch, setSelectedCategory, setSort });

  const fetchProducts = async (currentSkip = 0, append = false) => {
    try {
      if (!append) setInitialLoading(true);
      else setLoadingMore(true);

      let result;
      if (search.trim()) {
        result = await searchProducts(search, currentSkip);
        if (selectedCategory !== 'all') {
          result.products = result.products.filter(p => p.category === selectedCategory);
        }
      } else if (selectedCategory === 'all') {
        result = await getAllProducts(currentSkip);
      } else {
        result = await getProductsByCategory(selectedCategory, currentSkip);
      }

      setProducts(prev => append ? [...prev, ...(result.products || [])] : (result.products || []));
      setTotal(result.total || 0);
      setSkip(currentSkip + PAGE_LIMIT);
    } catch {
      if (!append) setProducts([]);
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  // Reset + refetch on filter change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchProducts(0);
      return;
    }
    setSkip(0);
    const delay = search.trim() ? 400 : 0;
    const timer = setTimeout(() => fetchProducts(0), delay);
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearch('');
  };

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    if (sort === 'asc') return arr.sort((a, b) => a.price - b.price);
    if (sort === 'desc') return arr.sort((a, b) => b.price - a.price);
    if (sort === 'rating') return arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [products, sort]);

  const hasMore = products.length < total;

  return (
    <div className="home-layout">
      <Sidebar selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
      <main className="main-content">
        <div className="toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="Məhsul axtar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Sıralama</option>
            <option value="asc">Qiymət: Aşağıdan yuxarı</option>
            <option value="desc">Qiymət: Yuxarıdan aşağı</option>
            <option value="rating">Reytinq</option>
          </select>
        </div>
        <ProductGrid
          products={sortedProducts}
          loading={initialLoading}
          initialLoading={initialLoading}
          searchQuery={search}
          hasMore={hasMore}
          onLoadMore={() => fetchProducts(skip, true)}
          loadingMore={loadingMore}
        />
      </main>
    </div>
  );
}

export default HomePage;