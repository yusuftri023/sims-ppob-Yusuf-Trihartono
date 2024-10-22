/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import loading from "../assets/loading.svg";

const MainLayout = lazy(() => import("../layouts/MainLayout.tsx"));
const AuthFormLayout = lazy(() => import("../layouts/AuthFormLayout.tsx"));
const SecondaryLayout = lazy(() => import("../layouts/SecondaryLayout.tsx"));
const MainPage = lazy(() => import("../pages/index.tsx"));
const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const PaymentPage = lazy(() => import("../pages/Payment"));
const TopUpPage = lazy(() => import("../pages/TopUp"));
const TransactionHistoryPage = lazy(
  () => import("../pages/TransactionHistory"),
);
const ProfilePage = lazy(() => import("../pages/Profile"));
const NotFoundPage = lazy(() => import("../pages/NotFound404"));
const LoadingWait = () => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <img src={loading}></img>
  </div>
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingWait />}>
            <MainLayout />
          </Suspense>
        }
      >
        <Route index element={<MainPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="topup" element={<TopUpPage />} />
        <Route path="history" element={<TransactionHistoryPage />} />
      </Route>

      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingWait />}>
            <SecondaryLayout />
          </Suspense>
        }
      >
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route
        path="/"
        element={
          <Suspense fallback={<LoadingWait />}>
            <AuthFormLayout />
          </Suspense>
        }
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate replace to={"404-page-not-found"} />}
      />
      <Route
        path="/404-page-not-found"
        element={
          <Suspense fallback={<LoadingWait />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </>,
  ),
);
