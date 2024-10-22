import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  ServiceData,
  useGetBannerQuery,
  useGetServicesQuery,
} from "../store/apiSlicer";

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
      <div className="mt-5">
        <ul className="minimalist-scrollbar grid grid-cols-2 overflow-auto sm:grid-cols-4 md:flex md:space-x-8">
          {servicesList.map((service, i) => (
            <li
              key={service.service_name + i}
              className="mx-auto w-[85px] min-w-[85px] py-2"
              onClick={() => {
                navigate(`/payment?service_code=${service.service_code}`);
              }}
            >
              <div className="h-full rounded-md hover:cursor-pointer hover:bg-[#dfdede]">
                <img className="w-full" src={service.service_icon}></img>
                <p className="text-center text-sm">{service.service_name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <section className="mt-5">
        <h2 className="text-lg font-medium">Temukan promo menarik</h2>
        <ul className="minimalist-scrollbar grid grid-cols-1 overflow-auto md:flex md:space-x-8">
          {bannerResponse?.data?.map((banner, i) => (
            <li
              key={banner.banner_name + i}
              className="mx-auto py-2 sm:min-w-[300px]"
            >
              <img
                className="w-[500px] md:w-full"
                src={banner.banner_image}
              ></img>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
