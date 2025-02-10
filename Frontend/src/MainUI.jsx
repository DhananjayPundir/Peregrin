import React, { useState, useEffect } from 'react'
import { MapPin, Plus, Search, Menu, Share2, CalendarIcon, Utensils, Bed, Car, Plane, Sun, Cloud, Umbrella, Coffee, Star, Landmark, Trash2, ChevronLeft, ChevronRight, X, Hotel } from 'lucide-react'
import { format } from 'date-fns'
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as LabelPrimitive from "@radix-ui/react-label"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const API_BASE_URL = 'http://localhost:5001/api';

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "text-primary underline-offset-4 hover:underline": variant === "link",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
          "h-10 w-10": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

const Calendar = React.forwardRef(({ className, classNames, showOutsideDays = true, ...props }, ref) => (
  <DayPicker
    ref={ref}
    showOutsideDays={showOutsideDays}
    className={cn("p-3 bg-white", className)}
    classNames={{
      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
      month: "space-y-4",
      caption: "flex justify-center pt-1 relative items-center",
      caption_label: "text-sm font-medium",
      nav: "space-x-1 flex items-center",
      nav_button: cn(
        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      ),
      nav_button_previous: "absolute left-1",
      nav_button_next: "absolute right-1",
      table: "w-full border-collapse space-y-1",
      head_row: "flex",
      head_cell:
        "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
      row: "flex w-full mt-2",
      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
      day: cn(
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
      ),
      day_selected:
        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
      day_today: "bg-accent text-accent-foreground",
      day_outside: "text-muted-foreground opacity-50",
      day_disabled: "text-muted-foreground opacity-50",
      day_range_middle:
        "aria-selected:bg-accent aria-selected:text-accent-foreground",
      day_hidden: "invisible",
      ...classNames,
    }}
    components={{
      IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
      IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
    }}
    {...props}
  />
))
Calendar.displayName = "Calendar"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-white p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const Tabs = TabsPrimitive.Root
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-[1001] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-[1002] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
        "max-h-[85vh] overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

