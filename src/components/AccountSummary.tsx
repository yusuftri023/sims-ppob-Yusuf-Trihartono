import { useEffect, useState } from "react";

import Profile_Photo from "../assets/Profile-Photo.png";
import Background_Saldo from "../assets/Background-Saldo.png";
import { Eye, EyeOff } from "react-feather";
import { useGetBalanceQuery, useGetProfileQuery } from "../store/apiSlicer";
import { useAppDispatch, useAppSelector } from "../store/store";
import useMediaQuery from "../hooks/useMediaQuery";
import { setBalance } from "../store/reducers/transactionReducer";
import { useNavigate } from "react-router-dom";
import { popUpToggle, setError } from "../store/reducers/webContentReducer";
function AccountSummary() {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const { data: balance } = useGetBalanceQuery(
    { token },
    { refetchOnMountOrArgChange: true },
  );
  const navigate = useNavigate();
  const { data: profile, isError: isErrorProfile } = useGetProfileQuery({
    token,
  });
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    if (balance?.status === 0) {
      dispatch(setBalance(balance.data?.balance));
    }
  }, [balance]);
  useEffect(() => {
    if (isErrorProfile) {
      dispatch(
        setError("Token kadaluarsa atau tidak valid, silahkan login kembali"),
      );
      dispatch(popUpToggle(true));
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  }, [isErrorProfile, navigate]);
  return (
    <section className="mt-8 flex flex-col space-x-0 space-y-5 md:flex-row md:space-x-5 md:space-y-0">
      <div className="w-full text-center md:w-[40%]">
        <div className="mx-auto w-fit overflow-hidden rounded-full border-[2px] border-[#e6e4e49c]">
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
      <div className="min-h-[100px] md:w-[60%]">
        <div className="relative flex size-full min-h-[150px] items-end overflow-hidden rounded-xl md:rounded-md">
          <div className="absolute left-5 top-0 flex min-h-full w-[50%] flex-col justify-evenly rounded-md bg-[#f13b2f] py-4 text-[#eee]">
            <p className="text-sm">Saldo Anda</p>
            {showBalance ? (
              <p className="text-sm font-medium md:text-2xl">
                Rp{" "}
                {balance?.status === 0 &&
                  Intl.NumberFormat("id", {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }).format(balance?.data?.balance)}
              </p>
            ) : (
              <p className="text-sm font-medium md:text-2xl">
                Rp &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;
              </p>
            )}
            <div
              className="flex select-none items-center space-x-2 text-sm hover:cursor-pointer"
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
            className="absolute top-0 -z-10 size-full"
            src={Background_Saldo}
          ></img>
        </div>
      </div>
    </section>
  );
}

export default AccountSummary;
