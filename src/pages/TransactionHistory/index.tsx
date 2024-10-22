import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  RecordTransaction,
  useGetTransactionHistoryQuery,
} from "../../store/apiSlicer";
import { Minus, Plus } from "react-feather";
import { updateTransactionHistory } from "../../store/actions/transactionAction";

import LoadingSpinner from "../../components/LoadingSpinner";
function TransactionHistory() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.auth.token);
  const {
    data: transactionHistoryResponse,
    isLoading: isLoadingTransactionFirst,
    isSuccess: isSuccessTransactionFirst,
    isError: isErrorTransactionFirst,
  } = useGetTransactionHistoryQuery({
    token: userToken,
    limit: 5,
    offset: 0,
  });
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const handleLoadingMore = () => {
    if (userToken !== null) {
      setIsLoadingMore(() => true);
      dispatch(
        updateTransactionHistory({
          limit: 5,
          offset: history.length + 5,
          token: userToken,
        }),
      ).then((res) => {
        setHistory((prev) => [...prev, ...res.payload.data.records]);
        setIsLoadingMore(() => false);
      });
    }
  };
  const [history, setHistory] = useState<RecordTransaction[]>([]);

  useEffect(() => {
    if (userToken === null) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);
  useEffect(() => {
    if (transactionHistoryResponse?.status === 0) {
      setHistory(transactionHistoryResponse.data.records);
    }
  }, [transactionHistoryResponse]);
  return (
    <>
      <h1 className="mt-10 text-xl font-semibold">Semua Transaksi</h1>
      <section>
        {isLoadingTransactionFirst ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="space-y-4 py-5">
              {(isSuccessTransactionFirst || isErrorTransactionFirst) &&
                history.length === 0 && (
                  <h2 className="mx-auto text-center text-2xl font-medium">
                    Your Transaction History is empty
                  </h2>
                )}
              {history.length > 0 &&
                history.map((entry, i) => (
                  <div
                    key={entry.description + i}
                    className="flex items-center justify-between rounded-lg border-[2px] border-[#e6e4e49c] px-5 py-2 shadow-[0_0_2px_0_rgba(0,0,0,0.1)]"
                  >
                    <div className="space-y-2">
                      <div
                        className={`${
                          entry.transaction_type === "TOPUP"
                            ? "text-green-500"
                            : "text-red-500"
                        } flex w-fit items-center space-x-2 text-2xl font-medium`}
                      >
                        {entry.transaction_type === "TOPUP" ? (
                          <Plus />
                        ) : (
                          <Minus />
                        )}
                        <p>
                          {Intl.NumberFormat("id", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          }).format(entry.total_amount)}
                        </p>
                      </div>
                      <p className="text-sm text-[#808080b9]">
                        {Intl.DateTimeFormat("id", {
                          dateStyle: "long",
                          timeStyle: "long",
                        })
                          .format(new Date(entry.created_on))
                          .toString()
                          .split(" pukul ")
                          .join(" ")}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">{entry.description}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="py-10 text-center text-sm font-medium text-[#f13b2f]">
              {isLoadingMore ? (
                <LoadingSpinner />
              ) : (
                <span
                  className="hover:cursor-pointer"
                  onClick={handleLoadingMore}
                >
                  {history.length > 0 ? "Load More" : ""}
                </span>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default TransactionHistory;
