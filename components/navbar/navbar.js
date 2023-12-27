import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const closeMenu = (e) => {
      const target = e.target;
      if (menuOpen && !target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [menuOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed w-screen bg-[#161f29] h-16 px-5 shadow-lg shadow-[#131b24] flex items-center justify-between">
      <div className="h-16 w-28 md:w-40 font-semibold text-lg md:text-2xl text-white flex gap-4 justify-center items-center">
        <img className="w-12" src="./images/logo.png" />
        <div className="flex flex-col items-center">
          <div className="font-bold md:font-extrabold ">Royal</div>
          <div className="font-semibold md:font-bold -mt-[5px]">Gaming</div>
        </div>
      </div>
      <div className="h-16 flex items-center text-white gap-2 md:gap-10">
        <div className="text-[#6ae5a8] flex">
          Next Game:&nbsp;
          <p className={`font-bold ${props.timer <= 5 ? styles.heartbeat : ""}`}>
            {formatTime(props.timer)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="hidden md:flex space-x-10">
            <Link
              href="/about"
              className="text-gray-600 text-lg hover:text-gray-900"
            >
              Profile
            </Link>
            <Link
              href="/product"
              className="text-gray-600 text-lg hover:text-gray-900"
            >
              Game History
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 text-lg hover:text-gray-900"
            >
              Helpline
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black p-2 focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#1a2531] w-full absolute top-16 z-2 left-0 px-4 pt-2">
            <Link
              href="/"
              className="block p-2 text-gray-600 text-lg hover:text-gray-900"
            >
              Profile
            </Link>
            <hr className="bg-gray-600 my-2" />
            <Link
              href="/"
              className="block p-2 text-gray-600 text-lg hover:text-gray-900"
            >
              Game History
            </Link>
            <hr className="bg-black my-2" />
            <Link
              href="/"
              className="block p-2 text-gray-600 text-lg hover:text-gray-900"
            >
              Helpline
            </Link>
            <hr className="bg-black mt-2 -ml-[16px] w-screen" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
