import React, { useState } from 'react';

const timetableData = {
  "Dunedin": [
    {
      number: 1, 
      route: "Palmerston - City", 
      detail: "City - Palmerston",
      stops: [
        { stopName: "Bond Street Terminus", startTime: "7:00 AM", endTime: "11:00 AM", nextService: "4:45 PM" },
        { stopName: "Kildare St, 3 (Waikouaiti)", startTime: "7:20 AM", endTime: "11:17 AM", nextService: "5:02 PM" },
        { stopName: "Beach Street, 28", startTime: "7:21 AM", endTime: "11:18 AM", nextService: "5:03 PM" },
        { stopName: "Beach Street, 94 (outside Church)", startTime: "7:21 AM", endTime: "11:18 AM", nextService: "5:03 PM" },
        { stopName: "Fell Street, 29", startTime: "7:22 AM", endTime: "11:19 AM", nextService: "5:04 PM" },
        { stopName: "Karitane General Store", startTime: "7:28 AM", endTime: "11:24 AM", nextService: "5:09 PM" },
        { stopName: "Hawksbury, SH1 towards City", startTime: "7:30 AM", endTime: "11:26 AM", nextService: "5:11 PM" },
        { stopName: "Arc Brewery", startTime: "7:45 AM", endTime: "11:33 AM", nextService: "5:22 PM" },
        { stopName: "Waitati, SH1 towards City", startTime: "7:50 AM", endTime: "11:41 AM", nextService: "5:26 PM" },
        { stopName: "Pine Hill Rd, 118", startTime: "8:00 AM", endTime: "11:53 AM", nextService: "5:36 PM" },
        { stopName: "Pine Hill Rd, cnr Bank St", startTime: "8:01 AM", endTime: "11:53 AM", nextService: "5:38 PM" },
        { stopName: "Bank St, Pet Doctors", startTime: "8:03 AM", endTime: "11:54 AM", nextService: "5:38 PM" },
        { stopName: "Great King St North, Botanic Gardens", startTime: "8:04 AM", endTime: "11:55 AM", nextService: "5:39 PM" },
        { stopName: "Cumberland St, 894", startTime: "8:05 AM", endTime: "11:57 AM", nextService: "5:40 PM" },
        { stopName: "Cumberland St, 764", startTime: "8:06 AM", endTime: "11:57 AM", nextService: "5:41 PM" },
        { stopName: "Castle St, 329", startTime: "8:08 AM", endTime: "11:58 AM", nextService: "5:42 PM" },
        { stopName: "Castle St, 201", startTime: "8:08 AM", endTime: "11:59 AM", nextService: "5:44 PM" },
        { stopName: "Bus Hub Stop H", startTime: "8:10 AM", endTime: "12:00 PM", nextService: "5:45 PM" },
      ],
    },
    { number: 10, route: "Opoho - City - Shiel Hill", detail: "City - Opoho - Shiel Hill" },
    { number: 11, route: "Shiel Hill - City - Opoho", detail: "City - Shiel Hill - Opoho" },
    { number: 14, route: "Port Chalmers - City", detail: "City - Port Chalmers" },
    { number: 15, route: "Ridge Runner Northbound", detail: "Ridge Runner Southbound" },
    { number: 18, route: "Portobello (Harington Point) - City", detail: "City - Portobello (Harington Point)" },
    { number: 19, route: "Waverley - City - Belleknowes", detail: "City - Belleknowes - Waverley" },
    { number: 23, route: "Corstorphine - Caversham - City - Wakari", detail: "Wakari - City - Caversham - Corstorphine" },
    { number: 37, route: "Concord - City - University", detail: "University - City - Concord" },
    { number: 38, route: "University - City - Concord", detail: "Concord - City - University" },
    { number: 44, route: "St Kilda - City - Halfway Bush", detail: "Halfway Bush - City - St Kilda" },
    { number: 50, route: "St Clair Park - City - Helensburgh", detail: "Helensburgh - City - St Clair Park" },
    { number: 55, route: "St Kilda - City - Brockville", detail: "Brockville - City - St Kilda" },
    { number: 61, route: "City - Kenmure", detail: "Kenmure - City" },
    { number: 63, route: "Balaclava - City - Logan Park", detail: "Logan Park - City - Balaclava" },
    { number: 70, route: "Brighton - Abbotsford and Green Island", detail: "Green Island - Abbotsford and Brighton" },
    { number: 77, route: "Mosgiel, Fairfield, Green Island - City", detail: "City - Green Island, Fairfield, Mosgiel" },
    { number: 78, route: "Mosgiel to City Express", detail: "City to Mosgiel Express" },
    { number: 80, route: "Mosgiel East circuit", detail: "Mosgiel East circuit" },
    { number: 81, route: "Mosgiel West circuit", detail: "Mosgiel West circuit" },
  ],
  "Queenstown": [
    { number: 37, route: "Concord - City - University", detail: "University - City - Concord" },
    // Add Queenstown routes similarly if required
  ]
};

const Home: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    setSelectedRoute(null);
  };

  const handleRouteSelect = (route: any) => {
    setSelectedRoute(route);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-10 text-center">
        Dunedin Bus Timetable
      </h1>

      {!selectedArea && (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Choose Your Region</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.keys(timetableData).map((area) => (
              <button
                key={area}
                className="m-2 p-4 bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold rounded-lg shadow-lg hover:from-teal-600 hover:to-green-600 transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleAreaSelect(area)}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedArea && !selectedRoute && (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Select a Route</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {timetableData[selectedArea].map((route) => (
              <button
                key={route.number}
                className="m-2 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transform transition-transform duration-300 hover:scale-105"
                onClick={() => handleRouteSelect(route)}
              >
                {route.route}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedRoute && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">
{selectedRoute.route}</h2>
          {selectedRoute.stops ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Stop Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Next Service
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedRoute.stops.map((stop, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">
                      {stop.stopName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {stop.startTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {stop.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {stop.nextService}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-700">No stops available for this route.</p>
            </div>
          )}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedRoute(null)}
            >
              Back to Routes
            </button>
            <button
              className="ml-4 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transform transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedArea(null)}
            >
              Back to Areas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
