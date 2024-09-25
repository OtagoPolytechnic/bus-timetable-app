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
      <h2 className="text-3xl font-semibold mb-6">Select a Route</h2>
      {timetableData[selectedArea] && timetableData[selectedArea].length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {timetableData[selectedArea].map((route: any) => (
            <button
              key={route.title}
              className="m-2 p-4 font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              onClick={() => onRouteSelect(route)}
              style={{ backgroundColor: '#FFFACD', color: 'black' }}
            >
              {route.title}
            </button>
          ))}
        </div>
      ) : (
        <p>No routes available for this region.</p>
      )}
      <button
        className="mt-6 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transform transition-transform duration-300 hover:scale-105"
        onClick={onBack}
      >
        Back to Regions
      </button>
    </div>
  );
};

export default RouteSelector;