"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/cookies";

const mockData = [
  {
    no: 1,
    noInduk: "00100111",
    nama: "Ainul Yaqin",
    lp: "L",
    sum1: 90,
    sum2: 92,
    sum3: 95,
    sum4: 90,
    sum5: 90,
    sum6: 95,
    rataSUM: "?",
    sumatifAkhir: "?",
    nilaiRapor: "?",
    predikat: "?",
    deskripsi: "?",
  },
  {
    no: 2,
    noInduk: "00100112",
    nama: "Nur Najemunnisa",
    lp: "P",
    sum1: 88,
    sum2: 85,
    sum3: 90,
    sum4: 85,
    sum5: 88,
    sum6: 90,
    rataSUM: "?",
    sumatifAkhir: "?",
    nilaiRapor: "?",
    predikat: "?",
    deskripsi: "?",
  },
  {
    no: 3,
    noInduk: "00100113",
    nama: "Nur Azizah",
    lp: "P",
    sum1: 88,
    sum2: 85,
    sum3: 90,
    sum4: 85,
    sum5: 88,
    sum6: 90,
    rataSUM: "?",
    sumatifAkhir: "?",
    nilaiRapor: "?",
    predikat: "?",
    deskripsi: "?",
  },
  {
    no: 4,
    noInduk: "00100114",
    nama: "Hastomo Putra",
    lp: "L",
    sum1: 90,
    sum2: 95,
    sum3: 95,
    sum4: 91,
    sum5: 88,
    sum6: 90,
    rataSUM: "?",
    sumatifAkhir: "?",
    nilaiRapor: "?",
    predikat: "?",
    deskripsi: "?",
  },
  {
    no: 5,
    noInduk: "00100115",
    nama: "Alif Al Amin",
    lp: "L",
    sum1: 90,
    sum2: 90,
    sum3: 95,
    sum4: 90,
    sum5: 90,
    sum6: 91,
    rataSUM: "?",
    sumatifAkhir: "?",
    nilaiRapor: "?",
    predikat: "?",
    deskripsi: "?",
  },
];

