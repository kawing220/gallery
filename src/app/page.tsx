"use client"
import GalleryPage from "./component/gallerylink";
import { BsHouseDoor } from "react-icons/bs";



export default function Home() {
  

 

  return (
<div className="pt-4 min-h-screen bg-gray-100 md:pt-10">
  <div className="relative">
    {/* Home icon - positioned differently on mobile vs desktop */}
    <div className="fixed top-6 right-6 z-50 md:absolute md:top-0 md:right-14">
      <BsHouseDoor className="text-gray-500 w-7 h-7 hover:text-blue-500 transition-colors cursor-pointer" /><a></a>
    </div>
    
    <h1 className="text-gray-500 text-xl font-bold text-center pt-2 pb-2 md:pt-0 md:pb-8 px-10">
      Kaylie Fung&apos;s Marketing & Design Projects
    </h1>
    
    <GalleryPage />
  </div>
</div>
  );
}