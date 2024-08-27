"use client";

import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "../item-card/ItemCard";
import { ArrowDown, ArrowUp } from "@/icons";

// Optimized function to fetch filtered properties directly from the API
async function fetchRelatedProperties(
  category: string,
  address: string,
): Promise<RealEstateItem[]> {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/properties?category=${category}&address=${address}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch related properties");
  }
  return res.json();
}

const RecommendedProperties = ({
  category,
  address,
}: {
  category: string;
  address: string;
}) => {
  const [relatedProperties, setRelatedProperties] = useState<RealEstateItem[]>(
    [],
  );
  const [visibleItems, setVisibleItems] = useState(4); // Initial items to show
  const [showLess, setShowLess] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const properties = await fetchRelatedProperties(category, address);
        setRelatedProperties(properties);
      } catch (error) {
        console.error(error);
      }
    };

    loadProperties();
  }, [category, address]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const transitions = useTransition(relatedProperties.slice(0, visibleItems), {
    keys: (item) => item.id,
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 300, friction: 30 },
  });

  const containerSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.3s, transform 0.3s",
  });

  const handleLoadMore = () => {
    setVisibleItems((prevCount) => prevCount + 4);
    setShowLess(true);
  };

  const handleShowLess = () => {
    setVisibleItems(4);
    setShowLess(false);
  };

  return (
    <animated.div
      ref={ref}
      className="mt-10 max-w-[1300px] mx-auto"
      style={containerSpring}
    >
      <h2 className="text-2xl mb-4 font-helvetica font-bold text-charcoal">
        Recommended Properties
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {transitions((style, item) => (
          <animated.div key={item.id} style={style}>
            <ItemCard item={item} />
          </animated.div>
        ))}
      </div>
      <div className="flex items-center justify-center font-helvetica text-helvetica-paragraph text-charcoal mt-5">
        {visibleItems < relatedProperties.length && (
          <button
            onClick={handleLoadMore}
            className="flex flex-col items-center text-center  justify-center rounded-md"
          >
            <span>Load More</span>
            <ArrowDown props="w-[20px]" />
          </button>
        )}
        {visibleItems > 4 && (
          <button
            onClick={handleShowLess}
            className="flex flex-col items-center text-center justify-center rounded-md"
          >
            <ArrowUp props="w-[20px]" />
            <span>Show Less</span>
          </button>
        )}
      </div>
    </animated.div>
  );
};

export default RecommendedProperties;
