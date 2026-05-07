const BASE_URL = 'https://dummyjson.com';
export const PAGE_LIMIT = 12;

export const getAllProducts = async (skip = 0, limit = PAGE_LIMIT) => {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return { products: data.products, total: data.total };
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  const data = await res.json();
  return data.map(cat =>
    typeof cat === 'string'
      ? { slug: cat, name: cat }
      : { slug: cat.slug, name: cat.name }
  );
};

export const getProductsByCategory = async (category, skip = 0, limit = PAGE_LIMIT) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return { products: data.products, total: data.total };
};

export const searchProducts = async (query, skip = 0, limit = PAGE_LIMIT) => {
  const res = await fetch(`${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return { products: data.products, total: data.total };
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return await res.json();
};