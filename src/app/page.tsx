"use client"
import { useEffect, useState } from "react";
// import Image from "next/image";
import GalleryPage from "./component/gallerylink";
import { GoMoveToTop } from "react-icons/go";

export default function Home() {
  const [showButton, setShowButton] = useState(false);

  // Show the "Back to Top" button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
       <div className="pt-4 min-h-screen bg-gray-100">
            <h2 className="text-gray-500 text-xl font-bold text-center py-2">Kaylie Fung's Portfolio</h2>
      <GalleryPage />
      
      {/* Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "30px",
            backgroundColor: "#ffff",
            color: "gray",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
        >
          <GoMoveToTop />
        </button>
      )}
    </div>
  );
}