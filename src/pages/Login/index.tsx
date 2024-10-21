import { AlertCircle } from "react-feather";

import { useEffect, useRef, useState } from "react";
import PopUp from "../../components/PopUp";
import IlustrasiLogin from "../../components/IlustrasiLogin";
import LoginForm, { ErrorRef } from "../../components/LoginForm";

function Login() {
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const errorRef = useRef<ErrorRef>(null);
  useEffect(() => {
    if (showPopUp) {
      setTimeout(() => {
        setShowPopUp(false);
      }, 3000);
    }
  }, [showPopUp]);

  return (
    <>
      <PopUp showPopUp={showPopUp} duration={3000}>
        <div className="size-[300px] flex flex-col justify-center items-center bg-white rounded-2xl drop-shadow-lg">
          <AlertCircle color="red" size={100} />
          <p className="text-red-500 text-center mt-5">
            {errorRef.current?.getFormError()}
          </p>
        </div>
      </PopUp>
      <div className="flex max-w-screen h-screen ">
        <div className="md:w-[50%] w-full h-full  flex items-center">
          <LoginForm setShowPopUp={setShowPopUp} ref={errorRef} />
        </div>
        <div className="min-w-[50%] hidden md:block ">
          <IlustrasiLogin />
        </div>
      </div>
    </>
  );
}

export default Login;
