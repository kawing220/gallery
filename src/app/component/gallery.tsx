"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GoMoveToTop } from "react-icons/go";

interface GalleryCategory {
  id: string;
  title: string;
  imageCount: number;
  prefix: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [currentCategory, setCurrentCategory] = useState<GalleryCategory | null>(null);
  const [isLightboxLoading, setIsLightboxLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

    //Show the "Back to Top" button when the user scrolls down
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 200) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    //Scroll to the top of the page
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
  // For touch/swipe controls
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const categories: GalleryCategory[] = [
    { id: 'menu', title: 'Menu Design', imageCount: 34, prefix: '/menu/image' },
    { id: 'post', title: 'Social Media Post Design', imageCount: 8, prefix: '/post/image' },
    { id: 'design idea', title: 'Master-mind of the project', imageCount: 13, prefix: '/designidea/image' },
    { id: 'adcopy', title: 'Ad Copy', imageCount: 20, prefix: '/adcopy/image' },
    { id: 'print', title: 'Print Materials', imageCount: 5, prefix: '/print/image' },
    { id: 'event', title: 'Event Photos', imageCount: 30, prefix: '/event/image' },
  ];

  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);


  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedImageIndex, currentCategory]);

  // Touch event handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const threshold = 50;
    const difference = touchStart - touchEnd;
    
    if (difference > threshold) {
      navigateImage('next');
    } else if (difference < -threshold) {
      navigateImage('prev');
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

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

  const openLightbox = (src: string, category: GalleryCategory, index: number) => {
    setIsLightboxLoading(true);
    setSelectedImage(src);
    setSelectedImageIndex(index);
    setCurrentCategory(category);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!currentCategory) return;
    
    const images = getImagesForCategory(currentCategory);
    let newIndex = direction === 'next' 
      ? selectedImageIndex + 1 
      : selectedImageIndex - 1;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setIsLightboxLoading(true);
    setSelectedImage(images[newIndex].src);
    setSelectedImageIndex(newIndex);
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="gray" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
       {/* Vertical Menu Bar */}
        <div className={`w-60 bg-gray-100 border-r border-gray-200 overflow-y-auto fixed md:static h-full z-30 transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Categories</h2>
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setMobileMenuOpen(false);
                }}
              >
                {category.title}
                <span className="ml-2 text-xs text-gray-500">
                  ({category.imageCount})
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
       {showButton && (
              <button
                onClick={scrollToTop}
                style={{
                  position: "fixed",
                  bottom: "500px",
                  right: "30px",
                  backgroundColor: "#ffff",
                  color: "gray",
                  border: "none",
                  borderRadius: "50%",
                  width: "400px",
                  height: "400px",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <GoMoveToTop />
              </button>
            )}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {categories.find(c => c.id === activeCategory)?.title || 'Gallery'}
        </h1>
        
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-16">          
  {getImagesForCategory(categories.find(c => c.id === activeCategory)!).map((image, index) => (
            <div
              key={index}
              className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => openLightbox(
                image.src, 
                categories.find(c => c.id === activeCategory)!, 
                index
              )}
            >
                <div className="relative w-full" style={{ height: 'auto' }}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={400}
                          height={0}
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
          ref={lightboxRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative max-w-4xl w-full" style={{ height: '80vh' }}>
            {isLightboxLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 relative">
                  <div className="absolute h-full w-full rounded-full border-4 border-t-transparent border-r-transparent border-b-transparent border-l-blue-300 animate-spin"></div>
                </div>
              </div>
            )}

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              aria-label="Next image"
            >
              &#10095;
            </button>

            <Image
              src={selectedImage}
              alt="Enlarged view"
              fill
              className={`object-contain rounded-lg transition-opacity duration-300 ${
                isLightboxLoading ? 'opacity-0' : 'opacity-100'
              }`}
              quality={100}
              priority
              onLoadingComplete={() => setIsLightboxLoading(false)}
            />
            
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
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