"use client";

import { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function Register({ onSuccess }: { onSuccess: () => void }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          onSuccess(); // Appeler la fonction de rappel pour basculer vers l'onglet Login
        }, 2000);
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Create an Account</h1>
      <p className="text-gray-600 text-center mb-6">Sign up to get started</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <AiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {passwordVisible ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg flex items-center gap-2">
          <span>❌</span>
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-600 rounded-lg flex items-center gap-2">
          <span>✅</span>
          <p>{success}</p>
        </div>
      )}
    </div>
  );
}