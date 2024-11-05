import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import Modal from "react-modal";
import Link from "next/link";
import Location from "@/icons/Location";
import HeartOutline from "@/icons/HeartOutline";
import HeartInline from "@/icons/HeartInline";
import BathRoom from "@/icons/BathRoom";
import BedRoom from "@/icons/BedRoom";
import Compare from "@/icons/Compare";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

export interface ItemCardProps {
  item: RealEstateItem;
}

const PropertyCardWithModal = ({ property, item }: { property: RealEstateItem; item: RealEstateItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLike, setIsLike] = useState(false);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const toggleIsLike = () => {
    setIsLike((isLike) => !isLike);
  };

  const { ref, entry } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const fadeIn = useSpring({
    opacity: entry?.isIntersecting ? 1 : 0,
    transform: entry?.isIntersecting ? "translateY(0)" : "translateY(50px)",
  });

  const animationProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.8)",
  });

  return (
    <animated.div
      ref={ref}
      style={fadeIn}
      className="flex w-100% justify-between w-full h-auto gap-3 rounded-[20px] overflow-hidden shadow-md bg-[#EFF0EA] p-4 border-[1px] border-[#E0E0E0]"
    >
      <div className="flex justify-between w-[50%] overflow-hidden rounded-[15px]">
        <div onClick={() => openModal(property.thumbnail)} className="cursor-pointer">
          <Image
            src={property.thumbnail}
            alt={property.title}
            width={500}
            height={500}
            className="w-[100%] h-full object-cover rounded-[15px]"
          />
        </div>
        <div className="w-[20%] ml-3 justify-between grid grid-cols-1 gap-2">
          {property.images.slice(0, 4).map((image, index) => (
            <Image
              key={index}
              className="w-[100px] h-[100px] object-cover rounded-[10px] cursor-pointer"
              alt={`property-thumbnail-${index}`}
              src={image}
              width={300}
              height={300}
              onClick={() => openModal(image)}
            />
          ))}
        </div>
      </div>
      <div className="w-[60%] flex flex-col justify-between pl-4">
        <div className="flex justify-between">
          <h1 className="font-coolvetica text-coolvetica-h2 text-[#6A6A31] mb-2">
            {property.name}Phnom Penh
          </h1>
          <p className="font-bold text-[20px] text-[#6A6A31]">${property.price}250,000/m²</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Location className="text-[#6A6A31] w-[20px] h-[20px]" />
          <span className="font-helvetica text-neutral-500">{property.address}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <BedRoom className="text-[#6A6A31] text-[20px]" />
          <span className="font-bold text-[14px]">{property.detail.bed_room} Beds</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <BathRoom className="text-[#6A6A31] text-[20px]" />
          <span className="font-bold text-[14px]">{property.detail.bath_room} Baths</span>
        </div>

        <div className="flex justify-end mt-auto">
  {item?.id ? (
    <Link href={`/detail/${item.id}`}>
      <button className="bg-[#C2C2AA] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#a8a896] transition-all">
        View Detail
      </button>
    </Link>
  ) : (
    <p className="text-gray-500">No details available</p>
  )}
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
        <animated.div
          style={animationProps}
          className="max-w-[95%] max-h-[70%] flex items-center justify-center"
        >
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected Property"
              layout="responsive"
              width={100}
              height={60}
              className="object-contain w-full h-full"
            />
          )}
        </animated.div>
      </Modal>
    </animated.div>
  );
};

export default PropertyCardWithModal;
