"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/cookies";

export default function PenilaianAfektifPage() {
  const router = useRouter();
  const [date, setDate] = useState("03/12/02");
  const [semester, setSemester] = useState("2");
  const [sum, setSum] = useState("SUM 1");
  const [scores, setScores] = useState([
    {
      aspek: "Sportivitas",
      deskripsi:
        "Menunjukkan sikap jujur dan adil dalam bermain serta menerima...",
      skor: 98,
    },
    {
      aspek: "Disiplin",
      deskripsi:
        "Hadir tepat waktu, mengikuti instruksi guru dengan tertib, dan menyelesaikan...",
      skor: 90,
    },
    {
      aspek: "Kerja Sama",
      deskripsi:
        "Aktif berpartisipasi dalam kelompok, membantu teman, dan menghargai...",
      skor: 95,
    },
  ]);
  const [catatan, setCatatan] = useState("");

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  const handleScoreChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index].skor = value;
    setScores(newScores);
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
            <h2 style={{ margin: 0, letterSpacing: 4 }}>PENILAIAN</h2>
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
            <div className="nav-item active">
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 280px",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 12,
                          marginBottom: 6,
                          fontWeight: 600,
                        }}
                      >
                        Date
                      </div>
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="DD/MM/YY"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 8,
                          color: "white",
                          outline: "none",
                        }}
                      />
                    </div>
                    <button
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        padding: "8px 10px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      🔍
                    </button>
                  </div>
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 12,
                          marginBottom: 6,
                          fontWeight: 600,
                        }}
                      >
                        Semester
                      </div>
                      <input
                        type="text"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        placeholder="2"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 8,
                          color: "white",
                          outline: "none",
                        }}
                      />
                    </div>
                    <button
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        padding: "8px 10px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      🔍
                    </button>
                  </div>
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 12,
                          marginBottom: 6,
                          fontWeight: 600,
                        }}
                      >
                        SUM
                      </div>
                      <input
                        type="text"
                        value={sum}
                        onChange={(e) => setSum(e.target.value)}
                        placeholder="SUM 1"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 8,
                          color: "white",
                          outline: "none",
                        }}
                      />
                    </div>
                    <button
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        padding: "8px 10px",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      🔍
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                  <button
                    onClick={() => router.push("/penilaian/kognitif")}
                    style={{
                      padding: "10px 16px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    📋 Kognitif
                  </button>
                  <button
                    style={{
                      padding: "10px 16px",
                      background: "rgba(200,100,200,0.3)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    💖 Afektif
                  </button>
                  <button
                    onClick={() => router.push("/penilaian/psikomotor")}
                    style={{
                      padding: "10px 16px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    🏃 Psikomotor
                  </button>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 16,
                  }}
                >
                  <h3 style={{ margin: "0 0 8px 0" }}>AFEKTIF</h3>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: 12,
                    }}
                  >
                    TP: 1.Menunjukkan rasa hormat terhadap teman dan guru selama
                    kegiatan pembelajaran PJOK.
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <div
                      style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}
                    >
                      Materi/Aktivitas:
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <span>📎</span>
                      <span>Permainan Bola Besar (Bola Basket)</span>
                    </div>
                  </div>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 12,
                      marginBottom: 12,
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <th
                          style={{
                            padding: "8px",
                            textAlign: "left",
                            fontWeight: 700,
                          }}
                        >
                          Aspek
                        </th>
                        <th
                          style={{
                            padding: "8px",
                            textAlign: "left",
                            fontWeight: 700,
                          }}
                        >
                          Deskripsi
                        </th>
                        <th
                          style={{
                            padding: "8px",
                            textAlign: "right",
                            fontWeight: 700,
                            minWidth: 80,
                          }}
                        >
                          Skor (0-100)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.map((row, idx) => (
                        <tr
                          key={idx}
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <td style={{ padding: "8px" }}>{row.aspek}</td>
                          <td style={{ padding: "8px", fontSize: 11 }}>
                            {row.deskripsi}
                          </td>
                          <td style={{ padding: "8px", textAlign: "right" }}>
                            <input
                              type="number"
                              value={row.skor}
                              onChange={(e) =>
                                handleScoreChange(idx, parseInt(e.target.value))
                              }
                              style={{
                                width: 60,
                                padding: "4px 6px",
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: 4,
                                color: "white",
                                outline: "none",
                                textAlign: "right",
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      +
                    </button>
                    <button
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      +
                    </button>
                    <button
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 18,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    style={{
                      flex: 1,
                      background: "linear-gradient(90deg,#6b1aa7,#8e2be2)",
                      border: "none",
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Simpan
                  </button>
                  <button
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Reset
                  </button>
                  <button
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Kembali ke Daftar
                  </button>
                </div>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  padding: 16,
                  height: "fit-content",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #ffa500, #ff6b6b)",
                      margin: "0 auto 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 28,
                    }}
                  >
                    AY
                  </div>
                  <h4 style={{ margin: "8px 0" }}>Ainul Yaqin</h4>
                  <p style={{ margin: "4px 0", fontSize: 12, opacity: 0.8 }}>
                    X-1
                  </p>
                  <p style={{ margin: "4px 0", fontSize: 12, opacity: 0.8 }}>
                    NIS/NISN 00100111
                  </p>
                  <button
                    style={{
                      marginTop: 12,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    + Edit
                  </button>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{ fontSize: 12, marginBottom: 6, fontWeight: 600 }}
                  >
                    Upload Bukti
                  </div>
                  <input
                    type="file"
                    style={{
                      width: "100%",
                      padding: "8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "white",
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{ fontSize: 12, marginBottom: 6, fontWeight: 600 }}
                  >
                    Catatan Guru
                  </div>
                  <textarea
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Masukkan catatan..."
                    style={{
                      width: "100%",
                      minHeight: 100,
                      padding: "8px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "white",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <button
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg,#6b1aa7,#8e2be2)",
                      border: "none",
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Simpan
                  </button>
                  <button
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Reset
                  </button>
                  <button
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Kembali ke Daftar
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
