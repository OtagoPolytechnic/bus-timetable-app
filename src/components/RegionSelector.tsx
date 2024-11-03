import React from 'react';
import { Button } from "@/components/ui/button"; // Importing your custom button component

interface RegionSelectorProps {
  regions: any[];
  onAreaSelect: (area: string) => void;
  onBack: () => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ regions, onAreaSelect, onBack }) => {
  return (
    <div className="bg-white bg-opacity-90 p-6 rounded-lg  max-w-4xl w-full">
      
      {/* Back Button positioned absolutely in the top-right corner */}
   {/*    <Button
        className="absolute top-12 px-4 py-2 font-bold rounded-lg transition duration-300 ease-in-out bg-red-500 text-white hover:bg-red-700"
        onClick={onBack}
      >
        Back
      </Button> */}
      
      <div className="text-center mb-8">
      <h2 className="text-base font-semibold mb-2 dark:text-white">Choose Your Region</h2>
<p className="text-md text-gray-600 dark:text-gray-400">Please select your region below:</p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {regions.length > 0 ? (
          regions.map((region: any) => (
            <div key={region.id} className="flex justify-center">
              <Button
                className="w-full p-6 rounded-lg transition duration-300 ease-in-out bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-md transform hover:scale-105"
                onClick={() => onAreaSelect(region.id)}
              >
                {region.region_name}
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">No regions available.</p>
        )}
      </div>
    </div>
  );
};

export default RegionSelector;
