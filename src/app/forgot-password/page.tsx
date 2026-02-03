"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Masukkan email Anda");
      return;
    }

    setLoading(true);
    // Demo front-end only: replace with API call when ready
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);

    setSubmitted(true);
    toast.success("Link reset password telah dikirim ke email Anda");
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-left">
          <header style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 36, margin: 0, color: "#3b0764" }}>
              Forgot Password
            </h1>
          </header>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>
                Masukkan email Anda dan kami akan mengirimkan link untuk mereset
                password.
              </p>

              <label style={{ display: "block", marginBottom: 8 }}>
                Email Address
              </label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@contoh.com"
                aria-label="email"
              />

              <div style={{ marginTop: 22, marginBottom: 14 }}>
                <button
                  className="btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Mengirim..." : "Send Reset Link"}
                </button>
              </div>

              <div style={{ marginTop: 8 }}>
                <a href="/login" className="muted-link">
                  Back to Log in
                </a>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h2 style={{ fontSize: 24, color: "#3b0764", marginBottom: 12 }}>
                Email Sent!
              </h2>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>
                Kami telah mengirimkan link reset password ke{" "}
                <strong>{email}</strong>. Silakan cek email Anda.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="btn-primary"
                style={{ marginTop: 20 }}
              >
                Back to Log in
              </button>
            </div>
          )}
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
