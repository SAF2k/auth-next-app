"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z  from "zod";

const formSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

export default function ResetPasswordPage() {
  const router = useRouter();

 const [token, setToken] = useState("");
 const [loading, setLoading] = useState(false);
 const [valid, setValid] = useState(false);
 const [error, setError] = useState(false);
 const [data, setData] = useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (password: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword/confirm", { password :{password},data : {data} });
      toast.success("Password Reset Successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

 useEffect(() => {
   const urlToken = window.location.search.split("=")[1];
   setToken(urlToken || "");
 }, []);

 useEffect(() => {
   const verifyUserEmail = async () => {
     try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword/check", {
        token,
      });

      if (response.data.success) {
        setValid(true);
        setData(response.data.user);
      }
        
        setToken("")
     } catch (error: any) {
       setError(true);
       console.log(error.response.data);
     }
     finally{
      setLoading(false);
     }
   };

   if (token.length > 0) {
     verifyUserEmail();
   }
 }, [token]);

  return (
    <div className="bg-black text-white h-screen ">
      <div className="flex items-center justify-center isolate px-6 pt-[10%] lg:px-8 ">
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

        {valid && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-black sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4 px-4 sm:px-8 rounded-lg shadow shadow-popover py-8 sm:py-11"
            >
              <h1 className="text-primary text-2xl sm:text-3xl text-center my-4 bg-slate-500 rounded-md py-2">
                {loading ? "Processing" : "Change Password"}
              </h1>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-black"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-blue-400 text-black disabled:opacity-50 hover:bg-blue-300"
                type="submit"
                disabled={loading}
              >
                Submit
              </Button>
              <div className="flex justify-center sm:justify-end text-emerald-50 px-3">
                <Link href="login">Back to Login?</Link>
              </div>
            </form>
          </Form>
        )}
        {error && (
          <div className="space-y-8 bg-black sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4 px-4 sm:px-8 rounded-lg shadow shadow-popover py-8 sm:py-11">
            <h1 className="text-primary text-2xl sm:text-3xl text-center my-4 bg-slate-500 rounded-md py-2">
              Error
            </h1>
            <div className="text-white text-center my-2">
              <p>Invalid Token</p>
              <br />
              <p>Try Again</p>
              <Button
                className="w-[]50%] bg-blue-400 text-black disabled:opacity-50 hover:bg-blue-300 mt-3"
                disabled={loading}
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </div>
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
    </div>
  );
}
