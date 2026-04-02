import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Terminal, Shield } from 'lucide-react';
import { personalInfo, roles } from '../data/portfolio.js';
import './Hero.css';
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
const TYPING_ROLES = roles;
import profileImg from '../assets/profile_image.jpeg';
export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [particles, setParticles] = useState([]);

  // Typewriter effect
  useEffect(() => {
    const current = TYPING_ROLES[roleIndex];
    const speed = deleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setCharIndex(0);
          setRoleIndex(r => (r + 1) % TYPING_ROLES.length);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, roleIndex]);

  // Generate particles
  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(p);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Particles */}
      <div className="particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Scanline */}
      <div className="scanline" />

      {/* Hexagonal avatar */}
      <div className="hero-content">
        {/* <div className="hero-badge">
          <Terminal size={14} />
          <span>SYSTEM ONLINE // PORTFOLIO v2.4.1</span>
        </div> */}

        <div className="hero-avatar-wrap">
          <div className="hex-ring outer" />
          <div className="hex-ring inner" />
          <div className="radar-sweep" />
          <span className="av-bracket tl" /><span className="av-bracket tr" />
          <span className="av-bracket bl" /><span className="av-bracket br" />

          <div className="avatar-hex">
            <img
              src={profileImg}
              alt={personalInfo.name}
              className="avatar-photo"
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="avatar-fallback">
              <Shield size={28} className="avatar-shield" />
              <span className="avatar-initials">{personalInfo.avatarInitials}</span>
            </div>
          </div>

          <div className="avatar-hud hud-top-right">
            <span className="hud-label">ID</span>
            <span className="hud-value">SA-0804</span>
          </div>
          <div className="avatar-hud hud-bottom-left">
            <span className="hud-label">STATUS</span>
            <span className="hud-value hud-green">ONLINE</span>
          </div>

          <div className="orbit-dot" style={{ '--deg': '0deg' }} />
          <div className="orbit-dot" style={{ '--deg': '120deg' }} />
          <div className="orbit-dot" style={{ '--deg': '240deg' }} />
        </div>

        <div className="hero-text">
          <p className="hero-greeting">
            <span className="prompt">root@portfolio:~$</span> whoami
          </p>
          <h1 className="hero-name">{personalInfo.name}</h1>

          <div className="hero-role">
            <span className="role-prefix">{'<'}</span>
            <span className="role-text">{displayText}</span>
            <span className="cursor-blink role-cursor">_</span>
            <span className="role-suffix">{'/>'}</span>
          </div>

          <p className="hero-bio">{personalInfo.bio}</p>

          <div className="hero-club-badge">
            <Shield size={14} />
            <span>{personalInfo.clubRole}</span>
          </div>

          {/* <div className="hero-actions">
            <a href="#projects" className="btn-cyber">
              <Terminal size={14} />
              View Projects
            </a>
            <a href="#contact" className="btn-cyber btn-cyber-green">
              <Mail size={14} />
              Contact Me
            </a>
          </div> */}

          <div className="hero-socials">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="social-link" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href={personalInfo.leetcode} target="_blank" className="social-link">
              <SiLeetcode size={20} />
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-indicator" aria-label="Scroll down">
        <span className="scroll-text">SCROLL</span>
        <ChevronDown size={16} className="scroll-icon" />
      </a>
    </section>
  );
}
