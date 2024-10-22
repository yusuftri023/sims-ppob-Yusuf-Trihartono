import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ErrorPopUp from "../components/ErrorPopUp";

function SecondaryLayout() {
  return (
    <>
      <ErrorPopUp />
      <Header />
      <main className="mx-auto max-w-[90%] text-3xl md:max-w-[720px] lg:max-w-[1000px]">
        <Outlet />
      </main>
    </>
  );
}

export default SecondaryLayout;
