"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { setToken } from "@/lib/cookies";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error("Masukkan username dan password");
      return;
    }
    setLoading(true);
    // Demo auth delay
    await new Promise((r) => setTimeout(r, 600));

    const ok =
      (identifier === "admin" ||
        identifier === "guru" ||
        identifier === "user") &&
      password === "password";
    if (!ok) {
      toast.error("Username atau password salah");
      setLoading(false);
      return;
    }

    setToken("demo-token-123");
    toast.success("Login berhasil");
    router.push("/dashboard");
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-left">
          <header style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 36, margin: 0, color: "#3b0764" }}>
              Log in
            </h1>
          </header>

          <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
            <label style={{ display: "block", marginBottom: 8 }}>
              Username / Email
            </label>
            <input
              className="form-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Username"
              aria-label="username"
            />

            <div style={{ height: 12 }} />

            <label style={{ display: "block", marginBottom: 8 }}>
              Password
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#3b0764",
                }}
              >
                {showPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
              </button>
            </div>

            <div style={{ marginTop: 20, marginBottom: 18 }}>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Memproses..." : "Log in"}
              </button>
            </div>

            <div
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <a href="/" className="muted-link">
                Sign up
              </a>
              <a href="/forgot-password" className="muted-link">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>

        <div className="login-right">
          <div style={{ textAlign: "center" }}>
            <span className="logo-circle" />
            <h3 style={{ margin: 0 }}>INNOVATION TECHNOLOGY</h3>
            <p
              style={{
                opacity: 0.95,
                marginTop: 10,
                fontSize: 14,
                lineHeight: 1.3,
              }}
            >
              TEACHER OPTIMIZATION IN KNOWLEDGE SCORING
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
