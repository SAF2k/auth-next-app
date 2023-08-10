"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z  from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      toast.success(response.data.message);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      console.log("hello");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-600">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onLogin)}
          className="space-y-8 bg-black sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4 px-4 sm:px-8 rounded-lg shadow-2xl py-8 sm:py-11"
        >
          <h1 className="text-primary text-2xl sm:text-3xl text-center my-4 bg-slate-500 rounded-md py-2">
            {loading ? "Processing" : "Login"}
          </h1>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
          <div className="flex justify-center sm:justify-end text-emerald-50 px-3">
            <Link href="signup">Not a member?</Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

