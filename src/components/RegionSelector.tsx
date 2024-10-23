import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button"; // Importing your custom button component

interface RegionSelectorProps {
  regions: any[];
  onAreaSelect: (area: string) => void;
  onBack: () => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ regions, onAreaSelect, onBack }) => {

  return (
    <div className="text-center relative">
   
      <Button
        className="absolute top-4 right-4 px-4 py-2 font-bold rounded-lg shadow-lg transition duration-300 ease-in-out bg-red-500 text-white hover:bg-red-700 hover:shadow-xl"
        onClick={onBack}
      >
        Back
      </Button>
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6 pb-4 dark:text-white">Choose Your Region</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {regions.length > 0 ? (
            regions.map((region: any) => (
              <Button
                key={region.id}
                className="m-2 p-4 rounded-lg shadow-lg transition duration-300 ease-in-out bg-blue-500 text-white hover:bg-blue-700 hover:shadow-xl"
                onClick={() => onAreaSelect(region.id)}
              >
                {region.region_name}
              </Button>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No regions available.</p>
          )}
        </div>

        <style jsx>{`
          .hover\\:bg-light-blue-500:hover {
            background-color: rgba(173, 216, 230, 0.8); /* Light blue */
            transition: background-color 0.5s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default RegionSelector;
