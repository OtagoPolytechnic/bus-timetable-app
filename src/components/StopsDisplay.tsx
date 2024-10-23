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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const stopsPerPage = 8; 

  const trips = getCurrentDayTrips(selectedService);
  const stops: any[] = []; // Initialize an array to hold stops
  const tripTimes: { [key: string]: string } = {}; 

  // stops for each trip and their corresponding times
  trips.forEach((trip: any) => {
    const tripStops = getStopsForCurrentServiceVersion(selectedService, trip.service_version);
    
    // Store the start time for the trip
    const tripStartTime = trip.start_time;

    tripStops.forEach((stop: any, index: number) => {
      const stopTime = calculateStopTime(tripStartTime, stop.increment); // Calculate stop time
      stops.push({ ...stop, time: stopTime }); // Push stop with calculated time
    });
  });

  // Calculate the number of pages
  const totalPages = Math.ceil(stops.length / stopsPerPage);
  
  // Get stops for the current page
  const currentStops = stops.slice(currentPage * stopsPerPage, (currentPage + 1) * stopsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="absolute top-8 left-8 bg-white p-6 rounded-lg shadow-lg w-96" style={{ zIndex: 20 }}>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Stops for {selectedService.code}
      </h2>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg"
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          &lt; Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg"
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next &gt;
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
          {currentStops.map((stop: any, stopIndex: number) => (
            <tr key={stopIndex}>
              <td className="px-6 py-4 text-sm text-gray-700">{stop.address}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{stop.time}</td>
            </tr>
          ))}
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