function PlaceCard({ place, icon, onAdd }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            {icon}
            <div>
              <h3 className="font-medium text-lg">{place.name}</h3>
              <p className="text-sm text-gray-600">{place.category?.name || place.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {place.rating && (
              <div className="flex items-center bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-medium">
                <Star className="h-3 w-3 mr-1" />
                {place.rating}
              </div>
            )}
            <Button size="sm" onClick={() => onAdd(place)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {place.address && <p className="text-sm text-gray-700 mt-2">{place.address}</p>}
      </CardContent>
    </Card>
  )
}

export default function Component() {
  const [date, setDate] = useState({ from: new Date(), to: new Date(new Date().setDate(new Date().getDate() + 1)) })
  const [itinerary, setItinerary] = useState({})
  const [selectedDay, setSelectedDay] = useState(null)
  const [isPlaceDialogOpen, setIsPlaceDialogOpen] = useState(false)
  const [places, setPlaces] = useState({
    attractions: [],
    restaurants: [],
    hotels: []
  })
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [mapCenter, setMapCenter] = useState([48.8566, 2.3522]) 
  const [mapTilerKey, setMapTilerKey] = useState('')

  useEffect(() => {
    if (date.from && date.to) {
      const days = (date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24) + 1
      const dateRange = {}
      for (let i = 0; i < days; i++) {
        const currentDate = new Date(date.from)
        currentDate.setDate(currentDate.getDate() + i)
        dateRange[currentDate.toISOString().split('T')[0]] = []
      }
      setItinerary(dateRange)
    } else {
      setItinerary({})
    }
  }, [date])

  useEffect(() => {
    if (selectedPlace) {
      fetchWeather(selectedPlace.lat, selectedPlace.lon)
    }
  }, [selectedPlace])

  useEffect(() => {
    const fetchMapTilerKey = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/map-key`);
        setMapTilerKey(response.data.key);
      } catch (error) {
        console.error('Error fetching MapTiler API key:', error);
        setError('Failed to load map. Please try again.');
      }
    };
  
    fetchMapTilerKey();
  }, []);

  const searchPlaces = async (query) => {
    setIsSearching(true)
    setError(null)
    try {
      const geocodeResponse = await axios.get(`${API_BASE_URL}/ors/geocode`, {
        params: { city: query }
      })
      const { lat, lon } = geocodeResponse.data
      setMapCenter([lat, lon])
      setSelectedPlace({ lat, lon, name: query })

      const placesResponse = await axios.get(`${API_BASE_URL}/places`, {
        params: { city: query, query: 'attractions' }
      })
      setPlaces({
        attractions: placesResponse.data.attractions?.data.filter(
          attraction => !attraction.is_rollup && attraction.category?.key !== 'rollup'
        ) || [],
        restaurants: placesResponse.data.restaurants?.data || [],
        hotels: placesResponse.data.hotels?.data || []
      })
    } catch (error) {
      console.error('Error searching places:', error)
      if (axios.isAxiosError(error)) {
        setError(`Failed to search places: ${error.message}. ${error.response?.data?.message || ''}`)
      } else {
        setError('Failed to search places. Please try again.')
      }
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchPlaces(searchQuery)
    }
  }

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/forecast`, {
        params: { city: selectedPlace.name }
      })
      setWeather(response.data)
    } catch (error) {
      console.error('Error fetching weather:', error)
      if (axios.isAxiosError(error)) {
        setError(`Failed to fetch weather: ${error.message}. ${error.response?.data?.message || ''}`)
      } else {
        setError('Failed to fetch weather. Please try again.')
      }
      setWeather(null)
    }
  }

  const handleAddPlace = (place) => {
    if (selectedDate) {
      setItinerary(prev => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), place]
      }))
      setIsPlaceDialogOpen(false)
    }
  }

  const handleRemovePlace = (date, placeId) => {
    setItinerary(prev => ({
      ...prev,
      [date]: prev[date].filter(place => place.location_id !== placeId)
    }))
  }
  const customIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <header className="flex items-center justify-between p-4 bg-[#2C5530] shadow-md">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white hover:text-[#2C5530] transition-colors">
            <Menu className="h-6 w-6" />
          </Button>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Peregrin-2NbvDFGy1tYx3Cs6G3lJKQSld0U4CN.png"
            alt="Péregrin Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
            loading="lazy"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-cream">
            <span>{date.from && date.to ? `${format(date.from, 'PP')} - ${format(date.to, 'PP')}` : 'Select dates'}</span>
          </div>
          <Button variant="outline" size="me" className="text-white border-white hover:bg-white hover:text-[#2C5530] transition-colors">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback className="bg-white text-[#2C5530]">U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-2/5 bg-white border-r overflow-y-auto">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Where to?"
                className="w-full bg-white shadow-md pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                disabled={isSearching}
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Separator />
          <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="places">Places</TabsTrigger>
            </TabsList>
            <TabsContent value="itinerary" className="p-4">
              <h2 className="font-semibold mb-4 text-lg text-blue-600">Trip Itinerary</h2>
              <div className="space-y-4">
                {Object.entries(itinerary).map(([date, places], index) => (
                  <Card key={date} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">Day {index + 1} - {format(new Date(date), 'MMM dd')}</h3>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedDate(date)
                            setIsPlaceDialogOpen(true)
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Place
                        </Button>
                      </div>
                      {places && places.map((item, itemIndex) => {
                        const weatherForDay = weather && weather[index];
                        return (
                          <div key={itemIndex} className="mt-2 flex justify-between items-start">
                            <div className="flex items-start space-x-3">
                              <Landmark className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">{item.category?.name || item.category}</p>
                                {weatherForDay && (
                                  <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <img src={weatherForDay.day.condition.icon} alt={weatherForDay.day.condition.text} className="h-4 w-4 mr-1" />
                                    <span>{weatherForDay.day.avgtemp_c}°C</span>
                                    <span className="ml-1">{weatherForDay.day.condition.text}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemovePlace(date, item.location_id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove {item.name} from itinerary</span>
                            </Button>
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="places" className="p-4">
              <div className="space-y-6">
                {Object.entries(places).map(([category, items]) => (
                  <div key={category}>
                    <h2 className="font-semibold mb-4 text-lg text-blue-600 capitalize">{category}</h2>
                    <div className="space-y-4">
                      {items.map((place) => (
                        <PlaceCard
                          key={place.location_id}
                          place={place}
                          icon={
                            category === 'attractions' ? <Landmark className="h-5 w-5 text-blue-500" /> :
                            category === 'hotels' ? <Hotel className="h-5 w-5 text-purple-500" /> :
                            <Utensils className="h-5 w-5 text-red-500" />
                          }
                          onAdd={handleAddPlace}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            {mapTilerKey ? (
              <MapContainer 
                center={mapCenter} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                className="leaflet-container"
              >
                <TileLayer
                  url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${mapTilerKey}`}
                  attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                <ZoomControl position="bottomleft" />
                <MapUpdater center={mapCenter} />
                {selectedPlace && (
                  <Marker position={[selectedPlace.lat, selectedPlace.lon]}>
                    <Popup>{selectedPlace.name}</Popup>
                  </Marker>
                )}
                  {Object.values(places).flat().map((place) => (
                  place.latitude && place.longitude && (
                    <Marker 
                      key={place.location_id} 
                      position={[parseFloat(place.latitude), parseFloat(place.longitude)]} 
                      icon={customIcon}
                    >
                      <Popup>
                        <div>
                          <h3 className="font-bold">{place.name}</h3>
                          <p>{place.category?.name || place.category}</p>
                          {place.rating && (
                            <p className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-yellow-500" />
                              {place.rating}
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Loading map...</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Dialog open={isPlaceDialogOpen} onOpenChange={setIsPlaceDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Add Place to Itinerary</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto max-h-[calc(85vh-120px)]">
            {Object.entries(places).map(([category, items]) => (
              <div key={category}>
                <h4 className="font-semibold mb-2 text-lg capitalize">{category}</h4>
                {items.map((place) => (
                  <PlaceCard
                    key={place.location_id}
                    place={place}
                    icon={
                      category === 'attractions' ? <Landmark className="h-5 w-5 text-blue-500" /> :
                      category === 'hotels' ? <Hotel className="h-5 w-5 text-purple-500" /> :
                      <Utensils className="h-5 w-5 text-red-500" />
                    }
                    onAdd={handleAddPlace}
                  />
                ))}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


