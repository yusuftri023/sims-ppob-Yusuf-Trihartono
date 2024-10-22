import { AlertCircle } from "react-feather";
import PopUp from "./PopUp";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { popUpToggle, setError } from "../store/reducers/webContentReducer";

function ErrorPopUp() {
  const error = useAppSelector((state) => state.webContent.error);
  const errorRef = useRef(error);
  if (typeof error === "string") errorRef.current = error;
  const dispatch = useAppDispatch();
  const showPopUp = useAppSelector((state) => state.webContent.showPopUp);
  useEffect(() => {
    if (showPopUp) {
      setTimeout(() => {
        dispatch(popUpToggle(false));
      }, 3000);
    }
    return () => {
      if (showPopUp) {
        dispatch(setError(null));
      }
    };
  }, [showPopUp]);
  return (
    <>
      <PopUp showPopUp={showPopUp} duration={3000}>
        <div className="flex size-[300px] flex-col items-center justify-center rounded-2xl bg-white px-10 drop-shadow-lg">
          <AlertCircle color="red" size={100} />
          <p className="mt-5 text-center text-red-500">{errorRef.current}</p>
        </div>
      </PopUp>
    </>
  );
}

export default ErrorPopUp;
