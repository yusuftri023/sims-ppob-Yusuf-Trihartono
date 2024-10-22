import { Outlet } from "react-router-dom";
import AccountSummary from "../components/AccountSummary";
import Header from "../components/Header";
import ErrorPopUp from "../components/ErrorPopUp";

function MainLayout() {
  return (
    <>
      <ErrorPopUp />
      <Header />
      <main className="mx-auto max-w-[90%] text-3xl md:max-w-[720px] lg:max-w-[1000px]">
        <AccountSummary />
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
