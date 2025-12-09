"use client";
const Input = ({
  error,
  name,
  label,
  value,
  placeholder,
  onChange,
}: {
  error?: string | null;
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <div className="flex flex-row justify-between items-center">
        <label
          htmlFor={`input-${name}`}
          className={`${error ? "text-red-500" : ""}`}
        >
          {label || name}
        </label>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <input
        type="text"
        id={`input-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border px-6 py-3 rounded-md text-black bg-white focus:border-theme-dark-orange transition-all duration-200 ease-in-out focus:outline-none placeholder:text-gray-400 ${
          error ? "border-red-500 border-2" : "border-theme-gray"
        }`}
      />
    </div>
  );
};

export default Input;
