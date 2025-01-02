import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import camboFlag from "@/images/combo.jpg";
import englishFlage from "@/images/english.jpg";

interface Option {
  imgSrc: string | any;
  locale: string;
}

const options: Option[] = [
  { imgSrc: englishFlage, locale: "en" },
  { imgSrc: camboFlag, locale: "kh" },
];

const SelectLang: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  // Update selected option based on the URL
  useEffect(() => {
    const localeFromPath = pathname.split("/")[1];
    const currentOption = options.find((option) => option.locale === localeFromPath) || options[0];
    setSelectedOption(currentOption);
  }, [pathname]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Update the URL while preserving the current path
    const pathSegments = pathname.split("/").slice(2); // Remove the locale segment
    const newUrl = `/${option.locale}/${pathSegments.join("/")}`;
    router.push(newUrl);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-slate-50  "
        onClick={toggleDropdown}
      >
        {selectedOption && (
          <Image
            src={selectedOption.imgSrc}
            alt={selectedOption.locale}
            className="w-7 h-5 object-cover"
          />
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 rounded-md overflow-hidden shadow-lg p-2 bg-[#E0E0DC] w-full">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center justify-center  cursor-pointer rounded-md"
              onClick={() => handleOptionClick(option)}
            >
              <Image
                src={option.imgSrc}
                alt={option.locale}
                className="w-7 h-5 object-cover mt-[8px]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectLang;
