import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  ServiceData,
  useGetBannerQuery,
  useGetServicesQuery,
} from "../store/apiSlicer";

import Header from "../components/Header";
import AccountSummary from "../components/AccountSummary";
import { setPayment } from "../store/reducers/transactionReducer";

function Main() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.auth.token);

  const { data: servicesResponse } = useGetServicesQuery({
    token: userToken,
  });
  const { data: bannerResponse } = useGetBannerQuery({ token: userToken });
  let servicesList: ServiceData[] = [];
  if (servicesResponse !== undefined && servicesResponse.data !== null)
    servicesList = servicesResponse.data;

  useEffect(() => {
    if (userToken === null) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);
  useEffect(() => {
    if (servicesResponse?.status === 0) {
      dispatch(setPayment(servicesResponse.data));
    }
  }, [servicesResponse, dispatch]);
  return (
    <>
      <Header />
      <main className="text-3xl max-w-[90%] md:max-w-[720px] lg:max-w-[1000px] mx-auto">
        <AccountSummary />
        <div className="mt-5">
          <ul className="grid grid-cols-2 sm:grid-cols-4  md:flex md:space-x-8 overflow-auto minimalist-scrollbar">
            {servicesList.map((service, i) => (
              <li
                key={service.service_name + i}
                className="min-w-[85px] w-[85px] py-2 mx-auto "
                onClick={() => {
                  navigate(`/payment?service_code=${service.service_code}`);
                }}
              >
                <div className="hover:cursor-pointer hover:bg-[#dfdede]  rounded-md h-full">
                  <img className="w-full" src={service.service_icon}></img>
                  <p className="text-sm text-center">{service.service_name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <section className="mt-5">
          <h2 className="text-lg font-medium">Temukan promo menarik</h2>
          <ul className="grid grid-cols-1  md:flex md:space-x-8 overflow-auto minimalist-scrollbar">
            {bannerResponse?.data?.map((banner, i) => (
              <li
                key={banner.banner_name + i}
                className=" sm:min-w-[300px] py-2 mx-auto  "
              >
                <img
                  className="md:w-full w-[500px] "
                  src={banner.banner_image}
                ></img>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
