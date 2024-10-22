import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
function NotFound404() {
  return (
    <>
      <header className="py-4 shadow-[0_0_2px_0_rgba(0,0,0,0.5)]">
        <div className="mx-auto flex max-w-[90%] items-center justify-between md:max-w-[720px] lg:max-w-[1000px]">
          <Link to={"/"}>
            <div className="flex items-center space-x-2 font-medium">
              <img src={logo}></img> <span>SIMS PPOB</span>
            </div>
          </Link>
        </div>
      </header>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm font-medium min-[480px]:text-lg md:text-2xl">
        <p>Page Not Found</p>
        <Link to={"/"} className="text-blue-500 underline">
          Click here to go back to index page
        </Link>
      </div>
    </>
  );
}

export default NotFound404;
