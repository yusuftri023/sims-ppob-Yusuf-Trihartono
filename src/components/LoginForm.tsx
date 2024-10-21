import { Lock, AtSign, Eye, EyeOff } from "react-feather";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../store/apiSlicer";
import { useAppDispatch } from "../store/store";
import { setAuth } from "../store/reducers/authReducer";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
type ErrorState = {
  email: string | null;
  password: string | null;
  form: string | null;
};
export interface ErrorRef {
  getFormError: () => string | undefined;
}
const LoginForm = forwardRef<
  ErrorRef,
  { setShowPopUp: React.Dispatch<React.SetStateAction<boolean>> }
>(({ setShowPopUp }, ref) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [
    login,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError },
  ] = useLoginMutation();
  const [error, setError] = useState<ErrorState>({
    email: null,
    password: null,
    form: null,
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  useImperativeHandle(ref, () => ({
    getFormError: () => {
      if (error.form && error.form !== null) return error.form;
    },
  }));
  useEffect(() => {
    if (isLoginSuccess && loginData.status === 0) {
      dispatch(setAuth(loginData.data.token));
      navigate("/");
    } else if (isLoginError) {
      setError((prev) => ({
        ...prev,
        form: "Kombinasi email dan password salah",
      }));
      setShowPopUp(true);
    }
  }, [
    isLoginSuccess,
    loginData,
    isLoginError,
    navigate,
    dispatch,
    setShowPopUp,
  ]);
  return (
    <>
      <div className="mx-auto w-[90%] md:w-[70%] ">
        <div className="flex items-center justify-center space-x-2">
          <img src={logo} />
          <span className="text-xl font-medium">SIMS PPOB</span>
        </div>
        <div className="text-center mt-10 text-2xl font-medium">
          <h1>Masuk atau buat akun</h1>
          <h1>untuk memulai</h1>
        </div>
        <form className="space-y-5 mt-8">
          <div
            className={`${
              error.email && "border-red-600"
            } flex  border-2 rounded-md p-3 focus-within:border-gray-500 `}
          >
            <AtSign className={`${error.email && "text-red-600"}`} />
            <input
              required
              type="email"
              className=" outline-none w-full ml-3"
              placeholder="masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
                  setError((prev) => ({ ...prev, email: null }));
                } else {
                  setError((prev) => ({
                    ...prev,
                    email: "Email tidak valid",
                  }));
                }
              }}
            ></input>
          </div>
          {error.email && (
            <div className=" text-right text-red-600">
              <span className="text-md">{error.email}</span>
            </div>
          )}

          <div
            className={`${
              error.password && "border-red-600"
            } flex  border-2 rounded-md p-3 focus-within:border-gray-500 `}
          >
            <Lock className={`${error.password && "text-red-600"}`} />
            <input
              required
              className=" outline-none w-full ml-3"
              placeholder="buat password"
              minLength={8}
              maxLength={255}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                if (
                  !password.match(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
                  )
                ) {
                  setError((prev) => ({
                    ...prev,
                    password:
                      "Password harus terdiri dari lowercase, uppercase, dan angka sepanjang 8 karakter",
                  }));
                } else {
                  setError((prev) => ({
                    ...prev,
                    password: null,
                  }));
                }
              }}
            ></input>
            {showPassword ? (
              <Eye
                className=" cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeOff
                className=" cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {error.password && (
            <div className=" text-right">
              <span className="text-red-600 text-sm">{error.password}</span>
            </div>
          )}
          <button
            type="submit"
            className="w-full border-2 rounded-md p-3 bg-red-600 text-white mt-20"
            onClick={(e) => {
              if (error.email || error.password) {
                e.preventDefault();
                setError((prev) => ({
                  ...prev,
                  form: "Harap isi semua kolom dengan benar",
                }));
                setShowPopUp(true);
                return;
              } else if (!error.email && !error.password) {
                e.preventDefault();

                login({ email, password });
              }
            }}
          >
            Login
          </button>
        </form>
        <div className="mt-7 text-center">
          <span>
            belum punya akun? registrasi
            <Link to={"/register"}>
              <span className="text-red-600"> di sini</span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
});

export default LoginForm;
