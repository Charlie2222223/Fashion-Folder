import React from 'react';
import { Oswald } from 'next/font/google';

const RampartOneFont = Oswald({
  weight: '400',
  subsets: ['latin'],
});

const imageGroups = [
  [
    { src: '/img/Wear_1.jpg', alt: 'Wear 1' },
    { src: '/img/Wear_2.jpg', alt: 'Wear 2' },
    { src: '/img/Wear_3.jpg', alt: 'Wear 3' },
  ],
  [
    { src: '/img/Wear_4.jpg', alt: 'Wear 4' },
    { src: '/img/Wear_5.jpg', alt: 'Wear 5' },
  ],
  [
    { src: '/img/Wear_6.jpg', alt: 'Wear 6' },
    { src: '/img/Wear_7.jpg', alt: 'Wear 7' },
    { src: '/img/Wear_9.jpg', alt: 'Wear 9' },
  ],
  [
    { src: '/img/Wear_8.jpg', alt: 'Wear 8' },
    {
      src: 'https://images.unsplash.com/photo-1668584054035-f5ba7d426401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80',
      alt: 'Unsplash Fashion',
    },
  ],
];

const Title: React.FC = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1
          className={`${RampartOneFont.className} font-bold text-white opacity-100 text-9xl animate-tracking-in-expand`}
        >
          Fashion Folder
        </h1>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {imageGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="space-y-2">
            {group.map((image, imageIndex) => (
              <img
                key={imageIndex}
                className="object-cover w-full h-auto opacity-50"
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Title;