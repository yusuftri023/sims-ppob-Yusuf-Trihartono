import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { persistor, useAppDispatch, useAppSelector } from "../../store/store";
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
import { popUpToggle, setError } from "../../store/reducers/webContentReducer";
type ErrorState = {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  form: string | null;
};
function Profile() {
  const [errorForm, setErrorForm] = useState<ErrorState>({
    email: null,
    firstName: null,
    lastName: null,
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
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.auth.token);
  const { data: profile, isError: isErrorProfile } = useGetProfileQuery(
    { token: userToken },
    { refetchOnMountOrArgChange: true },
  );
  const [updateProfileImage, { data: profileImageResponse }] =
    useUpdateProfileImageMutation();
  const [showPopUp, setShowPopUp] = useState(false);
  const [updateProfile, { data: profileResponse }] = useUpdateProfileMutation();
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
  useEffect(() => {
    if (isErrorProfile) {
      dispatch(
        setError("Token kadaluarsa atau tidak valid, silahkan login kembali"),
      );
      dispatch(popUpToggle(true));
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    }
  }, [isErrorProfile, navigate]);
  return (
    <>
      <PopUp showPopUp={showPopUp} duration={3000}>
        <div className="flex h-fit w-[300px] flex-col items-center justify-center rounded-2xl bg-white py-8 drop-shadow-lg">
          {profileImageResponse?.status === 0 ||
          profileResponse?.status === 0 ? (
            <>
              <CheckCircle color="green" size={100} />
              <p className="mt-5 text-center text-lg">
                Profile berhasil diperbarui
              </p>
            </>
          ) : (
            <>
              <AlertCircle color="red" size={100} />
              <p className="mt-5 text-center">{errorForm.form}</p>
            </>
          )}
        </div>
      </PopUp>
      <div
        className="group relative mx-auto mt-10 w-fit hover:cursor-pointer"
        onClick={() => {
          refImageInput?.current?.click();
        }}
      >
        <div className="w-fit overflow-hidden rounded-full border-[2px] border-[#e6e4e49c]">
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
        <div className="w-fi absolute bottom-0 right-0 overflow-hidden rounded-full border-[2px] border-[#e6e4e49c] group-hover:bg-[#9897979c]">
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
          <h1 className="mt-4 text-center text-3xl font-bold">
            {profile?.data?.first_name + " " + profile?.data?.last_name}
          </h1>
        )}
        <form className="mt-4 space-y-4 text-lg">
          <div>
            <p>Email</p>
            <div
              className={`${
                errorForm.email && "border-red-600"
              } flex items-center rounded-md border-2 px-3 py-2 focus-within:border-gray-500`}
            >
              <AtSign className={`${errorForm.email && "text-red-600"}`} />
              <input
                required
                disabled
                ref={refEmail}
                type="email"
                className={`ml-3 w-full outline-none disabled:bg-white`}
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
                <span className="text-sm">{errorForm.email}</span>
              </div>
            )}
          </div>

          <div>
            <p>Nama Depan</p>
            <div
              className={`${
                errorForm.firstName && "border-red-600"
              } flex items-center rounded-md border-2 px-3 py-2 focus-within:border-gray-500`}
            >
              <User className={` ${errorForm.firstName && "text-red-600"} `} />
              <input
                required
                disabled
                ref={refFirstName}
                type="text"
                className="ml-3 w-full outline-none disabled:bg-white"
                placeholder="nama depan"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
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
          </div>

          <div>
            <p>Nama Belakang</p>
            <div
              className={`${
                errorForm.lastName && "border-red-600"
              } flex items-center rounded-md border-2 px-3 py-2 focus-within:border-gray-500`}
            >
              <User className={` ${errorForm.lastName && "text-red-600"} `} />
              <input
                required
                disabled
                ref={refLastName}
                type="text"
                className="ml-3 w-full outline-none disabled:bg-white"
                placeholder="nama belakang"
                value={lastName}
                onChange={(e) => {
                  setLastName(() => e.target.value);
                }}
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
                <span className="text-sm text-red-600">
                  {errorForm.lastName}
                </span>
              </div>
            )}
          </div>

          {isEditing ? (
            <>
              <button
                className="w-full rounded-md bg-[#f13b2f] px-4 py-2 text-lg text-white"
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
                className="mt-20 w-full rounded-md border-[2px] border-[#f13b2f] px-3 py-2 font-medium text-[#f13b2f]"
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
                    setErrorForm((prev) => ({
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
              className="mt-20 w-full rounded-md border-[2px] border-[#f13b2f] px-3 py-2 font-medium text-[#f13b2f]"
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
              className="w-full rounded-md bg-[#f13b2f] px-4 py-2 text-lg text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Profile;
