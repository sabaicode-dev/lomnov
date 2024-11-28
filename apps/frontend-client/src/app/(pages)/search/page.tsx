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
import Loading from "@/components/atoms/loading/Loading";

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
      if (result.properties.length === 0) {
        setDatas([]);  // explicitly set to empty if no properties are found
      } else {
        setDatas(result.properties);
      }
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
        <div className="absolute left-[24%] bottom-[150px] font-helvetica text-helvetica-h2 font-bold text-white">
          <h1>Find Your Perfect Property</h1>
        </div>
        <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[550px] h-px bg-white"></div>
        <div className="absolute left-[13rem] flex items-center justify-center w-full bottom-[-37px] px-2  ">
          <div className="z-10 m-auto lg:w-fit bg-white rounded-[18px] p-5">
            <Search disabled={loading} />
          </div>
        </div>
      </header>

      {/* Properties */}
      <div className="w-[1300px] m-auto grid grid-cols-4 gap-5 mt-[100px] z-0">
        {
          loading ? (
            <div className="w-[1300px] flex items-center justify-center">
              <Loading />
            </div>
          ) : datas.length === 0 && !loading && !error ? (
            // Ensure NotFound is only shown when there's no data and not during loading
            <div className="w-[1300px] flex items-center justify-center -mt-32">
              <NotFound />
            </div>
          ) : (
            datas.map((item) => (
              <ItemCard key={item._id} item={item} flexRow={false} />
            ))
          )
        }
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
              className={`px-3 py-1 border rounded-full ${page === pagination.currentPage ? "bg-olive-drab text-white" : "bg-white text-olive-drab"
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
