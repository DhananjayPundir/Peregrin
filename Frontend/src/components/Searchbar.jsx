import React from 'react'
import { Search, Plus } from 'lucide-react'

const SearchBar = ({ onAddDestination }) => (
  <div className="flex justify-between p-4 border-b items-center bg-white">
    <div className="flex items-center space-x-3">
      <Search className="h-5 w-5 text-gray-500" />
      <input type="text" placeholder="Search places..." className="flex-1 p-2 bg-gray-100 rounded-md" />
    </div>
    <button onClick={onAddDestination} className="flex items-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      <Plus className="mr-1 h-4 w-4" />
      Add Destination
    </button>
  </div>
)

export default SearchBar
