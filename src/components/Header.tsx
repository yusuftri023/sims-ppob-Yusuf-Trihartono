import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import useMediaQuery from "../hooks/useMediaQuery";
import { Menu } from "react-feather";
import { useState } from "react";
function Header() {
  const pathname = window.location.pathname;
  const [isMenuActive, setIsMenuActive] = useState(false);
  const isSmallMobile = useMediaQuery("(max-width: 640px");
  return (
    <>
      <header className="  py-4 shadow-[0_0_2px_0_rgba(0,0,0,0.5)] ">
        <div className="flex justify-between lg:max-w-[1000px] md:max-w-[720px] max-w-[90%] mx-auto items-center ">
          <Link to={"/"}>
            <div className="flex items-center space-x-2 font-medium">
              <img src={logo}></img> <span>SIMS PPOB</span>
            </div>
          </Link>
          {isSmallMobile ? (
            <button
              className="flex items-center space-x-2 font-medium"
              onClick={() => setIsMenuActive(!isMenuActive)}
            >
              <Menu size={30} />
            </button>
          ) : (
            <div>
              <nav className="flex space-x-4 items-center">
                <div
                  className={`${pathname === "/topup" ? "text-[#f13b2f]" : ""}`}
                >
                  <Link to="/topup">TopUp</Link>
                </div>
                <div
                  className={`${
                    pathname === "/history" ? "text-[#f13b2f]" : ""
                  }`}
                >
                  <Link to={"/history"}>Transaction</Link>
                </div>
                <div
                  className={`${
                    pathname === "/profile" ? "text-[#f13b2f]" : ""
                  }`}
                >
                  <Link to={"/profile"}>Akun</Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      {isSmallMobile && isMenuActive && (
        <ul
          className={
            (isMenuActive ? `flex ` : `hidden`) +
            `  flex-col fixed w-full bg-[#363535] bg-opacity-90 text-center animate-[dropToBottom_0.2s_linear] z-50  top-[64px] left-0 text-gray-500`
          }
        >
          <Link to="/topup">
            <div className="hover:cursor-pointer border-b-[6px]  border-transparent hover:text-white hover:border-gray-400 py-4 hover:bg-[#d6d6d6d9] bg-[#ffffff81] bg-opacity-50 px-6 transition-all duration-100 text-white">
              Top Up
            </div>
          </Link>
          <Link to="/history">
            <div className="hover:cursor-pointer border-b-[6px]  border-transparent hover:text-white hover:border-gray-400 py-4 hover:bg-[#d6d6d6d9] bg-[#ffffff81] bg-opacity-50 px-6 transition-all duration-100 text-white">
              Transaction
            </div>
          </Link>
          <Link to="/profile">
            <div className="hover:cursor-pointer border-b-[6px]  border-transparent hover:text-white hover:border-gray-400 py-4 hover:bg-[#d6d6d6d9] bg-[#ffffff81] bg-opacity-50 px-6 transition-all duration-100 text-white">
              Profile
            </div>
          </Link>
        </ul>
      )}
    </>
  );
}

export default Header;
