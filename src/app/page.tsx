"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Semua field wajib diisi");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi tidak cocok");
      return;
    }

    setLoading(true);
    // Demo front-end only: replace with API call when ready
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Akun berhasil dibuat. Silakan login.");
    router.push("/login");
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-left">
          <header style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 36, margin: 0, color: "#3b0764" }}>
              Sign up
            </h1>
          </header>

          <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
            <label style={{ display: "block", marginBottom: 8 }}>
              Full Name
            </label>
            <input
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nama lengkap"
              aria-label="full-name"
            />

            <div style={{ height: 12 }} />

            <label style={{ display: "block", marginBottom: 8 }}>
              Email Address
            </label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              type="email"
              aria-label="email"
            />

            <div style={{ height: 12 }} />

            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
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
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: 8 }}>
                  Confirm Password
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
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    aria-label="confirm-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    {showConfirmPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 22, marginBottom: 14 }}>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Memproses..." : "Create Account"}
              </button>
            </div>

            <div style={{ marginTop: 8 }}>
              <a href="/login" className="muted-link">
                Log in
              </a>
            </div>
          </form>
        </div>

        <div className="login-right">
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 140,
                height: 140,
                borderRadius: 999,
                border: "6px solid rgba(255,255,255,0.18)",
                margin: "0 auto 20px",
              }}
            />
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
