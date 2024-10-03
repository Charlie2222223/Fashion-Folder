import React from 'react';

import {Oswald} from "next/font/google";

const RampartOneFont = Oswald({
  weight: "400",
  subsets: ["latin"],
});

const Title: React.FC = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

    <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className={`${RampartOneFont.className} font-bold text-black opacity-100 text-9xl animate-tracking-in-expand`}>Fashion Folder</h1>
    </div>
      
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="space-y-2">
        <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_1.jpg" alt="Gallery Masonry Image" />
        <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_2.jpg" alt="Gallery Masonry Image" />
        <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_3.jpg" alt="Gallery Masonry Image" />
        </div>
        <div className="space-y-2">
        <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_4.jpg" alt="Gallery Masonry Image" />
        <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_5.jpg" alt="Gallery Masonry Image" />
        </div>
        <div className="space-y-2">
          <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_6.jpg" alt="Gallery Masonry Image" />
          <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_7.jpg" alt="Gallery Masonry Image" />
          <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_9.jpg" alt="Gallery Masonry Image" />
        </div>
        <div className="space-y-2">
          <img className="object-cover w-full h-auto opacity-50" src="/img/Wear_8.jpg" />
          <img className="object-cover w-full h-auto opacity-50" src="https://images.unsplash.com/photo-1668584054035-f5ba7d426401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Gallery Masonry Image" />
        </div>
      </div>
    </div>
  );
};

export default Title;