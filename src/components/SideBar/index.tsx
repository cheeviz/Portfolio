"use client";
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className={`${open ? "w-72" : "w-20"} h-screen bg-[#1b1b1b] relative duration-500 transition-all`}>
      <button
        className={`absolute rounded-full -right-3 top-9 w-7 border-2 border-white bg-blue text-white  ${
          open ? "rotate-180 duration-500" : "duration-500"
        }  transition-all`}
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div className="flex flex-col items-center justify-center py-5">
        <h1
          className={`${
            open ? "translate-x-0 duration-500" : "-translate-x-96 duration-500"
          } text-2xl font-bold uppercase text-white`}
        >
          ADM ONLINE
        </h1>

        <div className="flex items-center justify-center py-[120px]">
          <ul className="flex flex-col gap-5">
            <Link
              href={"/admin"}
              className={`${
                pathname === "/admin" ? "bg-white text-black" : "text-white"
              } flex items-center gap-2 p-2 transition-colors  hover:bg-white hover:text-black rounded-2xl cursor-pointer`}
            >
              <div className="bg-white p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <li className={`${open ? "" : "hidden"} text-2xl font-medium`}>Dashboard</li>
            </Link>

            <Link
              href={"/admin/projects"}
              className={`${
                pathname === "/admin/projects" ? "bg-white text-black" : "text-white"
              } flex items-center gap-2 p-2 transition-colors  hover:bg-white hover:text-black rounded-2xl cursor-pointer`}
            >
              <div className="bg-white p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
              <li className={`${open ? "" : "hidden"} text-2xl font-medium`}>Projects</li>
            </Link>

            <div className="flex items-center gap-2 p-2 transition-colors text-white hover:bg-white hover:text-black rounded-2xl cursor-pointer">
              <div className="bg-white p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <li className={`${open ? "" : "hidden"} text-2xl font-medium `}>Settings</li>
            </div>
          </ul>

          <a
            className="absolute flex items-center gap-2 bottom-0 my-2 p-2 transition-colors text-white hover:bg-white hover:text-black rounded-2xl cursor-pointer"
            href="/api/auth/signout"
          >
            <div className="bg-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </div>
            <p className={`${open ? "" : "hidden"} text-2xl font-medium`}>SIGN OUT</p>
          </a>
        </div>
      </div>
    </div>
  );
}
