import React from 'react';

interface ServiceSelectorProps {
  selectedRoute: any;
  onServiceSelect: (service: any) => void;
  onBack: () => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ selectedRoute, onServiceSelect, onBack }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-6">Services for Route {selectedRoute.title}</h2>
      <div className="grid grid-cols-1 gap-6">
        {selectedRoute.services && selectedRoute.services.length > 0 ? (
          selectedRoute.services.map((service: any) => (
            <div
              key={service.code}
              className="p-4 bg-blue-100 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => onServiceSelect(service)}
            >
              <h3 className="text-lg font-bold text-blue-700 mb-1">Service {service.code}</h3>
              <p className="text-sm text-gray-700">{service.direction}</p>
            </div>
          ))
        ) : (
          <p>No services available for this route.</p>
        )}
      </div>
      <button
        className="mt-6 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transform transition-transform duration-300 hover:scale-105"
        onClick={onBack}
      >
        Back to Routes
      </button>
    </div>
  );
};

export default ServiceSelector;