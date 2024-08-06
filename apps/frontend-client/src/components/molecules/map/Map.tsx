import React from "react";
import { string } from "zod";
// import { RealEstateItem } from "@/libs/types/api-properties/property-response";

interface prop {
  property: string
}
const Map = ({ property }: prop) => {
  return (
    <div className="max-w-[1300px] h-[400px] mx-auto mt-[50px] px-[10px]">
      <div className="w-full h-full">
        <iframe
          // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.312641463294!2d104.92257917580335!3d11.601045188602363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951f3148296db%3A0x5b289f3f5cef444!2sSabaiCode!5e0!3m2!1skm!2skh!4v1722867946658!5m2!1skm!2skh"
         src={property}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
