import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RegionSelector from '../components/RegionSelector';
import RouteSelector from '../components/RouteSelector';
import ServiceSelector from '../components/ServiceSelector';
import StopsDisplay from '../components/StopsDisplay';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiemFjYm1yMjIiLCJhIjoiY2x5ZHRtZDJqMDVsNDJrb3VmZWZoMG9yciJ9.Vid6j50Ey1xMLT6n6g6AgQ';

const CombinedPage: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [timetableData, setTimetableData] = useState<any>({});
  const [regions, setRegions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


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

  const fetchTimetableData = async (region: string) => {
    try {
      const response = await fetch(`https://bus-app-api-kl95.onrender.com/timetable_data_app/${region}`);
      const data = await response.json();
      setTimetableData({ [region]: data.routes });
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    setSelectedRoute(null);
    setSelectedService(null);
    setCurrentPage(2);
    fetchTimetableData(area);

    if (mapInstance.current && regions.find(r => r.id === area)) {
      const regionData = regions.find(r => r.id === area);
      const { lng, lat, zoom } = regionData;
      mapInstance.current.flyTo({
        center: [lng || 170.5046, lat || -45.8788],
        zoom: zoom || 12,
        essential: true,
      });
    }
  };

  const handleRouteSelect = (route: any) => {
    setSelectedRoute(route);
    setCurrentPage(3);
  };

  const goBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCurrentDayTrips = (service: any) => {
    const today = new Date().toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    return service.trips.filter((trip: any) =>
      trip.days.some((day: any) => day.day === today)
    );
  };

  const getStopsForCurrentServiceVersion = (service: any, serviceVersion: number) => {
    const versionData = service.service_versions.find((version: any) => version.version === serviceVersion);
    return versionData ? versionData.stops : [];
  };

  // Fixing the time increment feature
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
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Bus Timetable</h1>

          {loading ? (
            <p>Loading regions...</p>
          ) : currentPage === 1 ? (
            <RegionSelector regions={regions} onAreaSelect={handleAreaSelect} />
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
              onServiceSelect={(service) => {
                setSelectedService(service);
                setCurrentPage(4);
              }}
              onBack={goBack}
            />
          )}

          {currentPage === 4 && selectedService && (
            <StopsDisplay
              selectedService={selectedService}
              getCurrentDayTrips={getCurrentDayTrips}
              getStopsForCurrentServiceVersion={getStopsForCurrentServiceVersion}
              calculateStopTime={calculateStopTime}
              onBack={goBack}
            />
          )}
        </div>
      </div>

      {/* Loading indicator for the map */}
      {!mapLoaded && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-white bg-opacity-80">
          <div className="text-2xl text-gray-700">Loading Map...</div>
        </div>
      )}
    </div>
  );
};

export default CombinedPage;