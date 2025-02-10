import React from 'react'
import { MapPin } from 'lucide-react'

const Map = ({ center }) => (
  <div className="w-full h-full bg-blue-50 flex items-center justify-center relative">
    <span className="text-blue-500">Interactive Map</span>
    <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
      <MapPin className="w-4 h-4 text-white" />
    </div>
  </div>
)

export default Map
