import { HiXMark } from "react-icons/hi2";
import { Button } from "../Button";
import Link from "next/link";
import { useDarkMode } from "@/context/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

type MobileNavProps = {
  isOpen: boolean;
  toggleMenu: () => void;
  menu: [] | any;
};

export function MobileNav({ isOpen, toggleMenu, menu }: MobileNavProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`${isOpen ? "block" : "hidden"} relative`}>
      <div className="flex items-center justify-center">
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md">
          <Button className="absolute text-white right-0 z-50 p-5 " onClick={toggleMenu}>
            <HiXMark size={32} />
          </Button>

          <div className="fixed inset-0 flex items-center justify-center p-5">
            <div className="bg-white dark:bg-gray-800 border border-gray-500 rounded-3xl w-[500px] p-5">
              <ul className="flex-row">
                {menu.map((item: any, index: any) => (
                  <li className="p-2 text-2xl font-medium border-b-2 cursor-pointer" key={index}>
                    <Link href={item.to} onClick={toggleMenu}>
                      {item.title}
                    </Link>
                  </li>
                ))}
                <Button className="mt-5" onClick={toggleDarkMode}>
                  {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
                </Button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
