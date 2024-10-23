import React from 'react';

interface ServiceSelectorProps {
  selectedRoute: any;
  onServiceSelect: (service: any) => void;
  onBack: () => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ selectedRoute, onServiceSelect, onBack }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg w-full max-w-md mx-auto"> {/* Removed shadow-md */}
      <h2 className="text-2xl font-semibold mb-4">Services for Route {selectedRoute.title}</h2>
      <div className="grid grid-cols-1 gap-6 w-full">
        {selectedRoute.services && selectedRoute.services.length > 0 ? (
          selectedRoute.services.map((service: any) => (
            <div
              key={service.code}
              className="p-4 bg-blue-50 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer border border-transparent hover:border-blue-300"
              onClick={() => onServiceSelect(service)}
            >
              <h3 className="text-lg font-bold text-blue-600">{`Service ${service.code}`}</h3>
              <p className="text-sm text-gray-600">{service.direction}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No services available for this route.</p>
        )}
      </div>
      <button
        className="mt-6 px-4 py-2 text-black font-bold rounded-lg transition-transform duration-300 hover:scale-105"
        onClick={onBack}
        style={{ backgroundColor: 'var(--secondary-blue)', color: 'black' }}
      >
        Back to Routes
      </button>
    </div>
  );
};

export default ServiceSelector;