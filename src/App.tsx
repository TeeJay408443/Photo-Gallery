import React, { useEffect, useState } from 'react';
import { SmileyFace } from './components/SmileyFace';

interface FoodItem {
  id: number;
  title: string;
  category: 'Hot Food' | 'Cold Food' | 'Dessert';
  badgeClass: string;
  url: string;
  description: string;
}

const FOOD_ITEMS: FoodItem[] = [
  // Row 1: Hot Foods
  {
    id: 1,
    title: 'Wood-Fired Pizza',
    category: 'Hot Food',
    badgeClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    url: 'images/pizza.jpg',
    description:
      'A crisp, wood-fired pizza with a blistered crust, bright tomato sauce, bubbling mozzarella, and fresh herbs. It is finished in a hot oven for a smoky, golden edge.',
  },
  {
    id: 2,
    title: 'Tonkotsu Ramen',
    category: 'Hot Food',
    badgeClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    url: 'images/ramen.jpg',
    description:
      'Silky tonkotsu broth is poured over springy noodles and topped with tender pork, jammy egg, green onions, and fresh vegetables for a rich, comforting bowl.',
  },
  {
    id: 3,
    title: 'Classic Cheeseburger',
    category: 'Hot Food',
    badgeClass: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    url: 'images/burger.jpg',
    description:
      'A classic double cheeseburger layered with juicy beef patties, melted cheese, crisp lettuce, onion, and tangy sauce inside a toasted brioche bun.',
  },
  // Row 2: Cold Foods
  {
    id: 4,
    title: 'Fresh Sushi & Sashimi',
    category: 'Cold Food',
    badgeClass: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    url: 'images/sushi.jpg',
    description:
      'A fresh assortment of sushi and sashimi featuring delicate slices of fish, seasoned rice, and clean, bright flavors best enjoyed with a little soy and wasabi.',
  },
  {
    id: 5,
    title: 'Crisp Greek Salad',
    category: 'Cold Food',
    badgeClass: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    url: 'images/salad.jpg',
    description:
      'A crisp Greek salad combining ripe tomatoes, cucumber, olives, red onion, and creamy feta with a simple dressing that keeps every ingredient fresh and vibrant.',
  },
  {
    id: 6,
    title: 'Açai Bowl',
    category: 'Cold Food',
    badgeClass: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
    url: 'images/acai.jpg',
    description:
      'A cool, velvety açaí bowl topped with colorful fruit, crunchy granola, and coconut. It is lightly sweet, refreshing, and full of berry flavor.',
  },
  // Row 3: Desserts
  {
    id: 7,
    title: 'Decadent Chocolate Cake',
    category: 'Dessert',
    badgeClass: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
    url: 'images/chocolate-cake.jpg',
    description:
      'A deeply chocolatey cake with tender layers and a smooth, decadent finish. Each bite balances rich cocoa flavor with a soft, delicate crumb.',
  },
  {
    id: 8,
    title: 'Fresh Berry Tart',
    category: 'Dessert',
    badgeClass: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
    url: 'images/berry-tart.jpg',
    description:
      'A buttery tart shell filled with silky cream and topped with a generous layer of fresh berries for a bright, lightly sweet finish.',
  },
  {
    id: 9,
    title: 'Strawberry Ice Cream',
    category: 'Dessert',
    badgeClass: 'bg-pink-500/15 text-pink-400 border border-pink-500/30',
    url: 'images/gelato.jpg',
    description:
      'Smooth strawberry ice cream made for a refreshing finish, with a creamy texture and sweet-tart berry flavor in every spoonful.',
  },
];

export const App: React.FC = () => {
  const getItemFromHash = () => {
    const itemId = Number(window.location.hash.replace('#food-', ''));
    return FOOD_ITEMS.find((item) => item.id === itemId) ?? null;
  };
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(getItemFromHash);

  useEffect(() => {
    const handleNavigation = () => {
      setSelectedItem(getItemFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  const openFoodDetail = (item: FoodItem) => {
    window.history.pushState({}, '', `#food-${item.id}`);
    setSelectedItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeFoodDetail = () => {
    window.history.back();
  };

  if (selectedItem) {
    return (
      <div className="gallery-container w-full max-w-[1000px] mx-auto py-8 sm:py-10 px-4">
        <main className="detail-page">
          <div className="mb-8 flex items-center justify-between">
            <button
              type="button"
              onClick={closeFoodDetail}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <span aria-hidden="true">←</span>
              Back to gallery
            </button>
            <SmileyFace className="scale-75 origin-right" />
          </div>

          <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/40">
            <div className="grid md:grid-cols-2">
              <div className="aspect-square overflow-hidden bg-zinc-800 md:aspect-auto md:min-h-[520px]">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <span
                  className={`mb-4 inline-block w-fit rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ${selectedItem.badgeClass}`}
                >
                  {selectedItem.category}
                </span>
                <h1 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {selectedItem.title}
                </h1>
                <p className="text-base leading-8 text-zinc-400">{selectedItem.description}</p>
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="gallery-container w-full max-w-[1000px] mx-auto py-10 px-4">
      <header className="gallery-header text-center mb-10 flex flex-col items-center">
        <div className="mb-4">
          <SmileyFace />
        </div>
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
            role="button"
            tabIndex={0}
            aria-label={`View details for ${item.title}`}
            onClick={() => openFoodDetail(item)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openFoodDetail(item);
              }
            }}
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
