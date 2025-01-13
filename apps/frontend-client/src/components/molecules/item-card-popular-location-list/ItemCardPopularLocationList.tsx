
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProperties } from "@/context/property";
import { useTranslation } from "@/hook/useTranslation";
type ProvinceTypes = {
  id: string | number;
  name: string;
  img: string;
}
export const poppularLocationList: ProvinceTypes[] = [
  {
    id: 1,
    name: "Phnom Penh",
    img: "https://www.businesstoday.com.my/wp-content/uploads/2021/12/Phnom_Penh_Evening_Aerial_View.png",
  },
  {
    id: 2,
    name: "Siem Reap",
    img: "https://th.bing.com/th/id/OIP.RMAAqAc67bO0QZ7boUAh0QHaE7?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    name: "Preah Sihanouk",
    img: "https://lh3.googleusercontent.com/-BlUpYAYxx6s/TXSOHk1sJAI/AAAAAAAABEQ/TtCAVUhvL9A/w1200-h630-p-k-no-nu/o.jpg",
  },
  {
    id: 4,
    name: "Kep",
    img: "https://www.gocambodia.tours/wp-content/uploads/2019/06/KEP-Beach.jpg",
  },
  {
    id: 5,
    name: "Battambang",
    img: "https://th.bing.com/th/id/R.13433a36f716fe588e6745f32f5d78b0?rik=VGxLQi%2fpmZoNBQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-JO7g0r_Hccw%2fUQ_7eE3cf4I%2fAAAAAAAAAro%2fC330vXF0bXM%2fs1600%2fBattambang-Statue_1032012_84050.jpg&ehk=9zAKBGf6LS6JSwfBs3bxdPuAn7dxU4tJJl3dpuq4YsI%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 6,
    name: "Kampot",
    img: "https://img.freepik.com/premium-photo/seahorse-kampot-cambodia-new-iconic-province-amazing-cambodia_720542-139.jpg",
  },
  {
    id: 7,
    name: "Kracheh",
    img: "https://preview.redd.it/alternatively-spelled-kracheh-or-kraches-is-a-province-of-v0-doo0a95ua2n81.jpg?auto=webp&s=19dfcdb43f16a247a4fd903685b0afb9a926405a",
  },
  {
    id: 8,
    name: "Ratanakiri",
    img: "https://th.bing.com/th/id/OIP.QdfO3EHW8jUx86kj_g1cLgHaFX?rs=1&pid=ImgDetMain",
  },
  {
    id: 9,
    name: "Mondulkiri",
    img: "https://i.pinimg.com/originals/bf/04/5d/bf045dbd9f06ac060943f8c54da8efab.jpg",
  },
  {
    id: 10,
    name: "Takeo",
    img: "https://tourismcambodia.org/storage/uploads/contents/entryform/ministry-of-tourism-cambodia-2020-05-17-04-47-35am1589690857-3922.jpg",
  },
  {
    id: 11,
    name: "Kampong Cham",
    img: "https://th.bing.com/th/id/OIP.XdnimBSxbrsLh22J0lE8yQHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 12,
    name: "Koh Kong",
    img: "https://th.bing.com/th/id/OIP.pkMsgbk8ClIkB3pnlB_pZgHaFj?rs=1&pid=ImgDetMain",
  },
  {
    id: 13,
    name: "Pailin",
    img: "https://th.bing.com/th/id/OIP.zTGREmwOuDUHrG30Pkz5AgHaHa?rs=1&pid=ImgDetMain",
  },
  {
    id: 14,
    name: "Preah Vihear",
    img: "https://th.bing.com/th/id/R.2ee621a782c7e2d14441420cb9960b5f?rik=ELlv3BU42mGi1w&pid=ImgRaw&r=0",
  },
  {
    id: 15,
    name: "Stung Treng",
    img: "https://th.bing.com/th/id/OIP.95tkr_B6RFRLlCFN_beAEQHaEo?rs=1&pid=ImgDetMain",
  },
  {
    id: 16,
    name: "Kampong Thom",
    img: "https://th.bing.com/th/id/OIP.kgeyaSv8RXARAoKdULM-6AHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 17,
    name: "Banteay Meanchey",
    img: "https://www.passionindochinatravel.com/uploads/attraction-What%20to%20See%20In%20Banteay%20Meanchey%20Serei%20Saophoan.jpg",
  },
  {
    id: 18,
    name: "Kampong Speu",
    img: "https://dnf06fpg9xipc.cloudfront.net/geocambodia/province-landmark/05.jpg",
  },
  {
    id: 19,
    name: "Kandal",
    img: "https://th.bing.com/th/id/OIP.UL4FAQzVvaQDAYoVhG8DFAHaDt?rs=1&pid=ImgDetMain",
  },
  {
    id: 20,
    name: "Oddar Meanchey",
    img: "https://www.worldtravelphotos.net/cambodia/oddar-meanchey/images/oddar-meanchey-temple.jpg",
  },
  {
    id: 21,
    name: "Tbong Khmum",
    img: "https://asset.cambodia.gov.kh/provincial/sites/15/2019/08/Kizuna-Copy.jpg",
  },
  {
    id: 22,
    name: "Pursat",
    img: "https://th.bing.com/th/id/OIP.3u8jjYHTSup6sbHBq7QUzgHaEK?rs=1&pid=ImgDetMain",
  },
  {
    id: 23,
    name: "Svay Rieng",
    img: "https://www.aboutcambodiatravel.com/uploads/images/content_image/Svay%20Rieng/Svay%20Rieng-ACT%20Cambodia%20Tours.jpg",
  },
  {
    id: 24,
    name: "Prey Veng",
    img: "https://www.khmerplaces.com/storage/provinces/September2020/lmzE2dxJ1I7ORLaA0AWM.jpg",
  },
  {
    id: 25,
    name: "Kampong Chhnang",
    img: "https://th.bing.com/th/id/R.3035f8c048ca1e607ee311970657e881?rik=gLdbRvR9Q9D9hw&pid=ImgRaw&r=0",
  },
];


