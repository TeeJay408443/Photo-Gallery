import React from 'react';

interface FoodItem {
  id: number;
  title: string;
  category: 'Hot Food' | 'Cold Food' | 'Dessert';
  badgeClass: string;
  url: string;
}

const FOOD_ITEMS: FoodItem[] = [
  // Row 1: Hot Foods
  {
    id: 1,
    title: 'Wood-Fired Pizza',
    category: 'Hot Food',
    badgeClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 2,
    title: 'Tonkotsu Ramen',
    category: 'Hot Food',
    badgeClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 3,
    title: 'Classic Cheeseburger',
    category: 'Hot Food',
    badgeClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&h=600&q=80',
  },
  // Row 2: Cold Foods
  {
    id: 4,
    title: 'Fresh Sushi & Sashimi',
    category: 'Cold Food',
    badgeClass: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 5,
    title: 'Crisp Greek Salad',
    category: 'Cold Food',
    badgeClass: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 6,
    title: 'Chilled Açai Bowl',
    category: 'Cold Food',
    badgeClass: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&h=600&q=80',
  },
  // Row 3: Desserts
  {
    id: 7,
    title: 'Decadent Chocolate Cake',
    category: 'Dessert',
    badgeClass: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 8,
    title: 'Fresh Berry Tart',
    category: 'Dessert',
    badgeClass: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
    url: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 9,
    title: 'Artisan Gelato',
    category: 'Dessert',
    badgeClass: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
    url: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=600&h=600&q=80',
  },
];

export const App: React.FC = () => {
  return (
    <div className="gallery-container w-full max-w-[1000px] mx-auto py-10 px-4">
      <header className="gallery-header text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Food Photo Gallery
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Row 1: Hot Foods • Row 2: Cold Foods • Row 3: Desserts
        </p>
      </header>

      {/* 9 photo grid: 3 rows, 3 columns of equal dimensions */}
      <main className="photo-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {FOOD_ITEMS.map((item) => (
          <article
            key={item.id}
            id={`food-item-${item.id}`}
            className="photo-card bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/60"
          >
            <div className="photo-img-wrapper w-full aspect-square overflow-hidden bg-zinc-800">
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="photo-info p-4 text-center">
              <h2 className="photo-title text-base font-semibold text-zinc-100 mb-1">
                {item.title}
              </h2>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase ${item.badgeClass}`}
              >
                {item.category}
              </span>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default App;
