import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Header from "../../components/Header";
import AccountSummary from "../../components/AccountSummary";
import { Check, CreditCard, X } from "react-feather";
import { usePostTransactionMutation } from "../../store/apiSlicer";
import ModalWindow from "../../components/ModalWindow";
import useDebounceCallback from "../../hooks/useDebounceCallback";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentReducer";
import logo from "../../assets/Logo.png";
const isString = (s: unknown) => typeof s === "string";

function Payment() {
  const [searchParams] = useSearchParams();
  const refButton = useRef<HTMLButtonElement>(null);
  const balance = useAppSelector((state) => state.transaction.balance);
  const [error, setError] = useState<string | null>(null);
  const serviceCodeParams = searchParams.get("service_code");
  const serviceCode: string = isString(serviceCodeParams)
    ? serviceCodeParams
    : "";

  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.auth.token);
  const [postTransaction, { data: isSuccess, isError }] =
    usePostTransactionMutation();
  const showModal = useAppSelector((state) => state.webContent.showModal);
  const typeModal = useAppSelector((state) => state.webContent.typeModal);
  const paymentServices = useAppSelector((state) => state.transaction.payment);
  const payment = paymentServices?.find(
    (payment) => payment.service_code === serviceCode
  );
  const dispatch = useAppDispatch();

  const redirectHandle = () => {
    if (serviceCode) {
      return;
    }
    navigate("/");
  };
  const handlePayment = () => {
    dispatch(modalChange({ type: null, content: null }));
    if (
      userToken !== null &&
      payment?.service_tariff &&
      balance >= payment?.service_tariff
    ) {
      postTransaction({
        token: userToken,
        total_amount: payment.service_tariff,
        service_code: serviceCode,
      });
    } else {
      setError("Saldo anda tidak mencukupi");
    }
  };
  useDebounceCallback(
    redirectHandle,
    3000,
    serviceCodeParams,
    isString(serviceCodeParams)
  );
  useEffect(() => {
    if (userToken === null) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);
  useEffect(() => {
    if (isError || isSuccess) {
      dispatch(modalToggle(true));
    }
  }, [isError, isSuccess, dispatch]);
  useEffect(() => {
    if (
      typeof payment?.service_tariff === "number" &&
      balance < payment?.service_tariff &&
      refButton.current
    ) {
      refButton.current.disabled = true;
    }
  }, [balance]);
  return (
    <>
      {showModal && payment?.service_tariff && (
        <ModalWindow>
          <div className="size-[300px] flex flex-col justify-center items-center">
            {typeModal === "paymentConfirmation" ? (
              <>
                <img className="size-[50px]" src={logo}></img>
                <div className="space-y-2 mt-5">
                  <p className="text-center text-sm ">
                    Bayar {payment?.service_name} sebesar
                  </p>
                  <p className="text-center text-xl font-medium">
                    {Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(payment.service_tariff) + " ?"}
                  </p>
                </div>
                <div className="flex flex-col justify-center text-lg font-medium mt-5 text-center space-y-4">
                  <p
                    className="text-[#f13b2f] hover:cursor-pointer"
                    onClick={handlePayment}
                  >
                    Ya, lanjutkan Bayar
                  </p>
                  <p
                    className="text-[#a4a4a4] hover:cursor-pointer"
                    onClick={() => {
                      dispatch(modalChange({ type: null, content: null }));
                      dispatch(modalToggle(false));
                    }}
                  >
                    Batalkan
                  </p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`${
                    isSuccess ? "bg-green-500" : "bg-[#f13b2f]"
                  } p-5 rounded-full text-white font-semibold `}
                >
                  {isSuccess ? (
                    <Check size={50} strokeWidth={3} />
                  ) : (
                    <X size={50} strokeWidth={3} />
                  )}
                </div>
                <div className="space-y-2 mt-5">
                  <p className="text-center text-sm ">
                    Pembayaran {payment?.service_name} sebesar
                  </p>
                  <p className="text-center text-xl font-medium">
                    {Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(payment.service_tariff)}
                  </p>
                  <p className="text-center text-xs">
                    {isSuccess ? "Berhasil!" : "Gagal!"}
                  </p>
                </div>
                <div
                  className="flex justify-center text-lg font-medium mt-10 text-[#f13b2f] hover:cursor-pointer"
                  onClick={() => {
                    dispatch(modalChange({ type: null, content: null }));
                    dispatch(modalToggle(false));
                    navigate("/");
                  }}
                >
                  <span>Kembali ke Beranda</span>
                </div>
              </>
            )}
          </div>
        </ModalWindow>
      )}
      <Header />
      <main className="text-3xl max-w-[90%] md:max-w-[720px] lg:max-w-[1000px] mx-auto">
        <AccountSummary />
        <div className="text-lg mt-10">
          <p>Pembayaran</p>
          <div className="flex items-center space-x-2">
            <img className="size-[40px]" src={payment?.service_icon}></img>
            <p>{payment?.service_name}</p>
          </div>
        </div>
        <div className=" w-full  bg-opacity-55 space-y-5 mt-10">
          <div className="w-full  border-[1px] border-[#b8b8b8] rounded-md overflow-hidden">
            <div className="flex items-center space-x-2 px-2 py-3 ">
              <CreditCard color="#b8b8b8" />
              <input
                className="w-full outline-none disabled:bg-white text-sm"
                type="number"
                placeholder="masukkan nominal tagihan"
                value={payment?.service_tariff}
                disabled
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="button"
            ref={refButton}
            onClick={() => {
              dispatch(modalChange({ type: "paymentConfirmation" }));
              dispatch(modalToggle(true));
            }}
            className="w-full flex items-center justify-center py-3 bg-[#f13b2f] active:bg-[#b1a9a9] transition-all duration-100 rounded-md disabled:bg-[#b8b8b8] "
          >
            <span className="text-sm text-white font-medium">Bayar</span>
          </button>
        </div>
      </main>
    </>
  );
}

export default Payment;
