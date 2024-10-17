import React from 'react';

interface RegionSelectorProps {
  regions: any[];
  onAreaSelect: (area: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ regions, onAreaSelect }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-6 pb-12">Choose Your Region</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {regions.length > 0 ? (
          regions.map((region: any) => (
            <button
              key={region.id}
              className="m-2 p-4 font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 bg-gray-100 font-bold"
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