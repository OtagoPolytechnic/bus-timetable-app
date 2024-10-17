import React from 'react';
import { useTheme } from 'next-themes'; // Import useTheme
import { Button } from "@/components/ui/button"

interface RegionSelectorProps {
  regions: any[];
  onAreaSelect: (area: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ regions, onAreaSelect }) => {
  const { setTheme } = useTheme(); // Destructure setTheme from useTheme hook

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-6 pb-12 dark:bg-red-400">Choose Your Region</h2>


            {/* Use the setTheme function */}
            <Button className="py-4" onClick={() => setTheme("light")}>
        LIGHT
      </Button>
      <Button className="py-4" onClick={() => setTheme("dark")}>
        DARK
      </Button>



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {regions.length > 0 ? (
          regions.map((region: any) => (
            <button
              key={region.id}
              className="m-2 p-4 font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 bg-gray-100 font-bold dark:bg-red-500"
              onClick={() => onAreaSelect(region.id)}
            >
              {region.region_name}
            </button>
          ))
        ) : (
          <p>No regions available.</p>
        )}
      </div>

    </div>
  );
};

export default RegionSelector;
