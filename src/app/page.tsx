"use client"
import { useEffect, useState } from "react";
import GalleryPage from "./component/gallerylink";


export default function Home() {
  

 

  return (
       <div className="pt-4 min-h-screen bg-gray-100"><h1 className="text-gray-500 text-2xl font-bold text-center py-4">Kaylie Fung&apos;s Marketing & Design Projects</h1>
        
      <GalleryPage />

      
    </div>
  );
}