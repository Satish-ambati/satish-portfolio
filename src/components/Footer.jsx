import { Shield, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolio.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow-line" />

      <div className="footer-container">
        
        {/* Brand */}
        <div className="footer-brand">
          <Shield size={16} className="footer-logo-icon" />
          <span className="footer-logo-text">
            SATISH<span>.DEV</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="footer-copy">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>

        {/* Tech Stack */}
        <p className="footer-tech">
          Crafted with <Heart size={10} className="heart" /> using React & Vite
        </p>

        {/* Status */}
        {/* <p className="footer-status">
          <span className="status-dot" /> System Status: Operational
        </p> */}

      </div>
    </footer>
  );
}