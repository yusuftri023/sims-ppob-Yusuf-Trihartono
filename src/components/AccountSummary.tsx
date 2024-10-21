import { useEffect, useState } from "react";

import Profile_Photo from "../assets/Profile-Photo.png";
import Background_Saldo from "../assets/Background-Saldo.png";
import { Eye, EyeOff } from "react-feather";
import { useGetBalanceQuery, useGetProfileQuery } from "../store/apiSlicer";
import { useAppDispatch, useAppSelector } from "../store/store";
import useMediaQuery from "../hooks/useMediaQuery";
import { setBalance } from "../store/reducers/transactionReducer";
function AccountSummary() {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const { data: balance } = useGetBalanceQuery(
    { token },
    { refetchOnMountOrArgChange: true }
  );
  const { data: profile } = useGetProfileQuery({ token });
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    if (balance?.status === 0) {
      dispatch(setBalance(balance.data?.balance));
    }
  }, [balance]);
  return (
    <section className="flex md:flex-row flex-col md:space-x-5 space-x-0 md:space-y-0 space-y-5 mt-8 ">
      <div className="md:w-[40%] w-full text-center ">
        <div className=" rounded-full overflow-hidden  border-[2px] border-[#e6e4e49c] w-fit mx-auto">
          <img
            className="w-[70px]"
            src={
              profile &&
              profile.status === 0 &&
              profile.data?.profile_image !==
                "https://minio.nutech-integrasi.com/take-home-test/null"
                ? `${profile?.data?.profile_image}`
                : Profile_Photo
            }
          ></img>
        </div>
        <p className="text-lg font-normal">Selamat datang,</p>
        <p className="text-lg font-medium">
          {profile && profile.status === 0
            ? `${profile?.data?.first_name} ${profile?.data?.last_name}`
            : "Guest"}
        </p>
      </div>
      <div className="md:w-[60%] min-h-[100px] ">
        <div className="relative size-full flex items-end md:rounded-md rounded-xl overflow-hidden min-h-[150px]">
          <div className="bg-[#f13b2f] w-[50%] absolute rounded-md top-0 left-5 min-h-full py-4 text-[#eee] flex flex-col justify-evenly ">
            <p className="text-sm ">Saldo Anda</p>
            {showBalance ? (
              <p className="md:text-2xl text-sm  font-medium">
                Rp{" "}
                {balance?.status === 0 &&
                  Intl.NumberFormat("id", {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }).format(balance?.data?.balance)}
              </p>
            ) : (
              <p className="md:text-2xl text-sm font-medium">
                Rp &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;
              </p>
            )}
            <div
              className="flex items-center space-x-2 text-sm hover:cursor-pointer select-none"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? (
                <>
                  {!isMobile ? <p>Sembunyikan saldo</p> : ""}
                  <EyeOff size={14}></EyeOff>
                </>
              ) : (
                <>
                  {!isMobile ? <p>Lihat saldo</p> : ""} <Eye size={14}></Eye>
                </>
              )}
            </div>
          </div>
          <img
            className="absolute top-0 size-full -z-10"
            src={Background_Saldo}
          ></img>
        </div>
      </div>
    </section>
  );
}

export default AccountSummary;
