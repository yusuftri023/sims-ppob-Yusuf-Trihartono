import { Lock, AtSign, Eye, EyeOff, User } from "react-feather";

import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { popUpToggle, setError } from "../../store/reducers/webContentReducer";
type ErrorState = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  confirmPassword: string | null;
  form: string | null;
};
function Register() {
  const [errorForm, setErrorForm] = useState<ErrorState>({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    confirmPassword: null,
    form: null,
  });
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div className="mx-auto w-[90%] md:w-[70%]">
        <div className="flex items-center justify-center space-x-2">
          <img src={logo} />
          <span className="text-xl font-medium">SIMS PPOB</span>
        </div>
        <div className="mt-8 text-center text-2xl font-medium">
          <h1>Lengkapi data untuk</h1>
          <h1>membuat akun</h1>
        </div>
        <form className="mt-8 space-y-2">
          <div
            className={`${
              errorForm.email && "border-red-600"
            } flex rounded-md border-2 p-3 focus-within:border-gray-500`}
          >
            <AtSign className={`${errorForm.email && "text-red-600"}`} />
            <input
              required
              type="email"
              className={`ml-3 w-full outline-none`}
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
              errorForm.firstName && "border-red-600"
            } flex rounded-md border-2 p-3 focus-within:border-gray-500`}
          >
            <User className={` ${errorForm.firstName && "text-red-600"} `} />
            <input
              required
              type="text"
              className="ml-3 w-full outline-none"
              placeholder="nama depan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => {
                if (firstName.length === 0) {
                  setErrorForm((prev) => ({
                    ...prev,
                    firstName: "Masukkan nama depan",
                  }));
                } else {
                  setErrorForm((prev) => ({
                    ...prev,
                    firstName: null,
                  }));
                }
              }}
            ></input>
          </div>
          {errorForm.firstName && (
            <div className="text-right">
              <span className="text-sm text-red-600">
                {errorForm.firstName}
              </span>
            </div>
          )}
          <div
            className={`${
              errorForm.lastName && "border-red-600"
            } flex rounded-md border-2 p-3 focus-within:border-gray-500`}
          >
            <User className={` ${errorForm.lastName && "text-red-600"} `} />
            <input
              required
              type="text"
              className="ml-3 w-full outline-none"
              placeholder="nama belakang"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => {
                if (lastName.length === 0) {
                  setErrorForm((prev) => ({
                    ...prev,
                    lastName: "Masukkan nama belakang",
                  }));
                } else {
                  setErrorForm((prev) => ({
                    ...prev,
                    lastName: null,
                  }));
                }
              }}
            ></input>
          </div>
          {errorForm.lastName && (
            <div className="text-right">
              <span className="text-sm text-red-600">{errorForm.lastName}</span>
            </div>
          )}
          <div
            className={`${
              errorForm.password && "border-red-600"
            } relative flex rounded-md border-2 p-3 focus-within:border-gray-500`}
          >
            <Lock className={` ${errorForm.password && "text-red-600"} `} />
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
          <div
            className={`${
              errorForm.confirmPassword && "border-red-600"
            } flex rounded-md border-2 p-3 focus-within:border-gray-500`}
          >
            <Lock
              className={` ${errorForm.confirmPassword && "text-red-600"} `}
            />
            <input
              required
              minLength={8}
              maxLength={255}
              className="ml-3 w-full outline-none"
              placeholder="konfirmasi password"
              type={showPasswordConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => {
                if (
                  !confirmPassword.match(
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
                  )
                ) {
                  setErrorForm((prev) => ({
                    ...prev,
                    confirmPassword:
                      "Password harus terdiri dari lowercase, uppercase, dan angka sepanjang 8 karakter",
                  }));
                } else if (confirmPassword !== password) {
                  setErrorForm((prev) => ({
                    ...prev,
                    confirmPassword: "Password tidak cocok",
                  }));
                } else {
                  setErrorForm((prev) => ({
                    ...prev,
                    confirmPassword: null,
                  }));
                }
              }}
            ></input>
            {showPasswordConfirm ? (
              <Eye
                className="cursor-pointer"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
            ) : (
              <EyeOff
                className="cursor-pointer"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
            )}
          </div>
          {errorForm.confirmPassword && (
            <div className="text-right">
              <span className="text-sm text-red-600">
                {errorForm.confirmPassword}
              </span>
            </div>
          )}
          <button
            type="submit"
            className="mt-20 w-full rounded-md border-2 bg-red-600 p-3 text-white"
            onClick={(e) => {
              if (
                errorForm.email ||
                errorForm.firstName ||
                errorForm.lastName ||
                errorForm.password ||
                errorForm.confirmPassword
              ) {
                console.log("ada error");
                e.preventDefault();
                setErrorForm((prev) => ({
                  ...prev,
                  form: "Harap isi semua kolom dengan benar",
                }));

                dispatch(setError("Harap isi semua kolom dengan benar"));
                dispatch(popUpToggle(true));
                return;
              }
            }}
          >
            Registrasi
          </button>
        </form>

        <div className="mt-5 text-center">
          <span>
            sudah punya akun? login
            <Link to={"/login"}>
              <span className="text-red-600"> di sini</span>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
