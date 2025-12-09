"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  error,
  name,
  label,
  value,
  placeholder,
  onChange,
  type = "text",
}: {
  error?: string | null;
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <div className="flex flex-row justify-between items-center">
        <label
          htmlFor={`input-${name}`}
          className={`font-semibold tracking-[1.1px]${
            error ? "text-red-500" : ""
          }`}
        >
          {label || name}
        </label>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="relative">
        <input
          type={inputType}
          id={`input-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border px-6 py-3 rounded-md text-white bg-custom-gray focus:border-theme-dark-orange transition-all duration-200 ease-in-out focus:outline-none placeholder:text-gray-400 [&:-webkit-autofill]:transition-all [&:-webkit-autofill]:duration-[9999s] [&:-webkit-autofill]:[-webkit-text-fill-color:white] ${
            error ? "border-red-500 border-2" : "border-custom-orange-dark"
          } ${type === "password" ? "pr-12" : ""}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
