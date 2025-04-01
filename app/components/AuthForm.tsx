import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string, username?: string) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-black">
      <div className="w-lg max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center dark:text-white">
          {type === "login" ? "Login" : "Register"}
        </h2>

        {/* Username Field (Only for Register) */}
        {type === "register" && (
          <div className="mt-4">
            <label className="block text-gray-600 font-semibold dark:text-white">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        {/* Email Field */}
        <div className="mt-4">
          <label className="block text-gray-600 font-semibold dark:text-white">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 mt-2 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mt-4 relative">
          <label className="block text-gray-600 font-semibold dark:text-white">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-3 mt-2 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-12 text-gray-500 dark:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => onSubmit(email, password, username)}
          className="w-full px-4 py-3 mt-6 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {type === "login" ? "Login" : "Register"}
        </button>

        {/* Link to Switch Between Login & Register */}
        <p className="mt-4 text-center font-semibold text-gray-600 dark:text-white">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            href={type === "login" ? "/register" : "/login"}
            className="text-blue-500 ml-1"
          >
            {type === "login" ? "Sign up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
}
