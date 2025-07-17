"use client";

import { useState } from "react";

interface GalleryCategory {
  id: string;
  title: string;
  imageCount: number;
  prefix: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Define your gallery categories
  const categories: GalleryCategory[] = [
    { id: 'menu', title: 'Menu Design', imageCount: 35, prefix: '/menu/image' },
    { id: 'post', title: 'Social Media Post Design', imageCount: 8, prefix: '/post/image' },
    { id: 'design idea', title: 'Master-mind of the project', imageCount: 13, prefix: '/designidea/image' },
    { id: 'adcopy', title: 'Ad Copy', imageCount: 20, prefix: '/adcopy/image' },
    { id: 'print', title: 'Print Material', imageCount: 5, prefix: '/print/image' },
    // { id: 'event', title: 'Event Organization Record', imageCount: 10, prefix: '/event/image' }
  ];

  // Generate image paths for a category
  const getImagesForCategory = (category: GalleryCategory) => {
    const images = [];
    for (let i = 1; i <= category.imageCount; i++) {
      images.push(`${category.prefix}${i}.png`);
    }
    return images;
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-6">Profolio</h1> */}
      
      {/* Accordion */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="border rounded-sm overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => toggleCategory(category.id)}
              aria-expanded={expandedCategory === category.id}
            >
              <span className="font-medium text-gray-500">{category.title}</span>
              <span className="text-xl text-gray-500">
                {expandedCategory === category.id ? '−' : '+'}
              </span>
            </button>
            
            {/* Gallery Grid (hidden unless expanded) */}
            {expandedCategory === category.id && (
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {getImagesForCategory(category).map((src, index) => (
                    <div
                      key={index}
                      className="cursor-pointer group relative overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedImage(src)}
                    >
                      <img
                        src={src}
                        alt={`${category.title} ${index + 1}`}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain mx-auto rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close image viewer"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}