import { useState, useEffect } from 'react';
import {
  Shield, Home, User, Cpu, FolderOpen,
  Briefcase, Award, Mail, Menu, X
} from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { href: '#home',         label: 'Home',         icon: Home },
  { href: '#about',        label: 'About',        icon: User },
  { href: '#skills',       label: 'Skills',       icon: Cpu },
  { href: '#projects',     label: 'Projects',     icon: FolderOpen },
  { href: '#internships',  label: 'Experience',   icon: Briefcase },
  { href: '#achievements', label: 'Achievements', icon: Award },
  { href: '#contact',      label: 'Contact',      icon: Mail },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Desktop top navbar ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <Shield size={20} className="logo-icon" />
            <span className="logo-text">
              SATISH<span className="logo-accent">.DEV</span>
            </span>
          </a>

          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${active === link.href.slice(1) ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.href.slice(1))}
                >
                  <span className="link-bracket">[</span>
                  {link.label}
                  <span className="link-bracket">]</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger only visible on mobile — opens overlay drawer */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile: full-screen overlay drawer (triggered by hamburger) ── */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <Shield size={18} className="logo-icon" />
              <span className="logo-text">
                SATISH<span className="logo-accent">.DEV</span>
              </span>
              <button
                className="drawer-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="drawer-links">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href} style={{ animationDelay: `${i * 45}ms` }}>
                    <a
                      href={link.href}
                      className={`drawer-link ${isActive ? 'active' : ''}`}
                      onClick={() => handleNavClick(link.href.slice(1))}
                    >
                      <span className="drawer-index">0{i + 1}</span>
                      <Icon size={16} className="drawer-icon" />
                      <span className="drawer-label">{link.label}</span>
                      {isActive && <span className="drawer-active-dot" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* ── Mobile: fixed bottom tab bar ── */}
      <nav className="mobile-tabbar">
        {navLinks.map(link => {
          const Icon = link.icon;
          const isActive = active === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              className={`tab-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(link.href.slice(1))}
              aria-label={link.label}
            >
              {isActive && <span className="tab-glow" />}
              <Icon size={20} className="tab-icon" />
              <span className="tab-label">{link.label}</span>
              {isActive && <span className="tab-dot" />}
            </a>
          );
        })}
      </nav>
    </>
  );
}