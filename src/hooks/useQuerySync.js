import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQuerySync({ search, selectedCategory, sort, setSearch, setSelectedCategory, setSort }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-dən state-ə (ilk render)
  useEffect(() => {
    const q = searchParams.get('search') || '';
    const cat = searchParams.get('category') || 'all';
    const s = searchParams.get('sort') || 'default';
    setSearch(q);
    setSelectedCategory(cat);
    setSort(s);
  }, []); // eslint-disable-line

  // State-dən URL-ə
  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (sort !== 'default') params.sort = sort;
    setSearchParams(params, { replace: true });
  }, [search, selectedCategory, sort]);
}