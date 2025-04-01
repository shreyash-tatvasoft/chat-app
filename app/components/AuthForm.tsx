"use client"
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string, username?: string) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [formState, setFormState] = useState({
     username : "",
     email : "",
     password : "",
  })
  const [formStateEror, setFormStateError] = useState({
    username : false,
    email : false,
    password : false,
 })
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    if (value.trim() === "") {
      setFormStateError((prev) => ({
        ...prev,
        [name]: true,
      }));
    } else {
      setFormStateError((prev) => ({
        ...prev,
        [name]: false,
      }));
    }

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleAllValidation = () => {
    let allErrorChecks = {
      username: false,
      email: false,
      password: false,
    }

    const { email, password, username} = formState

    if (email.trim() === "") {
      allErrorChecks.email = true;
    }
    if (password.trim() === "") {
      allErrorChecks.password = true;
    }
    if (type === "register" && username.trim() === "") {
      allErrorChecks.username = true;
    }

    setFormStateError(allErrorChecks)

    return Object.values(allErrorChecks).every((value) => value === false);

  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    if (!handleAllValidation()) {
      return false;
    }

    console.log("first", formState)
    
    onSubmit(formState.email, formState.password, formState.username)
  }

  const renderErrorMsg = (errorMsg: string) => {
    return (
      <div className="font-semibold text-red-500 dark:text-orange-600">{errorMsg}</div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-black">
      <div className="w-lg max-w-2xl p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center dark:text-white">
          {type === "login" ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
        {/* Username Field (Only for Register) */}
        {type === "register" && (
          <div className="mt-4">
            <label className="block text-gray-600 font-semibold dark:text-white">Username*</label>
            <input
              type="text"
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              name={"username"}
              value={formState.username}
              onChange={handleInputChange}
            />
            {formStateEror.username && renderErrorMsg("Please enter username*")}
          </div>
        )}

        {/* Email Field */}
        <div className="mt-4">
          <label className="block text-gray-600 font-semibold dark:text-white">Email*</label>
          <input
            type="email"
            className="w-full px-4 py-3 mt-2 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={formState.email}
            name="email"
            onChange={handleInputChange}
          />
          {formStateEror.email && renderErrorMsg("Please enter email address*")}
        </div>

        {/* Password Field */}
        <div className="mt-4 relative">
          <label className="block text-gray-600 font-semibold dark:text-white">Password*</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-3 mt-2 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            name={"password"}
            value={formState.password}
            onChange={handleInputChange}
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
          {formStateEror.password && renderErrorMsg("Please enter password*")}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-3 mt-6 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {type === "login" ? "Login" : "Register"}
        </button>

        </form>

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
