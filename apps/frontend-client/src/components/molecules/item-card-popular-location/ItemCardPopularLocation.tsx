import React from "react";
import Image from "next/image";
import Link from "next/link";
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
function ItemCardPopularLocation({ item }: ItemCardProps) {
  return (
    <Link href={`/popularlocation?${item.id}`} className="w-full bg-white border border-neutral p-3 rounded-[15px] flex flex-col gap-3 h-[400px]  overflow-hidden animate-fadeUp hover:shadow-lg">
      <div className=" w-full h-[80%] rounded-[15px] overflow-hidden">
        <Image
          src={item.thumbnail}
          alt=""
          width={"500"}
          height={"500"}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="h-[20%] flex flex-col justify-center items-center">
        <p className=" font-[700] text-[18px]  underline text-olive-drab">
          {item.name}
        </p>

        <section className="  flex  flex-row gap-5 justify-center items-center  w-full h-[60px]">
          <div className="font-[600]">
            <span className="text-[14px] "> {item.rent}</span>
            <span className=" text-[14px] "> Rent </span>
          </div>

          <div className=" font-[600] ">
            <span className="text-[14px] "> {item.sell}</span>
            <span className=" text-[14px] "> Sell </span>
          </div>
        </section>
      </div>
    </Link>
  );
}

export default ItemCardPopularLocation;

// old
// <div className="w-full h-[250px] bg-blue-300 overflow-hidden rounded-lg relative animate-fadeUp">
//       <Image
//         src={item.thumbnail}
//         alt=""
//         width={"500"}
//         height={"500"}
//         className="w-full h-full"
//         priority
//       />
//       <div className=" absolute flex justify-center items-center top-0 left-0 bg-[#0000002c] w-full h-full">
//         <p className="text-white font-[700] text-[30px]">{item.name}</p>
//       </div>
//       <div className="bg-[#ffffffc6] absolute flex  flex-row gap-20 justify-center items-center bottom-0 left-0  w-full h-[60px]">
//         <div className="flex flex-col gap-2px items-center justify-center">
//           <span className="font-[500] "> Rent </span>
//           <span className="text-[18px] "> {item.rent}</span>
//         </div>
//         <div className="border-black border-[0.5px] border-solid h-[60%]"></div>
//         <div className="flex flex-col items-center justify-center gap-2px ">
//           <span className="font-[500] "> Sell </span>
//           <span className="text-[18px] "> {item.sell} </span>
//         </div>
//       </div>
//     </div>
