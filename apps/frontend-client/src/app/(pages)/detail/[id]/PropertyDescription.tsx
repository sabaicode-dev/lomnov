"use client";

import React, { useState } from "react";
import Image from "next/image";
import { animated, useSpring } from "react-spring";
import Modal from "react-modal";
import Location from "@/icons/Location";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

const PropertyDescription = ({ property }: { property: RealEstateItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const animationProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  });

  return (
    <div className="max-w-[1300px] mx-auto py-[10px] px-[10px]">
      <div className="w-full">
        <div className="py-[5px] text-grayish-white max-w-[340px] rounded-8xs bg-neutral flex items-center">
          <Location props="text-olive-green w-[20px] h-[20px]" />
          <p className="pl-[5px] font-helvetica text-helvetica-paragraph">
            {property.address}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Property Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="font-coolvetica text-coolvetica-h2 text-olive-drab mb-4">
            {property.name} Warehouse
          </h1>
          <p className="font-helvertica text-helvetica-paragraph text-charcoal">
            {property.description}
          </p>
        </div>

        {/* Property Images */}
        <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 items-center lg:grid-cols-4 gap-[10px]">
          {property.images.map((image, index) => (
            <Image
              key={index}
              className="w-full h-[150px] md:h-[150px] object-cover rounded-xl cursor-pointer"
              alt={`property-image-${index}`}
              src={image}
              width={150}
              height={150}
              onClick={() => openModal(image)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="absolute inset-0" onClick={closeModal} />
        <animated.div style={animationProps} className="max-w-full max-h-full">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected Property"
              width={800}
              height={800}
              className="object-cover"
            />
          )}
        </animated.div>
      </Modal>
    </div>
  );
};

export default PropertyDescription;
