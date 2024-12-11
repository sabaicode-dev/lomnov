"use client";

import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Absolute paths to marker images (place the images in the `public` folder)
const markerIconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const markerShadowUrl = "/leaflet/marker-shadow.png";
//iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

const AddressMap = () => {
  const [mapLink, setMapLink] = useState("");
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  // Configure the marker icon
  const customMarkerIcon = L.icon({
    iconUrl: markerIconUrl,
    shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const handleMapLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLink = e.target.value;
    setMapLink(inputLink);

    // Extract latitude and longitude from the Google Maps link
    const regex = /@([-.\d]+),([-.\d]+)/; // Regex to match "@lat,lng" in the link
    const match = inputLink.match(regex);

    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      setLatLng({ lat, lng });
    } else {
      setLatLng(null);
    }
  };

  useEffect(() => {
    if (latLng) {
      // Initialize the map only once when latLng is set
      if (!map) {
        const newMap = L.map("map").setView([latLng.lat, latLng.lng], 13);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(newMap);

        // Add the marker with the custom icon
        L.marker([latLng.lat, latLng.lng], { icon: customMarkerIcon })
          .addTo(newMap)
          .bindPopup("User's Map Location")
          .openPopup();

        setMap(newMap);
      } else {
        // Update map view and marker position if map already exists
        map.setView([latLng.lat, latLng.lng], 13);

        // Remove old marker before adding a new one
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer); // Remove all markers before adding the new one
          }
        });

        // Add the new marker with the custom icon
        L.marker([latLng.lat, latLng.lng], { icon: customMarkerIcon })
          .addTo(map)
          .bindPopup("Updated Location")
          .openPopup();
      }
    }
  }, [latLng, map]);

  return (
    <div className="w-[69%] mt-[20px]">
      <div className="w-[100%] mt-[20px] p-[24px] bg-[#F3F4F6] rounded-xls">
        <p className="text-[20px] font-[600]">Address and Map Location</p>
        <form className="w-[100%] mt-[20px] text-[14px]">
          <div className="w-[100%] grid gap-4 grid-cols-1 mt-[20px]">
            <div className="w-[100%] block">
              <label>Address</label>
              <input
                type="text"
                placeholder="Your Address"
                className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] focus:outline-none focus:border-Primary/20"
              />
            </div>
            <div className="w-[100%] block">
              <label>Map Location*</label>
              <input
                type="text"
                placeholder="Enter Google Maps Link"
                value={mapLink}
                onChange={handleMapLinkChange}
                className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] focus:outline-none focus:border-Primary/20"
              />
            </div>
            <div className="w-[100%] mt-4">
              {latLng ? (
                <div>
                  <p className="text-[14px] mb-2">
                    Latitude: {latLng.lat}, Longitude: {latLng.lng}
                  </p>
                  <div
                    id="map"
                    className="w-full h-[300px] rounded-xls border"
                  ></div>
                </div>
              ) : (
                <p className="text-gray-500">
                  Enter a valid Google Maps link to display the map.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressMap;
