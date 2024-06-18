import ItemCardList from "@/components/molecules/item-card-list/ItemCardList";
import ItemCardPopularLocationList from "@/components/molecules/item-card-popular-location-list/ItemCardPopularLocationList";
import ServiceCardList from "@/components/molecules/service-card-list/ServiceCardList";
import Footer from "@/components/organisms/footer/Footer";
import Header from "@/components/organisms/header/Header";
import HeroSection from "@/components/organisms/hero-section/HeroSection";
import Link from "next/link";



// ====================
export default function Home() {
  return (
    <main className="">
      <Header />
      <HeroSection />
      <div className="py-5 px-3 lg:px-0 lg:w-[1300px] m-auto mt-5">
        {/* feed on sell */}
        <ItemCardList/>
        {/* Popular location */}
        <ItemCardPopularLocationList/>
         {/* feed on rent */}
         <ItemCardList/>
         {/* our service */}

         <ServiceCardList/>
      </div>
      <Footer />
    </main>
  );
}
