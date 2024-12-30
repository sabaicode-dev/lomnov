// "use client";

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import ItemCartNearlyList from "../item-nearly-location/ItemListNearly";

// // Define icon URLs
// const markerIconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
// const markerIcon2xUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
// const markerShadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

// // Configure default marker icons
// const userIcon = new L.Icon({
//   iconUrl: markerIconUrl,
//   iconRetinaUrl: markerIcon2xUrl,
//   shadowUrl: markerShadowUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// // Interface for coordinates
// interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// const CartAllowLocation: React.FC = () => {
//   const [locationAllowed, setLocationAllowed] = useState<boolean | null>(null);
//   const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
//   const [showPopup, setShowPopup] = useState<boolean>(true);

//   const handleAllowLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocationAllowed(true);
//           setCoordinates({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         () => {
//           setLocationAllowed(false);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//       setLocationAllowed(false);
//     }
//     setShowPopup(false);
//   };

//   const handleDenyLocation = () => {
//     setLocationAllowed(false);
//     setShowPopup(false);
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setShowPopup(false);
//     }, 50000); // Auto-hide popup after 50 seconds
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className="p-6 font-sans">
//       {/* Location Pop-up */}
//       {showPopup && (
//         <div
//           className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
//           aria-hidden="true"
//         >
//           <div className="bg-white z-60 w-[90%] max-w-md rounded-lg shadow-xl p-6 transition duration-300 ease-in-out">
//             <h2 className="text-olive-drab font-semibold text-xl mb-4 text-center">
//               Allow Location Access
//             </h2>
//             <p className="text-gray-700 text-center mb-6">
//               To find properties near your location, please allow location access.
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={handleAllowLocation}
//                 className="bg-olive-drab text-white px-6 py-2 rounded-lg shadow-md hover:bg-olive-600 transition duration-200"
//               >
//                 Allow
//               </button>
//               <button
//                 onClick={handleDenyLocation}
//                 className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
//               >
//                 Deny
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Content Based on Location Access */}
//       {/* {locationAllowed === null && (
//         <p className="text-gray-600">
//           Please allow location access to view nearby properties and the map.
//         </p>
//       )} */}

//       {locationAllowed === true && coordinates && (
//         <div className="mt-12">
//           {/* Display Property List */}
//           <div className="w-full lg:w-[1300px] mx-auto px-4 lg:px-0">
//             <ItemCartNearlyList />
//           </div>

//           {/* Display Map */}
   
           
//         </div>
//       )}

//       {locationAllowed === false && (
//         <div className="mt-10 text-red-600 text-center">
//           <p className="text-lg font-medium">Location access denied. Unable to find properties near you!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartAllowLocation;


"use client";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ItemCartNearlyList from "../item-nearly-location/ItemListNearly";

// Define icon URLs
const markerIconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const markerIcon2xUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const markerShadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

// Configure default marker icons
const userIcon = new L.Icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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
          const newCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // Save coordinates to localStorage for future use
          localStorage.setItem("userCoordinates", JSON.stringify(newCoordinates));
          setLocationAllowed(true);
          setCoordinates(newCoordinates);
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
    // Check if location data exists in localStorage
    const savedCoordinates = localStorage.getItem("userCoordinates");
    if (savedCoordinates) {
      setCoordinates(JSON.parse(savedCoordinates));
      setLocationAllowed(true);
      setShowPopup(false); // Don't show popup if location is already remembered
    }
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, 5000); // Auto-hide popup after 5 seconds
      return () => clearTimeout(timeout);
    }
  }, [showPopup]);

  return (
    <div className="p-6 font-sans">
      {/* Location Pop-up */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="bg-white z-60 w-[90%] max-w-md rounded-lg shadow-xl p-6 transition duration-300 ease-in-out">
            <h2 className="text-olive-drab font-semibold text-xl mb-4 text-center">
              Allow Location Access
            </h2>
            <p className="text-gray-700 text-center mb-6">
              To find properties near your location, please allow location access.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleAllowLocation}
                className="bg-olive-drab text-white px-6 py-2 rounded-lg shadow-md hover:bg-olive-600 transition duration-200"
              >
                Allow
              </button>
              <button
                onClick={handleDenyLocation}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Based on Location Access */}
      {locationAllowed === true && coordinates && (
        <div className="mt-12">
          {/* Display Property List */}
          <div className="w-full lg:w-[1300px] mx-auto px-4 lg:px-0">
            <ItemCartNearlyList />
          </div>
        </div>
      )}

      {locationAllowed === false && (
        <div className="mt-10 text-red-600 text-center">
          <p className="text-lg font-medium">Location access denied. Unable to find properties near you!</p>
        </div>
      )}
    </div>
  );
};

export default CartAllowLocation;
