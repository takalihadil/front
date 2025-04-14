"use client";

import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Link from "next/link";

export default function Login() {
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
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.access_token) {
          // Si le token est manquant dans la réponse
          setError("No token received. Please try again.");
          return;
        }

        localStorage.setItem("access_token", data.access_token); // Stocker le token
        window.location.href = "/dashboard"; // Rediriger vers le tableau de bord
      } else {
        // Gérer les erreurs spécifiques du backend
        if (data.message === "Invalid token" || data.message === "Token expired") {
          setError("Authentication failed. Please login again.");
        } else {
          setError(data.message || "An error occurred.");
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome Back</h1>
      <p className="text-gray-600 text-center mb-6">Please login to your account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
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

        <p className="text-right">
          <Link href="/forget-password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </p>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
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