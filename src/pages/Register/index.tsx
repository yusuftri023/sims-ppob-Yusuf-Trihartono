import { Lock, AtSign, Eye, EyeOff, User, AlertCircle } from "react-feather";

import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import IlustrasiLogin from "../../components/IlustrasiLogin";

function Register() {
  type ErrorState = {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    password: string | null;
    confirmPassword: string | null;
    form: string | null;
  };
  const [error, setError] = useState<ErrorState>({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    confirmPassword: null,
    form: null,
  });
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          <p className="text-red-500 text-center mt-5">{error.form}</p>
        </div>
      </PopUp>
      <div className="flex max-w-screen h-screen ">
        <div className="md:w-[50%] w-full h-full  flex items-center">
          <div className="mx-auto w-[90%] md:w-[70%] ">
            <div className="flex items-center justify-center space-x-2">
              <img src={logo} />
              <span className="text-xl font-medium">SIMS PPOB</span>
            </div>
            <div className="text-center mt-8 text-2xl font-medium">
              <h1>Lengkapi data untuk</h1>
              <h1>membuat akun</h1>
            </div>
            <form className="space-y-2 mt-8">
              <div
                className={`${
                  error.email && "border-red-600"
                } flex  border-2 rounded-md p-3 focus-within:border-gray-500 `}
              >
                <AtSign className={`${error.email && "text-red-600"}`} />
                <input
                  required
                  type="email"
                  className={` outline-none w-full ml-3`}
                  placeholder="masukkan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    if (
                      email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
                    ) {
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
                  error.firstName && "border-red-600"
                } flex  border-2 rounded-md p-3 focus-within:border-gray-500 `}
              >
                <User className={` ${error.firstName && "text-red-600"} `} />
                <input
                  required
                  type="text"
                  className=" outline-none w-full ml-3"
                  placeholder="nama depan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={() => {
                    if (firstName.length === 0) {
                      setError((prev) => ({
                        ...prev,
                        firstName: "Masukkan nama depan",
                      }));
                    } else {
                      setError((prev) => ({
                        ...prev,
                        firstName: null,
                      }));
                    }
                  }}
                ></input>
              </div>
              {error.firstName && (
                <div className=" text-right">
                  <span className="text-red-600 text-sm">
                    {error.firstName}
                  </span>
                </div>
              )}
              <div
                className={`${
                  error.lastName && "border-red-600"
                } flex  border-2 rounded-md p-3 focus-within:border-gray-500 `}
              >
                <User className={` ${error.lastName && "text-red-600"} `} />
                <input
                  required
                  type="text"
                  className=" outline-none w-full ml-3"
                  placeholder="nama belakang"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={() => {
                    if (lastName.length === 0) {
                      setError((prev) => ({
                        ...prev,
                        lastName: "Masukkan nama belakang",
                      }));
                    } else {
                      setError((prev) => ({
                        ...prev,
                        lastName: null,
                      }));
                    }
                  }}
                ></input>
              </div>
              {error.lastName && (
                <div className=" text-right">
                  <span className="text-red-600 text-sm">{error.lastName}</span>
                </div>
              )}
              <div
                className={`${
                  error.password && "border-red-600"
                } flex  border-2 rounded-md p-3 relative focus-within:border-gray-500 `}
              >
                <Lock className={` ${error.password && "text-red-600"} `} />
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
              <div
                className={`${
                  error.confirmPassword && "border-red-600"
                } flex  border-2 rounded-md p-3 focus-within:border-gray-500 `}
              >
                <Lock
                  className={` ${error.confirmPassword && "text-red-600"} `}
                />
                <input
                  required
                  minLength={8}
                  maxLength={255}
                  className=" outline-none w-full ml-3"
                  placeholder="konfirmasi password"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => {
                    if (
                      !confirmPassword.match(
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
                      )
                    ) {
                      setError((prev) => ({
                        ...prev,
                        confirmPassword:
                          "Password harus terdiri dari lowercase, uppercase, dan angka sepanjang 8 karakter",
                      }));
                    } else if (confirmPassword !== password) {
                      setError((prev) => ({
                        ...prev,
                        confirmPassword: "Password tidak cocok",
                      }));
                    } else {
                      setError((prev) => ({
                        ...prev,
                        confirmPassword: null,
                      }));
                    }
                  }}
                ></input>
                {showPasswordConfirm ? (
                  <Eye
                    className=" cursor-pointer"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  />
                ) : (
                  <EyeOff
                    className=" cursor-pointer"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  />
                )}
              </div>
              {error.confirmPassword && (
                <div className=" text-right">
                  <span className="text-red-600 text-sm">
                    {error.confirmPassword}
                  </span>
                </div>
              )}
              <button
                type="submit"
                className="w-full border-2 rounded-md p-3 bg-red-600 text-white mt-20"
                onClick={(e) => {
                  if (
                    error.email ||
                    error.firstName ||
                    error.lastName ||
                    error.password ||
                    error.confirmPassword
                  ) {
                    e.preventDefault();
                    setError((prev) => ({
                      ...prev,
                      form: "Harap isi semua kolom dengan benar",
                    }));
                    setShowPopUp(true);
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
        </div>
        <div className="min-w-[50%] hidden md:block ">
          <IlustrasiLogin />
        </div>
      </div>
    </>
  );
}

export default Register;
