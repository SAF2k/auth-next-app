'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ProfilePage() {

  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile Page</p>
        <button onClick={onLogout} className="border rounded-md px-4 py-2 mt-5 hover:bg-red-600 hover:text-black">LOGOUT</button>
      </div>
    );
}