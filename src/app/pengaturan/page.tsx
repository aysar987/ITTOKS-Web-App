"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/cookies";

export default function PengaturanPage() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  const handleBack = () => router.push("/dashboard");

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
              onClick={handleBack}
            >
              ITTOKS
            </div>
            <h2 style={{ margin: 0, letterSpacing: 4 }}>PENGATURAN</h2>
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
              onClick={() => router.push("/dashboard")}
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
            <div
              className="nav-item"
              onClick={() => router.push("/laporan")}
              style={{ cursor: "pointer" }}
            >
              📈 <div>LAPORAN</div>
            </div>
            <div style={{ flex: 1 }} />
            <div className="nav-item active">
              ⚙️ <div>PENGATURAN</div>
            </div>
          </aside>

          <section className="main-panel">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "360px 1fr 320px",
                gap: 20,
              }}
            >
              {/* Left: profile + bobot */}
              <div>
                <div
                  style={{
                    background: "linear-gradient(90deg,#6b1aa7,#8e2be2)",
                    padding: 18,
                    borderRadius: 18,
                    color: "white",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <img
                      src="/images/avatar.png"
                      alt="profile"
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: 999,
                        border: "6px solid #ff6ad5",
                        background: "white",
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 800 }}>Ganti Foto</div>
                      <div style={{ marginTop: 8, fontSize: 13 }}>
                        Guru
                        <br />
                        Nama : Fitriani Nur Rahmadani
                        <br />
                        Nip : 240004301033
                        <br />
                        Sekolah : SMA Negeri 8 Makassar
                        <br />
                        Email : fnr0312@gmail.com
                        <br />
                        Kata Sandi : ••••••••
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                    padding: 16,
                    borderRadius: 18,
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 12 }}>
                    BOBOT PENILAIAN
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div
                      style={{
                        background: "white",
                        color: "#3b0764",
                        padding: "10px 14px",
                        borderRadius: 999,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>KOGNITIF (%)</div>
                      <div style={{ fontWeight: 700 }}>30</div>
                    </div>
                    <div
                      style={{
                        background: "white",
                        color: "#3b0764",
                        padding: "10px 14px",
                        borderRadius: 999,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>AFEKTIF (%)</div>
                      <div style={{ fontWeight: 700 }}>30</div>
                    </div>
                    <div
                      style={{
                        background: "white",
                        color: "#3b0764",
                        padding: "10px 14px",
                        borderRadius: 999,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>PSIKOMOTOR (%)</div>
                      <div style={{ fontWeight: 700 }}>30</div>
                    </div>
                    <div
                      style={{
                        background: "white",
                        color: "#3b0764",
                        padding: "10px 14px",
                        borderRadius: 999,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontWeight: 800,
                      }}
                    >
                      <div>TOTAL BOBOT</div>
                      <div>100%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: Deskripsi */}
              <div>
                <div
                  style={{
                    background: "linear-gradient(90deg,#7a0fb0,#f43a8b)",
                    padding: 18,
                    borderRadius: 18,
                    color: "white",
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 10 }}>
                    DESKRIPSI
                  </div>
                  <div style={{ display: "grid", gap: 14 }}>
                    <div
                      style={{
                        background: "#ffffff",
                        color: "#111827",
                        padding: 14,
                        borderRadius: 18,
                      }}
                    >
                      <div style={{ fontWeight: 800 }}>TERENDAH</div>
                      <div style={{ marginTop: 8 }}>
                        Ananda Perlu Bimbingan Dalam Memahami Jenis
                        Permainan....
                      </div>
                    </div>
                    <div
                      style={{
                        background: "#ffffff",
                        color: "#111827",
                        padding: 14,
                        borderRadius: 18,
                      }}
                    >
                      <div style={{ fontWeight: 800 }}>TERTINGGI</div>
                      <div style={{ marginTop: 8 }}>
                        Ananda Sangat Baik Dalam Memahami Jenis Permainan....
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 18,
                  }}
                >
                  <button
                    style={{
                      background: "linear-gradient(90deg,#6b1aa7,#8e2be2)",
                      border: "none",
                      color: "white",
                      padding: "12px 28px",
                      borderRadius: 24,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Simpan Pembaharuan
                  </button>
                </div>
              </div>

              {/* Right: small settings list */}
              <div>
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                    padding: 16,
                    borderRadius: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ fontWeight: 800 }}>Pengaturan Cepat</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Edit</div>
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div
                      style={{
                        padding: 10,
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>Ubah Kata Sandi</div>
                      <div>✎</div>
                    </div>
                    <div
                      style={{
                        padding: 10,
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>Zona Waktu & Format Tanggal</div>
                      <div>✎</div>
                    </div>
                    <div
                      style={{
                        padding: 10,
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>Backup Otomatis ke Cloud</div>
                      <div>✎</div>
                    </div>
                    <div
                      style={{
                        padding: 10,
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 12,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>Kelola Perangkat Login</div>
                      <div>✎</div>
                    </div>
                    <div
                      style={{
                        padding: 10,
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>Bahasa :</div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <label
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                          }}
                        >
                          <input type="radio" name="lang" defaultChecked />{" "}
                          Indonesia
                        </label>
                        <label
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                          }}
                        >
                          <input type="radio" name="lang" /> Inggris
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
