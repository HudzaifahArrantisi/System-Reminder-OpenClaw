import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "◈",
    title: "Manajemen Kelas",
    desc: "Kelola mata kuliah dan pertemuan dalam satu platform terpadu yang intuitif.",
  },
  {
    icon: "◉",
    title: "Tugas & Deadline",
    desc: "Dosen buat tugas, mahasiswa kumpulkan tepat waktu dengan tracking real-time.",
  },
  {
    icon: "◎",
    title: "Reminder Otomatis",
    desc: "Notifikasi H-3, H-1, dan H0 otomatis via Telegram agar tak ada deadline terlewat.",
  },
  {
    icon: "◍",
    title: "Portal Dual Role",
    desc: "Antarmuka terpisah untuk Dosen dan Mahasiswa, masing-masing dengan fitur yang tepat.",
  },
];

const stats = [
  { val: "16", label: "Pertemuan / Matkul" },
  { val: "2x", label: "Role (Dosen & Mahasiswa)" },
  { val: "H0", label: "Deadline Tracking" },
  { val: "∞", label: "Mata Kuliah" },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="lp-root">
      {/* ── NAVBAR ── */}
      <nav className={`lp-nav ${scrolled ? "lp-nav--solid" : ""}`}>
        <div className="lp-nav__inner">
          <span className="lp-logo">
            <span className="lp-logo__mark">⬡</span>
            <span className="lp-logo__text">OpenClaw</span>
          </span>

          {/* Desktop menu */}
          <ul className="lp-nav__links">
            <li><a href="#features">Fitur</a></li>
            <li><a href="#about">Tentang</a></li>
          </ul>

          <Link to="/login" className="lp-btn lp-btn--outline">
            Masuk
          </Link>

          {/* Mobile hamburger */}
          <button className="lp-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="lp-mobile-menu">
            <a href="#features" onClick={() => setMenuOpen(false)}>Fitur</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Tentang</a>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Masuk →</Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero" ref={heroRef}>
        <div className="lp-hero__bg-grid" aria-hidden />
        <div className="lp-hero__blob lp-hero__blob--1" aria-hidden />
        <div className="lp-hero__blob lp-hero__blob--2" aria-hidden />

        <div className="lp-hero__content">
          <span className="lp-badge">Platform E-Learning · Universitas</span>
          <h1 className="lp-hero__title">
            Belajar Lebih<br />
            <em>Terstruktur.</em>
          </h1>
          <p className="lp-hero__sub">
            OpenClaw menghubungkan dosen dan mahasiswa dalam satu ekosistem akademik —
            dari manajemen kelas hingga pengumpulan tugas, semua dalam satu platform.
          </p>
          <div className="lp-hero__cta">
            <Link to="/login" className="lp-btn lp-btn--primary">
              Mulai Sekarang
              <span className="lp-btn__arrow">→</span>
            </Link>
            <a href="#features" className="lp-btn lp-btn--ghost">
              Lihat Fitur
            </a>
          </div>

          {/* Stats Row */}
          <div className="lp-stats">
            {stats.map((s) => (
              <div key={s.label} className="lp-stat">
                <span className="lp-stat__val">{s.val}</span>
                <span className="lp-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero illustration */}
        <div className="lp-hero__visual" aria-hidden>
          <div className="lp-mockup">
            <div className="lp-mockup__bar">
              <span /><span /><span />
            </div>
            <div className="lp-mockup__body">
              <div className="lp-mockup__sidebar">
                <div className="lp-mockup__logo-dot" />
                {[1,2,3,4].map(i => (
                  <div key={i} className="lp-mockup__nav-item" style={{ width: `${60 + i * 5}%`, opacity: i === 1 ? 1 : 0.4 }} />
                ))}
              </div>
              <div className="lp-mockup__main">
                <div className="lp-mockup__header-row">
                  <div className="lp-mockup__heading" />
                  <div className="lp-mockup__badge" />
                </div>
                <div className="lp-mockup__cards">
                  {[0,1,2].map(i => (
                    <div key={i} className="lp-mockup__card" style={{ animationDelay: `${i * 0.2}s` }}>
                      <div className="lp-mockup__card-icon" />
                      <div className="lp-mockup__card-lines">
                        <div className="lp-mockup__card-line" style={{ width: "70%" }} />
                        <div className="lp-mockup__card-line" style={{ width: "50%" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lp-mockup__list">
                  {[80,65,90,55].map((w, i) => (
                    <div key={i} className="lp-mockup__list-row">
                      <div className="lp-mockup__list-dot" />
                      <div className="lp-mockup__list-bar" style={{ width: `${w}%` }} />
                      <div className="lp-mockup__list-tag" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-section" id="features">
        <div className="lp-section__inner">
          <div className="lp-section__label">Fitur Platform</div>
          <h2 className="lp-section__title">
            Semua yang kamu butuhkan,<br />di satu tempat.
          </h2>
          <p className="lp-section__sub">
            Dirancang untuk dosen yang ingin mengelola kelas dengan efisien
            dan mahasiswa yang ingin fokus pada belajar.
          </p>

          <div className="lp-features">
            {features.map((f, i) => (
              <div key={f.title} className="lp-feature" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="lp-feature__icon">{f.icon}</span>
                <h3 className="lp-feature__title">{f.title}</h3>
                <p className="lp-feature__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="lp-section lp-section--alt" id="about">
        <div className="lp-section__inner lp-about">
          <div className="lp-about__text">
            <div className="lp-section__label">Tentang Platform</div>
            <h2 className="lp-section__title lp-section__title--left">
              Dibangun untuk<br />ekosistem akademik<br />modern.
            </h2>
            <p className="lp-section__sub lp-section__sub--left">
              OpenClaw adalah platform e-learning yang menghubungkan dosen dan mahasiswa
              secara langsung. Dibuat dengan React, Golang, dan PostgreSQL — ringan, cepat, dan andal.
            </p>
            <ul className="lp-about__list">
              <li>✦ Reminder otomatis via Telegram (H-3, H-1, H0)</li>
              <li>✦ Role-based access: Dosen & Mahasiswa</li>
              <li>✦ Upload & kelola tugas per pertemuan</li>
              <li>✦ Dashboard real-time untuk tracking progress</li>
            </ul>
            <Link to="/login" className="lp-btn lp-btn--primary lp-btn--sm">
              Masuk ke Platform →
            </Link>
          </div>
          <div className="lp-about__visual">
            <div className="lp-about__card lp-about__card--1">
              <span className="lp-about__card-icon">◈</span>
              <div>
                <p className="lp-about__card-title">Pertemuan 7</p>
                <p className="lp-about__card-sub">Pemrograman Web · 3 tugas aktif</p>
              </div>
            </div>
            <div className="lp-about__card lp-about__card--2">
              <span className="lp-about__card-icon lp-about__card-icon--warn">◉</span>
              <div>
                <p className="lp-about__card-title">Deadline H-1</p>
                <p className="lp-about__card-sub">REST API dengan Golang</p>
              </div>
            </div>
            <div className="lp-about__card lp-about__card--3">
              <span className="lp-about__card-icon lp-about__card-icon--green">◎</span>
              <div>
                <p className="lp-about__card-title">Tugas Dikumpulkan</p>
                <p className="lp-about__card-sub">Tepat waktu · 12 mahasiswa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <span className="lp-logo">
            <span className="lp-logo__mark">⬡</span>
            <span className="lp-logo__text">OpenClaw</span>
          </span>
          <p className="lp-footer__copy">
            © 2026 OpenClaw E-Learning · React + Golang + PostgreSQL
          </p>
          <Link to="/login" className="lp-btn lp-btn--outline lp-btn--sm">
            Login
          </Link>
        </div>
      </footer>
    </div>
  );
}