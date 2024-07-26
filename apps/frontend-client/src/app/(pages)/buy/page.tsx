import ItemCardList from "@/components/molecules/item-card-list/ItemCardList"
import Footer from "@/components/organisms/footer/Footer"
import Header from "@/components/organisms/header/Header"
import { Map } from "@/icons"
import Location from "@/icons/Location"


function page() {
  return (
   <main>
    <Header/>
      <div className=" py-5 px-3 lg:px-0 lg:w-[1300px] m-auto mt-5">
      <div className="flex flex-row gap-5 w-full mb-20">
            <div className="w-[50%]  rounded-md overflow-hidden flex flex-row items-center gap-5 border-[1px] border-black  ">
              <input
                type="text"
                className="h-full outline-none px-5 py-3 w-[90%] bg-transparent"
                placeholder="Enter an address..."
              />
              <div className="border-[0.8px] border-solid  border-black h-[20px] "></div>
              <Location props="text-blue-500 text-[18px]" />
            </div>
            <div className="w-[16.66%]">
              <select
                name=""
                id=""
                className=" border-[1px] border-black rounded-lg w-full px-5 py-3 "
              >
                <option value=""> Price </option>
              </select>
            </div>
            <div className="w-[16.6%]">
              <select
                name=""
                id=""
                className=" border-[1px] border-black rounded-lg  w-full px-5 py-3"
              >
                <option value=""> Property type </option>
              </select>
            </div>
            <div className="w-[16.6%]">
              <select
                name=""
                id=""
                className=" border-[1px] border-black rounded-lg px-5 py-3 w-full "
              >
                <option value=""> Room </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-[26px] font-[500]">Property in buy</h1>
              <button className=" bg-blue-500 text-white rounded-[25px] px-5 py-1.5">
                Reset
              </button>
            </div>
           {/* card list */}
           <ItemCardList/>
          </div>
      </div>
    <Footer/>
   </main>
  )
}

export default page
