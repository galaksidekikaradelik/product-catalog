import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

function Sidebar({ selectedCategory, onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(data => setCategories(data));
  }, []);

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Kateqoriyalar</h3>
      <ul className="category-list">
        <li>
          <button
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => onCategorySelect('all')}
          >
            Hamısı
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              className={`category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
              onClick={() => onCategorySelect(cat.slug)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;