const ItemCardPopularLocationList = () => {
  const {t} = useTranslation();
  const { properties, loading, fetchProperties } = useProperties();
  const [currentPage, _setCurrentPage] = useState(1);
  const [groupedData, setGroupedData] = useState<{
    address: string;
    forSale: number;
    forRent: number;
    img: string;
  }[]>([]);

  // Fetch properties with debounce to avoid multiple requests
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProperties({ page: currentPage, limit: 24 });
    }, 500);

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [currentPage, fetchProperties]);

  // Group and count properties by address, and match with province images
  useEffect(() => {
    if (!loading && properties) {
      const addressGroups = properties.reduce((acc, property) => {
        const address = property.address.find((a) => a.language === "en")?.content || "Unknown";
        const transitions = property.transition || [];

        if (!acc[address]) {
          acc[address] = { address, forSale: 0, forRent: 0, img: "" };
        }

        transitions.forEach((transition) => {
          if (transition.content === "For Sale") {
            acc[address].forSale += 1;
          } else if (transition.content === "For Rent") {
            acc[address].forRent += 1;
          }
        });

        return acc;
      }, {} as Record<string, { address: string; forSale: number; forRent: number; img: string }>);

      const sortedGroupedData = Object.values(addressGroups)
        .map((group) => {
          const province = poppularLocationList.find((p) => p.name === group.address);
          return {
            ...group,
            img: province ? province.img : "",
          };
        })
        .sort((a, b) => b.forSale + b.forRent - (a.forSale + a.forRent))
        .slice(0, 4);

      setGroupedData(sortedGroupedData);
    }
  }, [properties, loading]);  
  return (
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-[18px] lg:text-[26px] font-[600] text-center text-olive-drab">
          {t("poppular locations")}
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {groupedData.map((group) => (
          <Link
            href={`/popular-location?address=${encodeURIComponent(group.address)}`} // Pass the address as query parameter
            key={group.address}
            className="w-full bg-white border border-neutral p-3 rounded-[15px] flex flex-col gap-3 h-[400px] overflow-hidden animate-fadeUp hover:shadow-lg hover:scale-105 transition duration-300 active:scale-95"
          >
            <div className="w-full h-[80%] rounded-[15px] overflow-hidden">
              <Image
                src={group.img || "https://via.placeholder.com/500"}
                alt={group.address}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="h-[20%] flex flex-col justify-center items-center">
              <p className="font-[700] text-[18px] underline text-olive-drab">{t(`poppular-provinces.${group.address}`)}</p>
              <section className="flex flex-row gap-5 justify-center items-center w-full h-[60px]">
                <div className="font-[600]">
                  <span className="text-[14px]">{group.forRent}</span>
                  <span className="text-[14px]"> {t("rent")}</span>
                </div>
                <div className="font-[600]">
                  <span className="text-[14px]">{group.forSale}</span>
                  <span className="text-[14px]"> {t("buy")}</span>
                </div>
              </section>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemCardPopularLocationList;
