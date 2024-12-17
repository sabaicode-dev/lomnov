
"use client";
import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Property {
  latitude: number;
  longitude: number;
  address: string;
}

interface Props {
  property: Property;
}

const AddressMap = ({ property }: Props) => {
  const { latitude, longitude, address } = property;

  const [addressValue, setAddressValue] = useState(address);
  const mapRef = useRef<L.Map | null>(null);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value);
  };

  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [latitude, longitude],
        zoom: 13,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      L.marker([latitude, longitude], { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup("Property Location")
        .openPopup();
    } else {
      mapRef.current.setView([latitude, longitude], 13);

      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });

      L.marker([latitude, longitude], { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup("Property Location")
        .openPopup();
    }
  }, [latitude, longitude]);

  return (
    <div className="w-[100%] mt-[20px]">
      <div className="w-[100%] mt-[20px] p-[24px] bg-[#F3F4F6] rounded-xls">
        <p className="text-[20px] font-[600]">Address and Map Location</p>
        <form className="w-[100%] mt-[20px] text-[14px]">
          <div className="w-[100%] grid gap-4 grid-cols-1 mt-[20px]">
            <div className="w-[100%] block">
              <label>Address</label>
              <input
                type="text"
                readOnly
                value={addressValue} // Controlled input value
                onChange={handleAddressChange} // Handle input changes
                placeholder="Your Address"
                className="text-Black w-[100%] h-[40px] rounded-xls p-[10px] bg-BgSoftWhite border-[1.5px] border-[#D9D9D9] mt-[4px] focus:outline-none focus:border-Primary/20"
              />
            </div>

            <label>Map Location*</label>
            <div className="w-[100%] mt-[20px]">
              <div className="w-full h-[300px] rounded-xls border" id="map"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressMap;
