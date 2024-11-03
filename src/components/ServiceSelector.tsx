import React from 'react';

interface ServiceSelectorProps {
  selectedRoute: any;
  onServiceSelect: (service: any) => void;
  onBack: () => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ selectedRoute, onServiceSelect, onBack }) => {
  return (
    <div className="flex flex-col items-center p-8 bg-white bg-opacity-90 rounded-lg w-full max-w-md mx-auto space-y-4">
      <h2 className="text-base font-semibold mb-2 dark:text-white">Services for Route {selectedRoute.title}</h2>
      <p className="text-md text-gray-600 mb-6">Please select a service below:</p>
      
      <div className="grid grid-cols-1 gap-6 w-full">
        {selectedRoute.services && selectedRoute.services.length > 0 ? (
          selectedRoute.services.map((service: any) => (
            <button
              key={service.code}
              className="relative p-4 bg-blue-500 text-white rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 w-full text-left"
              onClick={() => onServiceSelect(service)}
            >
              <h3 className="text-lg font-bold">{`Service ${service.code}`}</h3>
              <p className="text-sm text-gray-300">{service.direction}</p>
            </button>
          ))
        ) : (
          <p className="text-gray-500">No services available for this route.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceSelector;
