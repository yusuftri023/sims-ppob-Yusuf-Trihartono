import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { persistor, useAppSelector } from "../../store/store";
import Header from "../../components/Header";
import {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "../../store/apiSlicer";
import { AlertCircle, AtSign, CheckCircle, Edit2, User } from "react-feather";
import Profile_Photo from "../../assets/Profile-Photo.png";
import { Jimp } from "jimp";
import base64ToFile from "../../utils/base64toFile";
import PopUp from "../../components/PopUp";

function Profile() {
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
  const refEmail = useRef<HTMLInputElement>(null);
  const refFirstName = useRef<HTMLInputElement>(null);
  const refLastName = useRef<HTMLInputElement>(null);
  const refImageInput = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const userToken = useAppSelector((state) => state.auth.token);
  const { data: profile } = useGetProfileQuery(
    { token: userToken },
    { refetchOnMountOrArgChange: true }
  );
  const [updateProfileImage, { data: profileImageResponse }] =
    useUpdateProfileImageMutation();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target?.result;

      if (!data || !(data instanceof ArrayBuffer)) {
        return;
      }
      const image = await Jimp.fromBuffer(data);
      image.resize({ w: 200 });
      const imageToBase64 = await image.getBase64("image/jpeg");
      const newfile = base64ToFile(imageToBase64, "image/jpeg", "image.jpg");
      const formData = new FormData();
      formData.append("file", newfile);
      if (userToken === null) return;
      updateProfileImage({
        token: userToken,
        formData,
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleLogout = () => {
    persistor.purge();
    navigate("/login");
  };
  useEffect(() => {
    if (userToken === null) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, []);
  useEffect(() => {
    if (profile?.status === 0) {
      setEmail(profile.data?.email);
      setFirstName(profile.data?.first_name);
      setLastName(profile.data?.last_name);
    }
  }, [profile]);
  useEffect(() => {
    if (isEditing && refFirstName.current && refLastName.current) {
      refFirstName.current.disabled = false;
      refLastName.current.disabled = false;
    }
  }, [isEditing]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [updateProfile, { data: profileResponse }] = useUpdateProfileMutation();
  useEffect(() => {
    if (profileImageResponse?.status === 0) {
      setShowPopUp(true);
      setTimeout(() => {
        setShowPopUp(false);
      }, 3000);
    } else if (profileResponse?.status === 0) {
      setShowPopUp(true);
      setTimeout(() => {
        setShowPopUp(false);
      }, 3000);
    }
  }, [profileImageResponse, profileResponse]);
  return (
    <>
      <PopUp showPopUp={showPopUp} duration={3000}>
        <div className="w-[300px] py-8 h-fit flex flex-col justify-center items-center bg-white rounded-2xl drop-shadow-lg">
          {profileImageResponse?.status === 0 ||
          profileResponse?.status === 0 ? (
            <>
              <CheckCircle color="green" size={100} />
              <p className=" text-center mt-5">Profile berhasil diperbarui</p>
            </>
          ) : (
            <>
              <AlertCircle color="red" size={100} />
              <p className=" text-center mt-5">{error.form}</p>
            </>
          )}
        </div>
      </PopUp>
      <Header />
      <main className="text-3xl max-w-[90%] md:max-w-[720px] lg:max-w-[1000px] mx-auto">
        <div
          className="w-fit mx-auto mt-10 relative group hover:cursor-pointer"
          onClick={() => {
            refImageInput?.current?.click();
          }}
        >
          <div className=" rounded-full overflow-hidden  border-[2px] border-[#e6e4e49c] w-fit">
            <img
              className="size-[100px]"
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
          <div className=" rounded-full overflow-hidden  border-[2px] border-[#e6e4e49c] w-fi absolute bottom-0 right-0 group-hover:bg-[#9897979c]">
            <Edit2 size={28} strokeWidth={3} className="p-2" />
            <input
              ref={refImageInput}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFile}
            ></input>
          </div>
        </div>

        <section>
          {profile?.status === 0 && (
            <h1 className="text-3xl font-bold text-center mt-4">
              {profile?.data?.first_name + " " + profile?.data?.last_name}
            </h1>
          )}
          <form className="space-y-4 mt-4 text-lg">
            <div>
              <p>Email</p>
              <div
                className={`${
                  error.email && "border-red-600"
                } flex  border-2 rounded-md py-2 px-3 focus-within:border-gray-500 items-center `}
              >
                <AtSign className={`${error.email && "text-red-600"}`} />
                <input
                  required
                  disabled
                  ref={refEmail}
                  type="email"
                  className={`disabled:bg-white  outline-none w-full ml-3`}
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
                  <span className="text-sm">{error.email}</span>
                </div>
              )}
            </div>

            <div>
              <p>Nama Depan</p>
              <div
                className={`${
                  error.firstName && "border-red-600"
                } flex  border-2 rounded-md py-2 px-3 focus-within:border-gray-500 items-center `}
              >
                <User className={` ${error.firstName && "text-red-600"} `} />
                <input
                  required
                  disabled
                  ref={refFirstName}
                  type="text"
                  className=" disabled:bg-white outline-none w-full ml-3"
                  placeholder="nama depan"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
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
            </div>

            <div>
              <p>Nama Belakang</p>
              <div
                className={`${
                  error.lastName && "border-red-600"
                } flex  border-2 rounded-md py-2 px-3 focus-within:border-gray-500 items-center `}
              >
                <User className={` ${error.lastName && "text-red-600"} `} />
                <input
                  required
                  disabled
                  ref={refLastName}
                  type="text"
                  className=" disabled:bg-white outline-none w-full ml-3"
                  placeholder="nama belakang"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(() => e.target.value);
                  }}
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
            </div>

            {isEditing ? (
              <>
                <button
                  className="bg-[#f13b2f] w-full px-4 py-2 rounded-md text-white text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      refFirstName.current &&
                      refLastName.current &&
                      userToken !== null
                    ) {
                      updateProfile({
                        first_name: firstName,
                        last_name: lastName,
                        token: userToken,
                      });
                      setIsEditing(false);
                      refFirstName.current.disabled = true;
                      refLastName.current.disabled = true;
                    }
                  }}
                >
                  Simpan
                </button>{" "}
                <button
                  className="w-full rounded-md py-2 px-3 border-[2px] border-[#f13b2f] text-[#f13b2f] font-medium mt-20"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      refFirstName.current &&
                      refLastName.current &&
                      profile?.status === 0
                    ) {
                      setIsEditing(false);
                      setFirstName(profile?.data?.first_name);
                      setLastName(profile?.data?.last_name);
                      setError((prev) => ({
                        ...prev,
                        lastName: null,
                        firstName: null,
                      }));
                      refFirstName.current.disabled = true;
                      refLastName.current.disabled = true;
                    }
                  }}
                >
                  Batalkan
                </button>
              </>
            ) : (
              <button
                className="w-full rounded-md py-2 px-3 border-[2px] border-[#f13b2f] text-[#f13b2f] font-medium mt-20"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              >
                Edit Profile
              </button>
            )}
          </form>
          {!isEditing && (
            <div className="mt-6">
              <button
                className="bg-[#f13b2f] w-full px-4 py-2 rounded-md text-white text-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;
