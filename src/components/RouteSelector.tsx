import React from 'react';

interface RouteSelectorProps {
  selectedArea: string;
  timetableData: any;
  onRouteSelect: (route: any) => void;
  onBack: () => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ selectedArea, timetableData, onRouteSelect, onBack }) => {
  return (
    <div className="text-center relative">
      <button
        className="absolute top-4 right-4 px-4 py-2 font-bold rounded-lg shadow-lg transition duration-300 ease-in-out bg-red-500 text-white hover:bg-red-700 hover:shadow-xl"
        onClick={onBack}
      >
        Back
      </button>
      
      <h2 className="text-xl font-semibold mb-6 pb-12">Select a Route</h2>
      {timetableData[selectedArea] && timetableData[selectedArea].length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {timetableData[selectedArea].map((route: any) => (
            <button
              key={route.title}
              className="m-2 p-4 font-bold rounded-lg shadow-lg transition duration-300 ease-in-out bg-blue-500 text-white hover:bg-blue-700 hover:shadow-xl"
              onClick={() => onRouteSelect(route)}
            >
              {route.title}, {route.locations}
            </button>
          ))}
        </div>
      ) : (
        <p>No routes available for this region.</p>
      )}
    </div>
  );
};

export default RouteSelector;