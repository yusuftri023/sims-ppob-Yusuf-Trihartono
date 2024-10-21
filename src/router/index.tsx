/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import loading from "../assets/loading.svg";

const MainPage = lazy(() => import("../pages/index.tsx"));
const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const PaymentPage = lazy(() => import("../pages/Payment"));
const TopUpPage = lazy(() => import("../pages/TopUp"));
const TransactionHistoryPage = lazy(
  () => import("../pages/TransactionHistory")
);
const ProfilePage = lazy(() => import("../pages/Profile"));
const NotFoundPage = lazy(() => import("../pages/NotFound404"));
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        index
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={loading}></img>
              </div>
            }
          >
            <MainPage />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={loading}></img>
              </div>
            }
          >
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="register"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={loading}></img>
              </div>
            }
          >
            <RegisterPage />
          </Suspense>
        }
      />

      <Route
        path="payment"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={loading}></img>
              </div>
            }
          >
            <PaymentPage />
          </Suspense>
        }
      />
      <Route
        path="topup"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={loading}></img>
              </div>
            }
          >
            <TopUpPage />
          </Suspense>
        }
      />
      <Route
        path="history"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={loading}></img>
              </div>
            }
          >
            <TransactionHistoryPage />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={loading}></img>
              </div>
            }
          >
            <ProfilePage />
          </Suspense>
        }
      />

      <Route
        path="*"
        element={<Navigate replace to={"404-page-not-found"} />}
      />
      <Route
        path="/404-page-not-found"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img src={loading}></img>
              </div>
            }
          >
            <NotFoundPage />
          </Suspense>
        }
      />
    </>
  )
);
