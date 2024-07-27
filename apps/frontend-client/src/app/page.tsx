// import ItemCardList from "@/components/molecules/item-card-list/ItemCardList";
import ItemCardPopularLocationList from "@/components/molecules/item-card-popular-location-list/ItemCardPopularLocationList";
// import ServiceCardList from "@/components/molecules/service-card-list/ServiceCardList";
import Footer from "@/components/organisms/footer/Footer";
// import Header from "@/components/organisms/header/Header";
import HeroSection from "@/components/organisms/hero-section/HeroSection";
// import Link from "next/link";
// ======================================
export default function Home() {
  return (
    <main className="w-full">

      <HeroSection />
      <div className="w-full xl:w-[1300px] ">
   
        {/* feed on sell */}
        {/* <div className="flex flex-col gap-5 mb-10">
          <div className="flex flex-row justify-between items-center">
            <h1 className=" text-[18px] lg:text-[26px] font-[600] ">
              Feed on sale
            </h1>
            <Link
              href={"/buy"}
              className="text-blue-500  lg:text-[18px] font-[500]"
            >
              View All
            </Link>
          </div>
          <ItemCardList />
        </div> */}
        {/* Popular location */}
        {/* <ItemCardPopularLocationList /> */}
        {/* feed on rent */}
        {/* <div className="flex flex-col gap-5 mb-10">
          <div className="flex flex-row justify-between items-center">
            <h1 className=" text-[18px] lg:text-[26px] font-[600] ">
              Feed on Rent
            </h1>
            <Link
              href={"/buy"}
              className="text-blue-500  lg:text-[18px] font-[500]"
            >
              View All
            </Link>
          </div>
          <ItemCardList />
        </div> */}
        {/* our service */}
        {/* <ServiceCardList /> */}
      </div>
    </main>
  );
}
