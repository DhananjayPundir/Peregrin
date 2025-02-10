
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Peregrin from '@/components/Peregrin.png';
import ParisImage from '@/components/paris.jpg';
import TokyoImage from '@/components/tokyo.webp';
import NYCImage from '@/components/nyc.jpg';
import { ArrowRight, MapPin, Compass, Calendar, Globe, Search } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C5530] to-[#1E3D23] text-white">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <img
          src={Peregrin}
          alt="Péregrin Logo"
          width={300}
          height={100}
          className="h-14 w-auto"
          loading="lazy"
        />
        <nav className="hidden md:flex space-x-4">
          <a href="#features" className="hover:text-green-300 transition-colors">Features</a>
          <a href="#explore" className="hover:text-green-300 transition-colors">Explore</a>
          <a href="#about" className="hover:text-green-300 transition-colors">About</a>
          <a href="#contact" className="hover:text-green-300 transition-colors">Contact</a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your Perfect Journey with Péregrin</h1>
          <p className="text-xl mb-6">Discover, plan, and experience unforgettable adventures around the world.</p>
          <button
            onClick={handleStartPlanning}
            className="bg-green-500 hover:bg-green-600 text-white text-lg py-3 px-6 rounded-md inline-flex items-center"
          >
            Start Planning <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

        <section id="features" className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Péregrin?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/** Feature Cards */}
            <CustomCard icon={<MapPin className="h-8 w-8 text-green-400" />} title="Discover Hidden Gems" description="Uncover unique destinations and local secrets." />
            <CustomCard icon={<Compass className="h-8 w-8 text-green-400" />} title="Smart Itinerary Planning" description="Create personalized travel plans with recommendations." />
            <CustomCard icon={<Calendar className="h-8 w-8 text-green-400" />} title="Flexible Scheduling" description="Adjust your plans on-the-go with dynamic tools." />
            <CustomCard icon={<Globe className="h-8 w-8 text-green-400" />} title="Global Exploration" description="Access a world of destinations with ease." />
          </div>
        </section>

        <section id="explore" className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Amazing Destinations</h2>
          <div className="max-w-md mx-auto mb-8">
            <div className="flex">
              <input placeholder="Search destinations" className="w-full p-3 rounded-l-md text-gray-700" />
              <button className="bg-gray-300 hover:bg-gray-400 p-3 rounded-r-md">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DestinationCard
              title="Paris, France"
              description="City of love and lights."
              image={ParisImage}
            />
            <DestinationCard
              title="Tokyo, Japan"
              description="Tradition meets technology."
              image={TokyoImage}
            />
            <DestinationCard
              title="New York City, USA"
              description="Experience the Big Apple."
              image={NYCImage}
            />
          </div>
        </section>
      </main>

      <footer className="bg-[#1E3D23] py-8 mt-12 text-center text-green-200">
        <p>&copy; 2023 Péregrin. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Custom Card Components

function CustomCard({ icon, title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg text-white text-center">
      <div className="mb-2">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function DestinationCard({ title, description, image }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg text-center">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" loading="lazy" />
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
