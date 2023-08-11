"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

interface UserData {
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  username: string;
}

export default function UserProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<UserData>({
    email: "",
    isAdmin: false,
    isVerified: false,
    username: "",
  });

  const onLogout = async () => {
     try {
       const response = await axios.get("/api/users/logout");
       toast.success(response.data.message);
       router.push("/login");
     } catch (error: any) {
       toast.error(error.message);
     }
   };
   
    const getUserDetails = async () => {
      const response = await axios.get("/api/users/user");
      setData(response.data.data);
    };

    useEffect(() => {
      getUserDetails();
    }, []);

    if (!data) {
      // Data is not fetched yet, you can display loading spinner or message
      return <div>Loading...</div>;
    }

  return (
    <div className="bg-black text-white h-screen">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl">
              Your Profile
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              <span className="font-semibold">Email:</span> {data.email}
            </p>
            <p className="mt-2 text-lg leading-8 text-slate-400">
              <span className="font-semibold">Username:</span> {data.username}
            </p>
            <p className="mt-2 text-lg leading-8 text-slate-400">
              <span className="font-semibold">Admin:</span> {data.isAdmin ? "Yes" : "No"}
            </p>
            <p className="mt-2 text-lg leading-8 text-slate-400">
                <span className="font-semibold">Verified:</span> {data.isVerified ? "Yes" : "No"}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className="rounded-md bg-[#f02e65] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#e26891] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
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
    </div>
  );
}
