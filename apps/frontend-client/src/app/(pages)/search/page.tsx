
"use client";
import React, { useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import banner from "@/images/banner.png";
import Image from "next/image";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import Search from "@/components/molecules/Search/Search";
import NotFound from "@/components/molecules/notFound/NotFound";
import axiosInstance from "@/libs/axios";

async function fetchProperties(searchParams: { [key: string]: string | string[] | undefined }): Promise<{
  properties: RealEstateItem[];
  pagination: { totalPages: number; currentPage: number };
}> {
  const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
  const res = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}?${queryString}`);
  
  if (res.status !== 200) {
    throw new Error("Failed to fetch properties");
  }

  const data = await res.data;

  if (data && data.properties && Array.isArray(data.properties)) {
    return {
      properties: data.properties,
      pagination: data.pagination || { totalPages: 1, currentPage: 1 },
    };
  }

  console.error("Invalid response data", data);
  return { properties: [], pagination: { totalPages: 1, currentPage: 1 } };
}

function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const [datas, setDatas] = useState<RealEstateItem[]>([]);
  const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchProperties({ ...searchParams, page: String(page) });
      setDatas(result.properties);
      setPagination(result.pagination);
    } catch (err: any) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on mount
  React.useEffect(() => {
    fetchData(1);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    if (page !== pagination.currentPage) {
      fetchData(page);
    }
  };



  if(loading){
    return <div><img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="" className="w-[200px] m-auto "/></div>;
  }else if(datas.length === 0 ){
    return <p>property not found!</p>
  }else{
     <div>{error}</div>
  }

  return (
    <main>
      {/* Banner */}
      <header className="relative w-full h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75 left-0"
        />
        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
        <div className="absolute left-[10%] bottom-[150px] font-helvetica text-helvetica-h2 font-bold text-white">
          <h1>Find Your Perfect Property</h1>
        </div>
        <div className="absolute left-0 bottom-[130px] w-[120px] h-px bg-white"></div>
        <div className="absolute w-full bottom-[-60px] px-2">
          <div className="z-10 m-auto lg:w-fit bg-white rounded-[18px] p-5">
            <Search />
          </div>
        </div>
      </header>

      {/* Properties */}
      <div className="w-[1300px] m-auto grid grid-cols-4 gap-5 mt-[100px] z-0">
        {datas.map((item) => (
          <ItemCard key={item._id} item={item} flexRow={false} />
        ))}
      </div>

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="pagination flex justify-center m-10 space-x-4">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-full ${
                page === pagination.currentPage ? "bg-olive-drab text-white" : "bg-white text-olive-drab"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

export default Page;
