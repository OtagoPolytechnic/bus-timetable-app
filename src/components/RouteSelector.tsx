import React from 'react';

interface RouteSelectorProps {
  selectedArea: string;
  timetableData: any;
  onRouteSelect: (route: any) => void;
  onBack: () => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ selectedArea, timetableData, onRouteSelect, onBack }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-6 pb-12">Select a Route</h2>
      {timetableData[selectedArea] && timetableData[selectedArea].length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {timetableData[selectedArea].map((route: any) => (
            <button
              key={route.title}
              className="m-2 p-4 font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 bg-gray-100 text-left"
              onClick={() => onRouteSelect(route)}
            >
              {route.title}, {route.locations}
            </button>
          ))}
        </div>
      ) : (
        <p>No routes available for this region.</p>
      )}
    <button
      className="mt-6 px-4 py-2 text-black font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 "
      onClick={onBack}
      style={{ backgroundColor: 'var(--secondary-blue)', color: 'black' }}
    >
      Back to Regions
    </button>

    </div>
  );
};

export default RouteSelector;