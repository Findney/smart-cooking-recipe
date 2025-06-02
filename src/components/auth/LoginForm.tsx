"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/auth";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);

    if (result.status === "success") {
      router.push("/");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            required
            className="mt-1 w-full px-4 py-2 h-10 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            id="password"
            required
            className="mt-1 w-full px-4 py-2 h-10 rounded-md border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mt-4">
          <AuthButton type="login" loading={loading} />
        </div>

        {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
