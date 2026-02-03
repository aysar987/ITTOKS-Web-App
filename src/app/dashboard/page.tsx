"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { removeToken, getToken } from "@/lib/cookies";

export default function DashboardPage() {
  const router = useRouter();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <main className="dashboard-root">
      <div className="dashboard-card">
        <div
          style={{
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                color: "white",
              }}
            >
              Ittoks
            </div>
            <h2 style={{ margin: 0, letterSpacing: 4 }}>DASHBOARD</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src="/favicon.ico"
                alt="avatar"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  border: "3px solid rgba(255,255,255,0.12)",
                }}
              />
              <div style={{ fontWeight: 600 }}>FITRIANI NUR RAHMADANI</div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: "#ffffff",
                color: "#3b0764",
                padding: "8px 14px",
                borderRadius: 20,
                border: "none",
              }}
            >
              LOG OUT
            </button>
          </div>
        </div>

        <div className="dashboard-inner">
          <aside className="sidebar">
            <div className="nav-item active">
              🏠 <div style={{ fontWeight: 700 }}>DASHBOARD</div>
            </div>
            <div
              className="nav-item"
              onClick={() => router.push("/data-siswa")}
              style={{ cursor: "pointer" }}
            >
              🗂️ <div>DATA SISWA</div>
            </div>
            <div
              className="nav-item"
              onClick={() => router.push("/absensi")}
              style={{ cursor: "pointer" }}
            >
              📋 <div>ABSENSI</div>
            </div>
            <div
              className="nav-item"
              onClick={() => router.push("/penilaian/kognitif")}
              style={{ cursor: "pointer" }}
            >
              🧾 <div>PENILAIAN</div>
            </div>
            <div
              className="nav-item"
              onClick={() => router.push("/laporan")}
              style={{ cursor: "pointer" }}
            >
              📈 <div>LAPORAN</div>
            </div>
            <div style={{ flex: 1 }} />
            <div
              className="nav-item"
              onClick={() => router.push("/pengaturan")}
              style={{ cursor: "pointer" }}
            >
              ⚙️ <div>PENGATURAN</div>
            </div>
          </aside>

          <section className="main-panel">
            <div className="top-row">
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ fontSize: 14, opacity: 0.9 }}>Overview</div>
              </div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>
                Update Terakhir: 27 September 2025, 10:10
              </div>
            </div>

            <div className="metric-grid">
              <div className="metric">
                <h3>TOTAL SISWA</h3>
                <p>0 SISWA</p>
                <div style={{ fontSize: 12, opacity: 0.8 }}>0%</div>
              </div>
              <div className="metric">
                <h3>JUMLAH KELAS</h3>
                <p>0 KELAS</p>
                <div style={{ fontSize: 12, opacity: 0.8 }}>0%</div>
              </div>
              <div className="metric">
                <h3>RATA-RATA NILAI</h3>
                <p>0%</p>
              </div>
            </div>

            <div className="widgets">
              <div className="widget">
                <h4 style={{ marginTop: 0 }}>Grafik Capaian Hasil Belajar</h4>
                <div
                  style={{
                    height: 160,
                    borderRadius: 8,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>
                    Chart placeholder
                  </div>
                </div>
              </div>

              <div className="widget">
                <h4 style={{ marginTop: 0 }}>Distribusi Kelas</h4>
                <div
                  style={{
                    height: 160,
                    borderRadius: 8,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>
                    Pie placeholder
                  </div>
                </div>
              </div>
            </div>

            <div className="update-bar">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  📅
                </span>
                <div>Update Terakhir: 27 September 2025, 10:10</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
