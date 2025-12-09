"use client";

import { useState } from "react";
import { z } from "zod";
import Input from "../_components/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof LoginFormData];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate form data
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof LoginFormData;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }
    try {
      await LogIn(formData.email, formData.password);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center md:justify-between items-center bg-custom-gray gap-5 px-12 lg:px-24 py-6 mx-auto">
      <div className="flex-1  h-full flex flex-col gap-2 justify-center px-6 py-6  rounded-md shadow-2xl/5 text-white max-w-[450px] bg-black/20 min-h-[73dvh]">
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-normal text-white">
            Welcome back to <span className="text-custom-orange">Tour</span>Rify
          </h1>
          <p className="text-sm text-gray-300/90">
            Your journey continues here
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <Input
            label="Email"
            placeholder="Input your email here..."
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            placeholder="Input your password here..."
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button
            size="lg"
            disabled={isLoading}
            className="w-full mt-4 bg-custom-orange-dark hover:bg-custom-orange text-white cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <div className="flex justify-center gap-1 text-sm text-gray-300/90 mt-2">
          <p>Don&apos;t have an account?</p>
          <Link
            href="/signup"
            className="text-theme-dark-orange font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className="relative flex-1 hidden md:flex items-center justify-center min-h-[73dvh] rounded-md overflow-hidden shadow-2xl/5 bg-black/20">
        <div className="relative w-full max-w-[90%]">
          <div className="bg-gradient-to-br from-custom-orange/20 to-custom-orange/5 rounded-2xl p-8 border border-custom-orange/20 backdrop-blur-sm">
            <div className="bg-[#0f0f0f] rounded-lg p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                <div className="mt-6 p-4 bg-custom-orange/10 border-2 border-custom-orange rounded-lg">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-800 rounded w-full"></div>
                      <div className="h-3 bg-gray-800 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-custom-orange/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-custom-orange/20 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
