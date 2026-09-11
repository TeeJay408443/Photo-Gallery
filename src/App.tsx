import React from 'react';

interface PhotoItem {
  id: number;
  title: string;
  subtitle: string;
  url: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 1,
    title: 'Mountain Sunrise',
    subtitle: 'Placeholder Photo 1',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 2,
    title: 'Coastal Twilight',
    subtitle: 'Placeholder Photo 2',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 3,
    title: 'Urban Architecture',
    subtitle: 'Placeholder Photo 3',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 4,
    title: 'Misty Forest',
    subtitle: 'Placeholder Photo 4',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 5,
    title: 'Desert Dunes',
    subtitle: 'Placeholder Photo 5',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 6,
    title: 'City Lights',
    subtitle: 'Placeholder Photo 6',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 7,
    title: 'Modern Geometry',
    subtitle: 'Placeholder Photo 7',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 8,
    title: 'Emerald Lake',
    subtitle: 'Placeholder Photo 8',
    url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 9,
    title: 'Warm Shadows',
    subtitle: 'Placeholder Photo 9',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&h=600&q=80',
  },
];

export const App: React.FC = () => {
  return (
    <div className="gallery-container w-full max-w-[1000px] mx-auto py-10 px-4">
      <header className="gallery-header text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Photo Gallery
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          3×3 Photo Grid • Equal Dimensions
        </p>
      </header>

      {/* 9 photo grid: 3 rows, 3 columns of equal dimensions */}
      <main className="photo-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {PHOTOS.map((photo) => (
          <article
            key={photo.id}
            id={`photo-item-${photo.id}`}
            className="photo-card bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/60"
          >
            <div className="photo-img-wrapper w-full aspect-square overflow-hidden bg-zinc-800">
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="photo-info p-4 text-center">
              <h2 className="photo-title text-base font-semibold text-zinc-100 mb-1">
                {photo.title}
              </h2>
              <p className="photo-subtitle text-xs text-zinc-500">
                {photo.subtitle}
              </p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default App;
