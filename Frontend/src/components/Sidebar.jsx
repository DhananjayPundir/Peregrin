import React from 'react'
import {CalendarIcon} from 'lucide-react'

const Sidebar = ({ tripDates, itinerary, onDateSelect, addItemToItinerary, removeItem }) => (
  <aside className="w-96 bg-white border-r overflow-y-auto">
    {/* Date Selector */}
    <div className="p-4">
      <button onClick={onDateSelect} className="w-full p-2 bg-gray-200 rounded-md text-left font-normal">
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span>{tripDates}</span>
      </button>
    </div>
    {/* Itinerary List */}
    <div className="p-4 space-y-4">
      {itinerary.map((day, dayIndex) => (
        <div key={dayIndex} className="p-4 border-l-4 border-blue-500">
          {/* Add Day and Items here */}
        </div>
      ))}
    </div>
  </aside>
)

export default Sidebar
