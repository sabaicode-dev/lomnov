import ItemCardPopularLocationList from "@/components/molecules/item-card-popular-location-list/ItemCardPopularLocationList";
import bannerNearlyLocation from "@/images/banner-nearly-location.jpeg"
import HeroSection from "@/components/organisms/hero-section/HeroSection";
import Image from "next/image";
import logSkyBar from "@/images/banner-sky-bar.jpg";
import Slider from "@/components/molecules/slider/Slider";
import Link from "next/link";
import ItemCardNearlyLocationList from "@/components/molecules/item-card-nearly-location-list/ItemCardNearlyLocationList";
import Translates from "@/components/atoms/translate-texts/Translates";


export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <section className="w-full xl:w-[1300px] m-auto py-10 px-2 xl:px-0 flex flex-col justify-center items-center">
        <ItemCardPopularLocationList />
      </section>
      <section className="w-full  bg-gray-500 h-[1200px] lg:h-[720px] relative ">
        <Image
          src={bannerNearlyLocation}
          alt="nearly-location images"
          height={"400"}
          className=" absolute left-0 top-0 w-full h-full object-cover"
        />
        <div className="bg-[#0000002e] absolute left-0 top-0 w-full h-full ">
          <div className="w-full h-full xl:w-[1300px] px-2 xl:px-0 flex flex-col justify-evenly items-center lg:flex-row gap-10 ">
            <div className="w-full lg:w-[30%] h-full py-32 ">
              <ItemCardNearlyLocationList />
            </div>
            <div className=" lg:w-[30%] h-full  py-10 flex flex-col items-center ">
              <div className=" flex flex-col items-center justify-center mb-40">
                <Translates className="text-white font-[600]  text-[30px]" translateKey="nearly locations" />
                <Translates className="text-white" translateKey="discover" />
              </div>
              <Link
                href={"/nearly-location"}
                className="px-10 py-2 rounded-md border-[1px] border-white text-white text-[26px] font-[500]
                  transition-all duration-150 ease-in-out
                  bg-transparent  hover:text-white hover:border-white hover:scale-105
                  active:scale-95  active:text-white"
              >
                <Translates translateKey="view-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <ExclusiveHomesSlider /> */}
      <section className=" xl:w-[1300px] m-auto h-[500px] b px-2 xl:px-0">
        <Slider />
      </section>
      <div className=" flex flex-col lg:flex-row justify-between gap-20 xl:w-[1300px] m-auto py-20 lg:py-40 px-2 lg:px-20">
        <div>
          <Translates className=" text-[28px] font-[600] text-olive-drab" translateKey="Unleash Your Creativity at Home" /><br/>
          <Translates className="text-olive-drab" translateKey="exclusive-description" />
        </div>
        <div className=" flex justify-end">
          <div className="w-[300px] h-[200px] rounded-2xl overflow-hidden">
            <Image src={logSkyBar} alt="" />
          </div>
        </div>
      </div>
      <section></section>
    </main>
  );
}
