import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import useMediaQuery from "../hooks/useMediaQuery";
import { Menu } from "react-feather";
import { useState } from "react";
function Header() {
  const pathname = window.location.pathname;
  const [activeNav, setActiveNav] = useState(pathname);

  const [isMenuActive, setIsMenuActive] = useState(false);
  const isSmallMobile = useMediaQuery("(max-width: 640px");
  return (
    <>
      <header className="py-4 shadow-[0_0_2px_0_rgba(0,0,0,0.5)]">
        <div className="mx-auto flex max-w-[90%] items-center justify-between md:max-w-[720px] lg:max-w-[1000px]">
          <Link to={"/"} onClick={() => setActiveNav("/")}>
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
              <nav className="flex items-center space-x-4">
                <div
                  className={`${activeNav === "/topup" ? "text-[#f13b2f]" : ""}`}
                >
                  <Link to="/topup" onClick={() => setActiveNav("/topup")}>
                    TopUp
                  </Link>
                </div>
                <div
                  className={`${
                    activeNav === "/history" ? "text-[#f13b2f]" : ""
                  }`}
                  onClick={() => setActiveNav("/history")}
                >
                  <Link to={"/history"}>Transaction</Link>
                </div>
                <div
                  className={`${
                    activeNav === "/profile" ? "text-[#f13b2f]" : ""
                  }`}
                  onClick={() => setActiveNav("/profile")}
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
            ` fixed left-0 top-[64px] z-50 w-full animate-[dropToBottom_0.2s_linear] flex-col bg-[#363535] bg-opacity-90 text-center text-gray-500`
          }
        >
          <Link to="/topup">
            <div className="border-b-[6px] border-transparent bg-[#ffffff81] bg-opacity-50 px-6 py-4 text-white transition-all duration-100 hover:cursor-pointer hover:border-gray-400 hover:bg-[#d6d6d6d9] hover:text-white">
              Top Up
            </div>
          </Link>
          <Link to="/history">
            <div className="border-b-[6px] border-transparent bg-[#ffffff81] bg-opacity-50 px-6 py-4 text-white transition-all duration-100 hover:cursor-pointer hover:border-gray-400 hover:bg-[#d6d6d6d9] hover:text-white">
              Transaction
            </div>
          </Link>
          <Link to="/profile">
            <div className="border-b-[6px] border-transparent bg-[#ffffff81] bg-opacity-50 px-6 py-4 text-white transition-all duration-100 hover:cursor-pointer hover:border-gray-400 hover:bg-[#d6d6d6d9] hover:text-white">
              Profile
            </div>
          </Link>
        </ul>
      )}
    </>
  );
}

export default Header;
