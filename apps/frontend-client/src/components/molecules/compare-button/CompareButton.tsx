import Link from "next/link";

interface CompareButtonProps {
  selectedItems: any[];
}

const CompareButton = ({ selectedItems }: CompareButtonProps) => {
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-olive-green text-white px-5 py-3 rounded-full shadow-lg flex justify-between items-center w-[300px]">
      <span className="mr-4">Select 2 items to compare</span>
      <Link
        href={{
          pathname: "/compare",
          query: { items: selectedItems.map((item) => item.id) },
        }}
      >
        <button className="bg-white text-olive-green px-4 py-2 rounded-full font-bold">
          Compare
        </button>
      </Link>
    </div>
  );
};

export default CompareButton;
