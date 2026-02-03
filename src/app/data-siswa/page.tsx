"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/cookies";

const mockStudents = [
  { no: 1, nis: "00100111", nama: "Ainul Yaqin", lp: "L", kelas: "X-1" },
  { no: 2, nis: "00100112", nama: "Nur Najemunnisa", lp: "P", kelas: "X-1" },
  {
    no: 3,
    nis: "00100113",
    nama: "Nur Azizah Mayasari",
    lp: "P",
    kelas: "X-1",
  },
  { no: 4, nis: "00100114", nama: "Hastomo Putra", lp: "L", kelas: "X-1" },
  { no: 5, nis: "00100115", nama: "Alif Al Amin", lp: "L", kelas: "X-1" },
];

export default function DataSiswaPage() {
  const router = useRouter();
  const [kelas, setKelas] = useState("");
  const [kelasSearch, setKelasSearch] = useState("");
  const [semester, setSemester] = useState("");

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <main className="dashboard-root">
      <div className="dashboard-card">
        {/* Header */}
        <div
          style={{
            marginBottom: 16,
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
                cursor: "pointer",
              }}
              onClick={handleBackToDashboard}
            >
              ITTOKS
            </div>
            <h2 style={{ margin: 0, letterSpacing: 4 }}>DATA SISWA</h2>
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
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="nav-item" onClick={handleBackToDashboard}>
              🏠 <div style={{ fontWeight: 700 }}>DASHBOARD</div>
            </div>
            <div className="nav-item active">
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

          {/* Main Content */}
          <section className="main-panel">
            {/* Filter Row 1 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 120px",
                gap: 6,
                marginBottom: 8,
              }}
            >
              <div>
                <div style={{ fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                  Kelas
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <input
                    type="text"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    placeholder="X"
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "white",
                      outline: "none",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    :
                  </span>
                  <input
                    type="text"
                    value={kelasSearch}
                    onChange={(e) => setKelasSearch(e.target.value)}
                    placeholder="X-1"
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "white",
                      outline: "none",
                    }}
                  />
                  <button
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                  T.A / Semester
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="2024/2025 - 1"
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "white",
                      outline: "none",
                    }}
                  />
                  <button
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "6px 8px",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                <button
                  style={{
                    flex: 1,
                    background: "linear-gradient(90deg,#6b1aa7,#8e2be2)",
                    border: "none",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  + Tambah Siswa
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflow: "auto", marginBottom: 10 }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                  minWidth: 700,
                }}
              >
                <thead>
                  <tr
                    style={{ borderBottom: "2px solid rgba(255,255,255,0.12)" }}
                  >
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 40,
                      }}
                    >
                      No
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 100,
                      }}
                    >
                      NIS/NISN
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 140,
                      }}
                    >
                      Nama
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 40,
                      }}
                    >
                      L/P
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 70,
                      }}
                    >
                      Kelas
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 50,
                      }}
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map((student) => (
                    <tr
                      key={student.no}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <td style={{ padding: "12px 8px" }}>{student.no}</td>
                      <td style={{ padding: "12px 8px" }}>{student.nis}</td>
                      <td style={{ padding: "12px 8px" }}>{student.nama}</td>
                      <td style={{ padding: "12px 8px" }}>{student.lp}</td>
                      <td style={{ padding: "12px 8px" }}>{student.kelas}</td>
                      <td style={{ padding: "12px 8px" }}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontSize: 16,
                          }}
                        >
                          ✏️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Refresh Button */}
            <div style={{ marginTop: 8 }}>
              <button
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 20,
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                🔄 Refresh Data
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
