"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      router.push("/");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
      
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 text-black rounded-lg"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 text-black rounded-lg"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 mt-4 text-white bg-blue-500 rounded-lg"
      >
        Login
      </button>
      <Link href="/signup">not a member?</Link>
    </div>
  );
}
