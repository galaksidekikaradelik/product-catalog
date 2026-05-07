import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { FavoritesProvider } from './context/FavoritesProvider';
import { ToastProvider } from './context/ToastProvider';
import FavoritesPage from './pages/FavoritesPage';
import './index.css';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <ToastProvider>
          <div className="app">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </ToastProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;