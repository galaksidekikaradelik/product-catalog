# 🛍️ ShopExplorer

A modern product explorer app built with React and Vite.  
DummyJSON API-dən məhsulları gətirən, favorit sistemi və qaranlıq/işıqlı tema dəstəyi olan bir e-ticarət tətbiqi.

---

## ✨ Features / Xüsusiyyətlər

- 🔍 **Search** — Real-time məhsul axtarışı və highlight
- 🗂️ **Category Filter** — Kateqoriyaya görə filtrasiya
- ❤️ **Favorites** — Favorit məhsulları saxla (localStorage)
- 🌙 **Dark / Light Theme** — Tema dəyişmə (localStorage)
- 📄 **Product Detail** — Şəkil qalereyası, rəylər, stok vəziyyəti
- 🔗 **Related Products** — Oxşar məhsullar
- 🍞 **Toast Notifications** — Əməliyyat bildirişləri
- ♾️ **Infinite Scroll** — Daha çox yüklə
- 💀 **Skeleton Loading** — Yüklənmə animasiyası
- 🛡️ **Error Boundary** — Xəta idarəetməsi

---

## 🚀 Getting Started / Qurulum

### Prerequisites / Tələblər

- Node.js 18+
- npm və ya yarn

### Installation / Qurulum

```bash
# Layihəni klonla
git clone https://github.com/username/shopexplorer.git
cd shopexplorer

# Asılılıqları yüklə
npm install

# Dev serveri işə sal
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure / Fayl Strukturu

```
src/
├── components/
│   ├── Navbar.jsx          # Naviqasiya + favorit sayı
│   ├── ProductCard.jsx     # Məhsul kartı
│   ├── ProductGrid.jsx     # Məhsul grid-i
│   ├── SkeletonCard.jsx    # Yüklənmə skeleton
│   └── ErrorBoundary.jsx   # Xəta sərhədi
│
├── pages/
│   ├── HomePage.jsx        # Ana səhifə
│   ├── ProductDetailPage.jsx # Məhsul detalı
│   └── FavoritesPage.jsx   # Favoritlər səhifəsi
│
├── context/
│   ├── FavoritesContext.js  # Favorites context
│   ├── FavoritesProvider.jsx # Favorites provider
│   ├── ToastContext.js      # Toast context
│   └── ToastProvider.jsx    # Toast provider
│
├── hooks/
│   ├── useFavorites.js     # Favorites hook
│   └── useToast.js         # Toast hook
│
├── services/
│   └── api.js              # DummyJSON API çağırışları
│
└── utils/
    └── highlight.jsx       # Axtarış highlight utility
```

---

## 🛠️ Tech Stack

| Texnologiya | İstifadə |
|-------------|----------|
| React 18 | UI framework |
| Vite | Build tool |
| React Router v6 | Routing |
| DummyJSON API | Məhsul datası |
| localStorage | Tema + favorit saxlama |
| CSS Variables | Tema sistemi |

---

## 🌐 API

Layihə [DummyJSON](https://dummyjson.com) API-dən istifadə edir.

```
GET https://dummyjson.com/products
GET https://dummyjson.com/products/:id
GET https://dummyjson.com/products/category/:category
GET https://dummyjson.com/products/search?q=:query
```

---

## 📄 License

MIT
