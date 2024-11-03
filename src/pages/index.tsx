import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import RegionSelector from '../components/RegionSelector';
import RouteSelector from '../components/RouteSelector';
import ServiceSelector from '../components/ServiceSelector';
import StopsDisplay from '../components/StopsDisplay';
import logo from '/public/App.png';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiemFjYm1yMjIiLCJhIjoiY2x5ZHRtZDJqMDVsNDJrb3VmZWZoMG9yciJ9.Vid6j50Ey1xMLT6n6g6AgQ';

const Index: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [timetableData, setTimetableData] = useState<any>({});
  const [regions, setRegions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoadingStops, setIsLoadingStops] = useState<boolean>(false); // New loading state for stops display

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  // Fetch regions on initial load
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(`https://bus-app-api-kl95.onrender.com/region_data_app`);
        const data = await response.json();
        setRegions(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching regions:', error);
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);

  // Initialize mapbox map
  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [172.6362, -41.5000],
        zoom: 5,
      });

      map.on('load', () => {
        setMapLoaded(true);
        mapInstance.current = map;
      });

      return () => map.remove();
    }
  }, []);

  // Fetch timetable data for the selected region
  const fetchTimetableData = async (region: string) => {
    try {
      const response = await fetch(`https://bus-app-api-kl95.onrender.com/timetable_data_app/${region}`);
      const data = await response.json();
      setTimetableData({ [region]: data.routes });
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  // Handle region selection
  const handleAreaSelect = (area: string) => {
    console.log("Selected area:", area);
    setSelectedArea(area);
    setSelectedRoute(null);
    setSelectedService(null);
    setCurrentPage(2);
    fetchTimetableData(area);

    // Fly to region on map
    const selectedRegion = regions.find((r) => r.id === area);
    if (mapInstance.current && selectedRegion) {
      const { long: lng, lat } = selectedRegion;
      mapInstance.current.flyTo({
        center: [lng || 170.5046, lat || -45.8788],
        zoom: 12,
        essential: true,
      });
    }
  };

  // Handle route selection
  const handleRouteSelect = async (route: any) => {
    setSelectedRoute(route);
    setCurrentPage(3);
  };

  // Handle service selection
  const handleServiceSelect = async (service: any) => {
    setIsLoadingStops(true); // Start loading animation
    // Simulate a loading delay (e.g., fetching data)
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    setSelectedService(service);
    setCurrentPage(4);
    setIsLoadingStops(false); // End loading animation
  };

  // Handle going back through pages
  const goBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get trips for the current day
  const getCurrentDayTrips = (service: any) => {
    const today = new Date().toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    return service.trips.filter((trip: any) =>
      trip.days.some((day: any) => day.day === today)
    );
  };

  // Get stops for the current service version
  const getStopsForCurrentServiceVersion = (service: any, serviceVersion: number) => {
    const versionData = service.service_versions.find((version: any) => version.version === serviceVersion);
    return versionData ? versionData.stops : [];
  };

  // Calculate stop times
  const calculateStopTime = (startTime: string, increment: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const tripStartTime = new Date();
    tripStartTime.setHours(hours);
    tripStartTime.setMinutes(minutes);

    const stopTime = new Date(tripStartTime.getTime() + increment * 60000);
    return stopTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Map background */}
      <div
        ref={mapContainer}
        className={`absolute top-0 left-0 w-full h-full ${mapLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
      />
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <Image
          src={logo} // Project Logo
          alt="Logo"
          width={350}
          height={350}
          className="absolute top-4 left-1/2 transform -translate-x-1/2"
          priority
        />

        {/* Show welcome screen for page 0 */}
        {currentPage === 0 ? (
          <div className="bg-white bg-opacity-90 p-12 rounded-lg shadow-lg max-w-2xl w-full text-center border border-black mx-4">
            <h1 className="text-4xl font-bold text-black mb-6">Welcome to the Otago Regional Bus App</h1>
            <p className="text-xl text-gray-700 mb-6">
              Plan your bus trips with ease. Select a region to get started.
            </p>
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            {/* Only hide the white container and header when on StopsDisplay (currentPage === 4), but keep the map visible */}
            {currentPage !== 4 && (
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full border border-black relative">
                <h1 className="text-4xl font-bold text-black text-center mb-6">Bus Timetable</h1> {/* Centered title */}
                <button
                  onClick={goBack}
                  className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Back
                </button>

                {loading ? (
                  <p>Loading regions...</p>
                ) : currentPage === 1 ? (
                  <RegionSelector regions={regions} onAreaSelect={handleAreaSelect} onBack={goBack} />
                ) : null}

                {currentPage === 2 && selectedArea && (
                  <RouteSelector
                    selectedArea={selectedArea}
                    timetableData={timetableData}
                    onRouteSelect={handleRouteSelect}
                    onBack={goBack}
                  />
                )}

                {currentPage === 3 && selectedRoute && (
                  <ServiceSelector
                    selectedRoute={selectedRoute}
                    onServiceSelect={handleServiceSelect}
                    onBack={goBack}
                  />
                )}
              </div>
            )}

            {/* Keep the map visible, but show StopsDisplay when ready */}
            {currentPage === 4 && (
              <StopsDisplay
                selectedService={selectedService}
                getCurrentDayTrips={getCurrentDayTrips}
                getStopsForCurrentServiceVersion={getStopsForCurrentServiceVersion}
                calculateStopTime={calculateStopTime}
                onBack={goBack}
              />
            )}
          </>
        )}

        {/* Show loading animation when loading stops display */}
        {isLoadingStops && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="loader"></div> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
