import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "@/hook/useTranslation";
import camboFlag from "@/images/combo.jpg";
import englishFlage from "@/images/english.jpg";

interface Option {
  labelKey: string; // Translation key
  imgSrc: string | any;
  locale: string;
}

const options: Option[] = [
  { labelKey: "language.en", imgSrc: englishFlage, locale: "en" },
  { labelKey: "language.kh", imgSrc: camboFlag, locale: "kh" },
];

const SelectLang: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
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
    <div className="relative inline-block w-64">
      <button
        className="flex items-center justify-between w-full px-4 py-2"
        onClick={toggleDropdown}
      >
        {selectedOption && (
          <div className="flex items-center">
            <Image
              src={selectedOption.imgSrc}
              alt={t(selectedOption.labelKey)}
              className="w-6 h-4 mr-2 object-cover"
            />
            <span className="text-white">{t(selectedOption.labelKey)}</span>
          </div>
        )}
        <svg
          className={`w-5 h-5 ml-2 transition-transform transform text-white ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 z-10 mt-2 rounded-md overflow-hidden shadow-lg p-2 bg-[#E0E0DC]">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 cursor-pointer rounded-md hover:bg-olive-green"
              onClick={() => handleOptionClick(option)}
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={option.imgSrc}
                  alt={t(option.labelKey)}
                  className="w-6 h-4 object-cover"
                />
                <span className="text-black hover:text-white">{t(option.labelKey)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectLang;
