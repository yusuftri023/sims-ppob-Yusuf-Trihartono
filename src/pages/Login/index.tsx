import { Lock, AtSign, Eye, EyeOff } from "react-feather";
import logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../store/apiSlicer";
import { useAppDispatch } from "../../store/store";
import { setAuth } from "../../store/reducers/authReducer";
import { useEffect, useState } from "react";
import { popUpToggle, setError } from "../../store/reducers/webContentReducer";
type ErrorState = {
  email: string | null;
  password: string | null;
  form: string | null;
};
export interface ErrorRef {
  getFormError: () => string | undefined;
}
const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [
    login,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError },
  ] = useLoginMutation();
  const [errorForm, setErrorForm] = useState<ErrorState>({
    email: null,
    password: null,
    form: null,
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoginSuccess && loginData.status === 0) {
      dispatch(setAuth(loginData.data.token));
      navigate("/");
    } else if (isLoginError) {
      dispatch(setError("Kombinasi email dan password salah"));
      dispatch(popUpToggle(true));
    }
  }, [isLoginSuccess, loginData, isLoginError, navigate, dispatch]);
  return (
    <>
      <div className="mx-auto w-[90%] md:w-[70%]">
        <div className="flex items-center justify-center space-x-2">
          <img src={logo} />
          <span className="text-xl font-medium">SIMS PPOB</span>
        </div>
        <div className="mt-10 text-center text-2xl font-medium">
          <h1>Masuk atau buat akun</h1>
          <h1>untuk memulai</h1>
        </div>
        <form className="mt-8 space-y-5">
          <div
            className={`${
              errorForm.email && "border-red-600"
            } flex rounded-md border-2 p-3 focus-within:border-gray-500`}
          >
            <AtSign className={`${errorForm.email && "text-red-600"}`} />
            <input
              required
              autoComplete=""
              type="email"
              className="ml-3 w-full outline-none"
              placeholder="masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
                  setErrorForm((prev) => ({ ...prev, email: null }));
                } else {
                  setErrorForm((prev) => ({
                    ...prev,
                    email: "Email tidak valid",
                  }));
                }
              }}
            ></input>
          </div>
          {errorForm.email && (
            <div className="text-right text-red-600">
              <span className="text-md">{errorForm.email}</span>
            </div>
          )}

          <div
            className={`${
              errorForm.password && "border-red-600"
            } flex rounded-md border-2 p-3 focus-within:border-gray-500`}
          >
            <Lock className={`${errorForm.password && "text-red-600"}`} />
            <input
              required
              className="ml-3 w-full outline-none"
              placeholder="buat password"
              minLength={8}
              maxLength={255}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                if (
                  !password.match(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
                  )
                ) {
                  setErrorForm((prev) => ({
                    ...prev,
                    password:
                      "Password harus terdiri dari lowercase, uppercase, dan angka sepanjang 8 karakter",
                  }));
                } else {
                  setErrorForm((prev) => ({
                    ...prev,
                    password: null,
                  }));
                }
              }}
            ></input>
            {showPassword ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeOff
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {errorForm.password && (
            <div className="text-right">
              <span className="text-sm text-red-600">{errorForm.password}</span>
            </div>
          )}
          <button
            type="submit"
            className="mt-20 w-full rounded-md border-2 bg-red-600 p-3 text-white"
            onClick={(e) => {
              if (errorForm.email || errorForm.password) {
                e.preventDefault();
                dispatch(setError("Harap isi semua kolom dengan benar"));
                dispatch(popUpToggle(true));
                return;
              } else if (
                !errorForm.email &&
                !errorForm.password &&
                !(email.length === 0 || password.length === 0)
              ) {
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
};

export default LoginForm;
