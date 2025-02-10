import React from 'react'
import { Menu, Share2 } from 'lucide-react'

const Header = ({ logoSrc, tripTitle, tripDates }) => (
  <header className="flex items-center justify-between p-4 bg-[#2C5530] shadow-md">
    <div className="flex items-center space-x-4">
      <button className="p-2 text-white bg-transparent hover:bg-green-700 rounded-full">
        <Menu className="h-6 w-6" />
      </button>
      <img src={logoSrc} alt="Péregrin Logo" className="h-10 w-auto" loading="lazy" />
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-sm text-white">
        <span className="font-semibold">{tripTitle}</span>
        <span className="mx-2">•</span>
        <span>{tripDates}</span>
      </div>
      <button className="p-2 bg-transparent border border-white rounded-md text-white hover:bg-white/10">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </button>
    </div>
  </header>
)

export default Header
