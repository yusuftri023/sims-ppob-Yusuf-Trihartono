import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Check, CreditCard, X } from "react-feather";
import { usePostTopUpMutation } from "../../store/apiSlicer";
import ModalWindow from "../../components/ModalWindow";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentReducer";
import useMediaQuery from "../../hooks/useMediaQuery";
const quickTopUp: number[] = [10000, 20000, 50000, 100000, 250000, 500000];
function TopUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refButton = useRef<HTMLButtonElement>(null);
  const [topUpAmount, setTopUpAmount] = useState<number | null>(null);
  const showModal = useAppSelector((state) => state.webContent.showModal);
  const [error, setError] = useState<string | null>(null);
  const userToken = useAppSelector((state) => state.auth.token);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [postTopUp, { isSuccess: isTopUpSuccess, data: topUpData }] =
    usePostTopUpMutation();
  useEffect(() => {
    if (userToken === null) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);
  useEffect(() => {
    if (!topUpAmount && refButton.current) refButton.current.disabled = true;
  }, [topUpAmount]);
  useEffect(() => {
    if (isTopUpSuccess) {
      dispatch(modalToggle(true));
    }
  }, [isTopUpSuccess]);
  return (
    <>
      {showModal && topUpAmount && (
        <ModalWindow>
          <div className="flex size-[300px] flex-col items-center justify-center">
            <div
              className={`${
                topUpData?.status === 0 ? "bg-green-500" : "bg-[#f13b2f]"
              } rounded-full p-5 font-semibold text-white`}
            >
              {topUpData?.status === 0 ? (
                <Check size={50} strokeWidth={3} />
              ) : (
                <X size={50} strokeWidth={3} />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-center text-sm">Top Up sebesar</p>
              <p className="text-center text-xl font-medium">
                {Intl.NumberFormat("id", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }).format(topUpAmount)}
              </p>
              <p className="text-center text-xs">
                {topUpData?.status === 0 ? "Berhasil!" : "Gagal!"}
              </p>
            </div>
            <div
              className="mt-10 flex justify-center text-lg font-medium text-[#f13b2f] hover:cursor-pointer"
              onClick={() => {
                dispatch(modalChange({ type: null, content: null }));
                dispatch(modalToggle(false));
                navigate("/");
              }}
            >
              <span>Kembali ke Beranda</span>
            </div>
          </div>
        </ModalWindow>
      )}
      <section>
        <div className="py-10">
          <p className="text-sm">Silahkan masukkan</p>
          <p className="text-2xl font-medium">Nominal Top Up</p>
        </div>
        <div className="flex-col md:flex md:flex-row md:space-x-5">
          <div className="w-full space-y-5 bg-opacity-55 md:w-[60%]">
            <div className="w-full overflow-hidden rounded-md border-[1px] border-[#b8b8b8]">
              <div className="flex items-center space-x-2 px-2 py-3">
                <CreditCard color="#b8b8b8" />
                <input
                  className="w-full text-sm outline-none"
                  type="number"
                  placeholder="masukkan nominal Top Up"
                  value={topUpAmount === null ? "" : topUpAmount}
                  pattern="/(\d)(?=(\d{3})+(?!\d))/g"
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  onBlur={() => {
                    if (
                      refButton.current &&
                      topUpAmount !== null &&
                      (topUpAmount < 10000 || topUpAmount > 10000000)
                    ) {
                      setError("Nominal tidak valid");
                      refButton.current.disabled = true;
                    } else if (refButton.current) {
                      setError(null);
                      refButton.current.disabled = false;
                    }
                  }}
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {isMobile && (
              <div className="grid w-full grid-cols-2 gap-2">
                {quickTopUp.map((amount) => (
                  <button
                    key={amount + 1}
                    onClick={() => {
                      setTopUpAmount(amount);
                      if (refButton.current) refButton.current.disabled = false;
                    }}
                    className="flex items-center justify-center rounded-md border-[1px] py-2"
                  >
                    <span className="text-sm font-medium">
                      {Intl.NumberFormat("id", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0,
                      }).format(amount)}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              ref={refButton}
              onClick={() => {
                if (refButton.current && topUpAmount === null) {
                  refButton.current.disabled = true;
                } else if (userToken !== null && topUpAmount !== null) {
                  postTopUp({
                    token: userToken,
                    top_up_amount: topUpAmount,
                  });
                }
              }}
              className="flex w-full items-center justify-center rounded-md bg-[#f13b2f] py-3 transition-all duration-100 active:bg-[#b1a9a9] disabled:bg-[#b8b8b8]"
            >
              <span className="text-sm font-medium text-white">Top Up</span>
            </button>
          </div>
          {!isMobile && (
            <div className="grid w-full grid-cols-3 gap-2">
              {quickTopUp.map((amount) => (
                <button
                  key={amount + 1}
                  onClick={() => {
                    setTopUpAmount(amount);
                    if (refButton.current) refButton.current.disabled = false;
                  }}
                  className="flex items-center justify-center rounded-md border-[1px]"
                >
                  <span className="text-sm font-medium">
                    {Intl.NumberFormat("id", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0,
                    }).format(amount)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default TopUp;
