import React from "react";
import Image from "next/image";
interface Item {
  id: string;
  name: string;
  thumbnail: string;
  rent: number;
  sell: number;

}

interface ItemCardProps {
  item: Item;
}
function ItemCardPopularLocation({item}: ItemCardProps) {
  return (
    <div className="w-full h-[250px] bg-blue-300 overflow-hidden rounded-lg relative animate-fadeUp">
      <Image
        src={item.thumbnail}
        alt=""
        width={"500"}
        height={"500"}
        className="w-full h-full"
        priority
      />
      <div className=" absolute flex justify-center items-center top-0 left-0 bg-[#0000002c] w-full h-full">
        <p className="text-white font-[700] text-[30px]">{item.name}</p>
      </div>
      <div className="bg-[#ffffffc6] absolute flex  flex-row gap-20 justify-center items-center bottom-0 left-0  w-full h-[60px]">
        <div className="flex flex-col gap-2px items-center justify-center">
          <span className="font-[500] "> Rent </span>
          <span className="text-[18px] "> {item.rent}</span>
        </div>
        <div className="border-black border-[0.5px] border-solid h-[60%]"></div>
        <div className="flex flex-col items-center justify-center gap-2px ">
          <span className="font-[500] "> Sell </span>
          <span className="text-[18px] "> {item.sell} </span>
        </div>
      </div>
    </div>
  );
}

export default ItemCardPopularLocation;
