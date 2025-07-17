"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryCategory {
  id: string;
  title: string;
  imageCount: number;
  prefix: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: GalleryCategory[] = [
    { id: 'menu', title: 'Menu Design', imageCount: 33, prefix: '/menu/image' },
    { id: 'post', title: 'Social Media Post Design', imageCount: 8, prefix: '/post/image' },
    { id: 'design idea', title: 'Master-mind of the project', imageCount: 13, prefix: '/designidea/image' },
    { id: 'adcopy', title: 'Ad Copy', imageCount: 20, prefix: '/adcopy/image' },
    { id: 'print', title: 'Print Material', imageCount: 5, prefix: '/print/image' },
  ];

  const getImagesForCategory = (category: GalleryCategory) => {
    const images = [];
    for (let i = 1; i <= category.imageCount; i++) {
      images.push({
        src: `${category.prefix}${i}.png`,
        alt: `${category.title} ${i}`
      });
    }
    return images;
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
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
            
            {expandedCategory === category.id && (
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {getImagesForCategory(category).map((image, index) => (
                    <div
                      key={index}
                      className="cursor-pointer group relative overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedImage(image.src)}
                    >
                      {/* Remove fixed height container and use responsive width */}
                      <div className="relative w-full" style={{ height: 'auto' }}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={400}  // Set a base width
                          height={0}   // Let height be calculated automatically
                          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <div className="relative w-full" style={{ height: '80vh' }}>
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain rounded-lg"
                quality={100}
              />
            </div>
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