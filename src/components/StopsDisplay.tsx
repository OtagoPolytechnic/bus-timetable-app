import React, { useState } from 'react';

interface StopsDisplayProps {
  selectedService: any;
  getCurrentDayTrips: (service: any) => any[];
  getStopsForCurrentServiceVersion: (service: any, serviceVersion: number) => any[];
  calculateStopTime: (startTime: string, increment: number) => string;
  onBack: () => void;
}

const StopsDisplay: React.FC<StopsDisplayProps> = ({
  selectedService,
  getCurrentDayTrips,
  getStopsForCurrentServiceVersion,
  calculateStopTime,
  onBack,
}) => {
  const [visibleColumn, setVisibleColumn] = useState<number>(0);

  const handleNextColumn = () => {
    setVisibleColumn((prevColumn) => prevColumn + 1);
  };

  const handlePrevColumn = () => {
    if (visibleColumn > 0) {
      setVisibleColumn((prevColumn) => prevColumn - 1);
    }
  };

  const trips = getCurrentDayTrips(selectedService);

  return (
    <div
      className="absolute top-8 left-8 bg-white p-6 rounded-lg shadow-lg w-96"
      style={{ zIndex: 20 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Stops for {selectedService.code}
      </h2>

      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg"
          onClick={handlePrevColumn}
          disabled={visibleColumn === 0}
        >
          &lt;
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg"
          onClick={handleNextColumn}
        >
          &gt;
        </button>
      </div>

      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Stop Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trips.map((trip: any, index: number) => {
            const stops = getStopsForCurrentServiceVersion(selectedService, trip.service_version);
            return stops.map((stop: any, stopIndex: number) => (
              <tr key={`${index}-${stopIndex}`}>
                <td className="px-6 py-4 text-sm text-gray-700">{stop.address}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {calculateStopTime(trip.start_time, stop.increment + visibleColumn * 30)}
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>

      <button
        className="mt-6 px-4 py-2 text-black font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
        onClick={onBack}
        style={{ backgroundColor: 'var(--global-red)', color: 'white' }}
      >
        Back to Services
      </button>
    </div>
  );
};

export default StopsDisplay;
