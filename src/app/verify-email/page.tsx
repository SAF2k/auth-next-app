"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {

  const router = useRouter();
  const data  = "nothing";

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
     const verifyUserEmail = async () => {
       try {
         await axios.post("/api/users/forgot-password", { token });
         setVerified(true);
       } catch (error: any) {
         setError(true);
         console.log(error.response.data);
       }
     };
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl">
            Hi {data === "nothing" ? "Nothing" : data}
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              className="rounded-md bg-[#f02e65] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#e26891] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => router.push("/login")}
            >
              Logout
            </button>
            <button
              className="text-sm font-semibold leading-6"
              onClick={() => router.push(`/profile/${data}`)}
            >
              {"View Profile -->"}
            </button>
          </div>
        </div>
      </div>
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1255/538] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#f02e65] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
  );
}
