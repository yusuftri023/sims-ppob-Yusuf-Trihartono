import { Outlet } from "react-router-dom";
import IlustrasiLogin from "../components/IlustrasiLogin";
import ErrorPopUp from "../components/ErrorPopUp";

function AuthFormLayout() {
  return (
    <>
      <ErrorPopUp />
      <div className="max-w-screen flex h-screen">
        <div className="flex h-full w-full items-center md:w-[50%]">
          <Outlet />
        </div>
        <div className="hidden min-w-[50%] md:block">
          <IlustrasiLogin />
        </div>
      </div>
    </>
  );
}

export default AuthFormLayout;
