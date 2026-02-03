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

export default function AbsensiPage() {
  const router = useRouter();
  const [kelas, setKelas] = useState("");
  const [kelasSearch, setKelasSearch] = useState("");
  const [date, setDate] = useState("03/12/26");
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
            <h2 style={{ margin: 0, letterSpacing: 4 }}>ABSENSI</h2>
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
            <div
              className="nav-item"
              onClick={handleBackToDashboard}
              style={{ cursor: "pointer" }}
            >
              🏠 <div style={{ fontWeight: 700 }}>DASHBOARD</div>
            </div>
            <div
              className="nav-item"
              onClick={() => router.push("/data-siswa")}
              style={{ cursor: "pointer" }}
            >
              🗂️ <div>DATA SISWA</div>
            </div>
            <div className="nav-item active">
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
            {/* Filter Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: 10,
                marginBottom: 12,
                alignItems: "flex-end",
              }}
            >
              <div>
                <div style={{ fontSize: 11, marginBottom: 4, fontWeight: 600 }}>
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
                      fontSize: 11,
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 12,
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
                      fontSize: 11,
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
                      fontSize: 12,
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, marginBottom: 4, fontWeight: 600 }}>
                  Date
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="DD/MM/YY"
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "white",
                      outline: "none",
                      fontSize: 11,
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
                      fontSize: 12,
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, marginBottom: 4, fontWeight: 600 }}>
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
                      fontSize: 11,
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
                      fontSize: 12,
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>

              <button
                style={{
                  background: "linear-gradient(90deg,#6b1aa7,#8e2be2)",
                  border: "none",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 11,
                }}
              >
                + Absensi
              </button>
            </div>

            {/* Table */}
            <div style={{ overflow: "auto", marginBottom: 20 }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr
                    style={{ borderBottom: "2px solid rgba(255,255,255,0.12)" }}
                  >
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 40,
                      }}
                    >
                      No
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 100,
                      }}
                    >
                      NIS/NISN
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 150,
                      }}
                    >
                      Nama
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 50,
                      }}
                    >
                      L/P
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: 700,
                        minWidth: 70,
                      }}
                    >
                      Kelas
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: 700,
                        minWidth: 50,
                      }}
                    >
                      H
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: 700,
                        minWidth: 50,
                      }}
                    >
                      A
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: 700,
                        minWidth: 50,
                      }}
                    >
                      I
                    </th>
                    <th
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        fontWeight: 700,
                        minWidth: 50,
                      }}
                    >
                      S
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
                      <td style={{ padding: "12px" }}>{student.no}</td>
                      <td style={{ padding: "12px" }}>{student.nis}</td>
                      <td style={{ padding: "12px" }}>{student.nama}</td>
                      <td style={{ padding: "12px" }}>{student.lp}</td>
                      <td style={{ padding: "12px" }}>{student.kelas}</td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontSize: 18,
                          }}
                        >
                          ✏️
                        </button>
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontSize: 18,
                          }}
                        >
                          ✏️
                        </button>
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontSize: 18,
                          }}
                        >
                          ✏️
                        </button>
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontSize: 18,
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
            <div style={{ marginTop: 16 }}>
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
