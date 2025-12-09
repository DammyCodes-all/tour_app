"use client";

import { useState } from "react";
import { z } from "zod";
import Input from "../_components/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LogIn } from "../actions";
import { useRouter } from "next/navigation";
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
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-center md:justify-between items-center bg-custom-gray gap-5 px-12 py-6">
      <div className="flex-1  h-full flex flex-col gap-2 justify-center px-6 py-6 border border-custom-orange/50 rounded-md shadow-2xl/5 text-white max-w-[450px] bg-custom-gray">
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
      <div className="relative flex-1 hidden md:block min-h-[73dvh] rounded-md overflow-hidden shadow-2xl/5">
        <Image
          fill
          src="/images/auth-img.png"
          alt="Login Illustration"
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
};

export default LoginPage;
