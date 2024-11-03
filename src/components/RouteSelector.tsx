import React from 'react';

interface RouteSelectorProps {
  selectedArea: string;
  timetableData: any;
  onRouteSelect: (route: any) => void;
  onBack: () => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ selectedArea, timetableData, onRouteSelect, onBack }) => {
  return (
    <div className="text-center relative p-8 bg-white bg-opacity-90 rounded-lg max-w-4xl mx-auto space-y-6">
      <h2 className="text-base font-semibold mb-2 dark:text-white">Select a Route</h2>
      <p className="text-md text-gray-600 mb-6">Please select your route below:</p>
      
      {timetableData[selectedArea] && timetableData[selectedArea].length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {timetableData[selectedArea].map((route: any) => (
            <button
              key={route.title}
              className="relative m-2 p-5 font-bold rounded-lg shadow-lg transition duration-300 ease-in-out bg-blue-500 text-white hover:bg-blue-700 hover:shadow-xl transform hover:scale-105"
              onClick={() => onRouteSelect(route)}
            >
              {/* Positioning the route number in the upper left corner */}
              <span className="absolute top-2 left-2 text-white text-xs font-semibold bg-blue-600 px-2 rounded">
                {route.number} {/* Use route.number or any identifier for the route */}
              </span>
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold">{route.title}</span>
                <span className="text-sm text-white-300">{route.locations}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mt-4">No routes available for this region.</p>
      )}
    </div>
  );
};

export default RouteSelector;
