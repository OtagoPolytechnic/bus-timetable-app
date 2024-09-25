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

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">
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
          {getCurrentDayTrips(selectedService).map((trip: any, index: number) => (
            <React.Fragment key={index}>
              {getStopsForCurrentServiceVersion(selectedService, trip.service_version).map((stop: any, stopIndex: number) => (
                <tr key={stopIndex}>
                  <td className="px-6 py-4 text-sm text-gray-700">{stop.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {calculateStopTime(trip.start_time, stop.increment + visibleColumn * 30)}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button
        className="mt-6 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg"
        onClick={onBack}
      >
        Back to Services
      </button>
    </div>
  );
};

export default StopsDisplay;