export default function LaporanPage() {
  const router = useRouter();
  const [kelas, setKelas] = useState("X");
  const [kelasDetail, setKelasDetail] = useState("X-1");
  const [semester, setSemester] = useState("Ganjil");
  const [ta, setTA] = useState("2025-2026");
  const [ranah, setRanah] = useState("Semua");

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
            <h2 style={{ margin: 0, letterSpacing: 4 }}>LAPORAN</h2>
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
            <div className="nav-item active">
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: 8,
                marginBottom: 10,
                alignItems: "flex-end",
              }}
            >
              <div>
                <div style={{ fontSize: 10, marginBottom: 3, fontWeight: 600 }}>
                  Kelas
                </div>
                <div style={{ display: "flex", gap: 3 }}>
                  <input
                    type="text"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    placeholder="X"
                    style={{
                      flex: 1,
                      padding: "4px 6px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 6,
                      color: "white",
                      outline: "none",
                      fontSize: 10,
                    }}
                  />
                  <button
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "4px 6px",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 11,
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, marginBottom: 3, fontWeight: 600 }}>
                  Semester / T.A
                </div>
                <div style={{ display: "flex", gap: 3 }}>
                  <input
                    type="text"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Ganjil"
                    style={{
                      flex: 1,
                      padding: "4px 6px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 6,
                      color: "white",
                      outline: "none",
                      fontSize: 10,
                    }}
                  />
                  <input
                    type="text"
                    value={ta}
                    onChange={(e) => setTA(e.target.value)}
                    placeholder="2025-2026"
                    style={{
                      flex: 1,
                      padding: "4px 6px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 6,
                      color: "white",
                      outline: "none",
                      fontSize: 10,
                    }}
                  />
                  <button
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "4px 6px",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 11,
                    }}
                  >
                    🔍
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, marginBottom: 3, fontWeight: 600 }}>
                  Ranah
                </div>
                <div style={{ display: "flex", gap: 3 }}>
                  <input
                    type="text"
                    value={ranah}
                    onChange={(e) => setRanah(e.target.value)}
                    placeholder="Semua"
                    style={{
                      flex: 1,
                      padding: "4px 6px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 6,
                      color: "white",
                      outline: "none",
                      fontSize: 10,
                    }}
                  />
                  <button
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "4px 6px",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 11,
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
                  padding: "6px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 10,
                }}
              >
                ⬇️ Ekspor
              </button>
            </div>

            <div style={{ overflow: "auto", marginBottom: 16 }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 12,
                  minWidth: 900,
                }}
              >
                <thead>
                  <tr
                    style={{ borderBottom: "2px solid rgba(255,255,255,0.12)" }}
                  >
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "left",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 35,
                      }}
                    >
                      NO
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "left",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 90,
                      }}
                    >
                      NO INDUK
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "left",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 130,
                      }}
                    >
                      NAMA
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 35,
                      }}
                    >
                      L/P
                    </th>
                    <th
                      colSpan={6}
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(200, 100, 200, 0.2)",
                        color: "#ffb3ff",
                      }}
                    >
                      SUMATIF LINGKUP MATERI
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 60,
                      }}
                    >
                      RATA SUM
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 80,
                      }}
                    >
                      SUMATIF AKHIR
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 80,
                      }}
                    >
                      NILAI RAPOR
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 65,
                      }}
                    >
                      PREDIKAT
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(255,255,255,0.04)",
                        minWidth: 90,
                      }}
                    >
                      Deskripsi
                    </th>
                  </tr>
                  <tr
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    <th colSpan={4}></th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(200, 100, 200, 0.15)",
                        fontSize: 11,
                        minWidth: 45,
                      }}
                    >
                      SUM1
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(200, 100, 200, 0.15)",
                        fontSize: 11,
                        minWidth: 45,
                      }}
                    >
                      SUM2
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(200, 100, 200, 0.15)",
                        fontSize: 11,
                        minWidth: 45,
                      }}
                    >
                      SUM3
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(200, 100, 200, 0.15)",
                        fontSize: 11,
                        minWidth: 45,
                      }}
                    >
                      SUM4
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(200, 100, 200, 0.15)",
                        fontSize: 11,
                        minWidth: 45,
                      }}
                    >
                      SUM5
                    </th>
                    <th
                      style={{
                        padding: "8px 6px",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "rgba(200, 100, 200, 0.15)",
                        fontSize: 11,
                        minWidth: 45,
                      }}
                    >
                      SUM6
                    </th>
                    <th colSpan={5}></th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((row) => (
                    <tr
                      key={row.no}
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <td style={{ padding: "8px 6px" }}>{row.no}</td>
                      <td
                        style={{
                          padding: "8px 6px",
                          background: "rgba(255,255,255,0.02)",
                        }}
                      >
                        {row.noInduk}
                      </td>
                      <td style={{ padding: "8px 6px" }}>{row.nama}</td>
                      <td style={{ padding: "8px 6px", textAlign: "center" }}>
                        {row.lp}
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          textAlign: "center",
                          background: "rgba(200, 100, 200, 0.08)",
                        }}
                      >
                        {row.sum1}
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          textAlign: "center",
                          background: "rgba(200, 100, 200, 0.08)",
                        }}
                      >
                        {row.sum2}
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          textAlign: "center",
                          background: "rgba(200, 100, 200, 0.08)",
                        }}
                      >
                        {row.sum3}
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          textAlign: "center",
                          background: "rgba(200, 100, 200, 0.08)",
                        }}
                      >
                        {row.sum4}
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          textAlign: "center",
                          background: "rgba(200, 100, 200, 0.08)",
                        }}
                      >
                        {row.sum5}
                      </td>
                      <td
                        style={{
                          padding: "8px 6px",
                          textAlign: "center",
                          background: "rgba(200, 100, 200, 0.08)",
                        }}
                      >
                        {row.sum6}
                      </td>
                      <td style={{ padding: "8px 6px", textAlign: "center" }}>
                        {row.rataSUM}
                      </td>
                      <td style={{ padding: "8px 6px", textAlign: "center" }}>
                        {row.sumatifAkhir}
                      </td>
                      <td style={{ padding: "8px 6px", textAlign: "center" }}>
                        {row.nilaiRapor}
                      </td>
                      <td style={{ padding: "8px 6px", textAlign: "center" }}>
                        {row.predikat}
                      </td>
                      <td style={{ padding: "8px 6px", textAlign: "center" }}>
                        {row.deskripsi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
          </section>
        </div>
      </div>
    </main>
  );
}
