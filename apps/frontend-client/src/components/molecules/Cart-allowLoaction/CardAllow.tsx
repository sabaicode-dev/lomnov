
// export default CartAllowLocation;
"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define icon URLs from the public directory
const markerIconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const markerIcon2xUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const markerShadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";


// Configure default marker icons using L.icon
const userIcon = new L.Icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point
  popupAnchor: [1, -34], // Position of the popup
  shadowSize: [41, 41], // Size of the shadow
});

// Interface for coordinates
interface Coordinates {
  latitude: number;
  longitude: number;
}

const CartAllowLocation: React.FC = () => {
  const [locationAllowed, setLocationAllowed] = useState<boolean | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(true);

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAllowed(true);
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocationAllowed(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLocationAllowed(false);
    }
    setShowPopup(false);
  };

  const handleDenyLocation = () => {
    setLocationAllowed(false);
    setShowPopup(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 10000); // Auto-hide popup after 10 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Your Location</h1>

      {/* Location Pop-up */}
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md transform transition duration-300 scale-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Allow Location Access?
            </h2>
            <p className="text-gray-600 mb-6">
              To provide a better experience, we need access to your location.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDenyLocation}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Deny
              </button>
              <button
                onClick={handleAllowLocation}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white p-4 rounded shadow-md">
        {locationAllowed === null && (
          <p className="text-gray-600">
            Please allow location access to view your location on the map.
          </p>
        )}
        {locationAllowed === true && coordinates && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Your Location:</h2>
            <p className="text-gray-600">
              Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
            </p>

            {/* Map */}
            <div className="mt-4 h-80 w-full">
              <MapContainer
                center={[coordinates.latitude, coordinates.longitude]}
                zoom={15}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[coordinates.latitude, coordinates.longitude]}
                  icon={userIcon} // Apply the custom icon here
                >
                  <Popup>You are here!</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
        {locationAllowed === false && (
          <p className="text-red-600">
            Location access denied. Map cannot be displayed.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartAllowLocation;
