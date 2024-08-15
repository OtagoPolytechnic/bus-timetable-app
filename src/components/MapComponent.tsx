import React, { useState } from 'react';
import { ChevronLeft, Navigation, MapPin, ChevronDown } from 'lucide-react';

const MapComponent: React.FC = () => {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
    setShowDropdown2(false); // Close the other dropdown
  };

  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
    setShowDropdown1(false); // Close the other dropdown
  };

  return (
    <div className="bg-white bg-opacity-80 text-black p-4 rounded-3xl shadow-lg mb-4">
      <div className="flex items-center py-2 px-2">
        <ChevronLeft className="mr-2 text-gray-800 cursor-pointer" />
        <h1 className="text-lg font-bold text-gray-800">Stuart Street, Dunedin, NZ</h1>
      </div>
      <p className="text-gray-600 font-medium pb-6 text-sm px-10">Welcome to the map!</p>
      
      <div className="mt-4">
        <div
          className="flex items-center justify-between p-2 bg-white shadow-inner text-gray-600 font-semibold text-sm rounded-md cursor-pointer mb-2"
          onClick={toggleDropdown1}
        >
          <div className="flex items-center">
            <Navigation className="mr-2 h-4 w-4" />
            <span>Where you are</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
        {showDropdown1 && (
          <div className="bg-white shadow-inner text-gray-600 font-semibold text-sm rounded-md mt-1">
            <div className="p-2 cursor-pointer hover:bg-gray-200">Current Location</div>
            <div className="p-2 cursor-pointer hover:bg-gray-200">Select on Map</div>
          </div>
        )}
        <div
          className="flex items-center justify-between p-2 bg-white shadow-inner text-gray-600 font-semibold text-sm rounded-md cursor-pointer"
          onClick={toggleDropdown2}
        >
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>Where you want to go</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </div>
        {showDropdown2 && (
          <div className="bg-white shadow-inner text-gray-600 font-semibold text-sm rounded-md mt-1">
            <div className="p-2 cursor-pointer hover:bg-gray-200">Option 1</div>
            <div className="p-2 cursor-pointer hover:bg-gray-200">Option 2</div>
            <div className="p-2 cursor-pointer hover:bg-gray-200">Option 3</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;