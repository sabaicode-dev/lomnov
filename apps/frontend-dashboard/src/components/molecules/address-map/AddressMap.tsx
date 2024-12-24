"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { extractLatLngFromUrl } from "@/libs/functions/extractLatLngFromUrl";
import { resolveShortenedUrl } from "@/libs/functions/resolveShortendURL";

const markerIconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const markerShadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

interface IAddressMap {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMapChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mapLink?: string;
}

const AddressMapGlobe = ({ onChange, onMapChange, mapLink }: IAddressMap) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  const customMarkerIcon = L.icon({
    iconUrl: markerIconUrl,
    shadowUrl: markerShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    async function processUrl() {
      if (mapLink) {
        setError(null); // Clear previous errors
        let urlToProcess = mapLink;

        // Handle shortened URLs
        if (mapLink.includes("goo.gl") || mapLink.includes("maps.app.goo.gl")) {
          const resolvedUrl = await resolveShortenedUrl(mapLink);
          if (!resolvedUrl) {
            setError("Failed to resolve shortened URL. Please provide a valid Google Maps link.");
            return;
          }
          urlToProcess = resolvedUrl;
        }

        // Extract coordinates
        const extractedPosition = extractLatLngFromUrl(urlToProcess);
        if (extractedPosition) {
          setPosition(extractedPosition);
        } else {
          setError("Invalid Google Maps URL. Please provide a URL with coordinates.");
        }
      }
    }
    processUrl();
  }, [mapLink]);

  useEffect(() => {
    if (position) {
      if (!map) {
        // Initialize the map only once
        const initializedMap = L.map("map").setView(position, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(initializedMap);

        L.marker(position, { icon: customMarkerIcon })
          .addTo(initializedMap)
          .bindPopup("Selected Location")
          .openPopup();

        setMap(initializedMap);
      } else {
        // Update map view and marker
        map.setView(position, 13);

        // Remove previous markers
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // Add new marker
        L.marker(position, { icon: customMarkerIcon })
          .addTo(map)
          .bindPopup("Updated Location")
          .openPopup();
      }
    }
  }, [position, map, customMarkerIcon]);

  return (
    <div className="w-full mt-5">
      <div className="w-full p-6 bg-gray-100 rounded-lg">
        <p className="text-lg font-semibold">Address and Map Location</p>
        <div className="mt-5">
          <div className="grid gap-4">
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                onChange={onChange}
                placeholder="Your Address"
                name="address.0.content"
                className="w-full h-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Map Location*</label>
              <input
                type="text"
                name="urlmap"
                placeholder="Enter Google Maps Link"
                value={mapLink}
                onChange={onMapChange}
                className="w-full h-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="w-full mt-4">
              {position ? (
                <div>
                  <p className="text-sm mb-2">
                    Latitude: {position[0]}, Longitude: {position[1]}
                  </p>
                  <div id="map" className="w-full h-80 rounded-lg border"></div>
                </div>
              ) : (
                <p className="text-gray-500">Enter a valid Google Maps link to display the map.</p>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressMapGlobe;
