import { useTranslation } from "@/hook/useTranslation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface IMenus {
  id?: number;
  name?: string;
  slug?: string;
  lang: string;
}

export interface MenuProp {
  menu: IMenus[];
}

function NavigateList({ menu }: MenuProp) {
  const { locale, t } = useTranslation();
  const pathname = usePathname();

  return (
    <ul className="flex md:flex-row flex-col gap-5 md:gap-10 text-[18px] mb-2 md:mb-0 p-5">
      {menu.map((item, index) => {
        const href = `/${locale}${item.slug}`;
        const isActive = pathname === href;

        return (
          <li key={index} className="list-none group relative">
            <Link href={href} legacyBehavior>
              <a
                className={`capitalize text-white hover:font-semibold ${isActive ? "text-white font-semibold" : ""
                  }`}
                aria-current={isActive ? "page" : undefined}
              >
                {t(item.name || "")}
              </a>
            </Link>
            <span
              className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-beige transition-all duration-300 group-hover:w-full"
            ></span>
          </li>
        );
      })}
    </ul>
  );
}

export default NavigateList;
