"use client";

import { useState } from "react";
import Login from "@/components/auth/login/page";
import Register from "@/components/auth/register/page";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Onglets pour basculer entre Login et Signup */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === "signup"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Afficher le composant Login ou Register */}
        {activeTab === "login" ? (
          <Login />
        ) : (
          <Register onSuccess={() => setActiveTab("login")} />
        )}
      </div>
    </div>
  );
}