import { User, GraduationCap, Shield, Code2, Cpu } from 'lucide-react';
import { personalInfo } from '../data/portfolio.js';
import { useInView } from '../hooks/useInView.js';
import './About.css';

const stats = [
  { icon: <Code2 size={20}/>, value: "390+", label: "LeetCode Problems" },
  { icon: <Shield size={20}/>, value: "9.1", label: "CGPA" },
  { icon: <Cpu size={20}/>, value: "3+", label: "Projects Built" },
  { icon: <GraduationCap size={20}/>, value: "2", label: "Internships" },
];

export default function About() {
  const [ref, visible] = useInView();

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className={`section-container reveal-section ${visible ? 'visible' : ''}`}>
        {/* <p className="section-subtitle">// ABOUT ME</p> */}
        <h2 className="section-title">Identity Matrix</h2>
        <div className="glow-line" />

        <div className="about-grid">
          <div className="about-left">
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="t-dot red" />
                <span className="t-dot yellow" />
                <span className="t-dot green" />
                <span className="t-title">whoami.sh</span>
              </div>
              <div className="terminal-body">
                <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">cat profile.json</span></div>
                <div className="t-line t-output">{`{`}</div>
                <div className="t-line t-output indent"><span className="t-key">"name"</span>: <span className="t-val">"{personalInfo.name}"</span>,</div>
                <div className="t-line t-output indent"><span className="t-key">"role"</span>: <span className="t-val">"{personalInfo.title}"</span>,</div>
                <div className="t-line t-output indent"><span className="t-key">"cgpa"</span>: <span className="t-val">"{personalInfo.cgpa}"</span>,</div>
                <div className="t-line t-output indent"><span className="t-key">"college"</span>: <span className="t-val">"SRKR Engg College"</span>,</div>
                <div className="t-line t-output indent"><span className="t-key">"club_role"</span>: <span className="t-val">"Web & App Lead"</span>,</div>
                <div className="t-line t-output indent"><span className="t-key">"year"</span>: <span className="t-val">"2023–2027"</span>,</div>
                <div className="t-line t-output indent"><span className="t-key">"status"</span>: <span className="t-green">"Available for Internships and jobs"</span></div>
                <div className="t-line t-output">{`}`}</div>
                <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd cursor-blink">█</span></div>
              </div>
            </div>
          </div>

          <div className="about-right">
            <p className="about-bio">{personalInfo.bio}</p>

            <div className="about-detail">
              <GraduationCap size={16} className="detail-icon" />
              <div>
                <span className="detail-label">Education</span>
                <span className="detail-value">{personalInfo.degree}</span>
              </div>
            </div>
            <div className="about-detail">
              <Shield size={16} className="detail-icon green" />
              <div>
                <span className="detail-label">CGPA</span>
                <span className="detail-value">{personalInfo.cgpa}</span>
              </div>
            </div>
            <div className="about-detail">
              <Code2 size={16} className="detail-icon purple" />
              <div>
                <span className="detail-label">Club Role</span>
                <span className="detail-value">Web & App Lead — Coding Club</span>
              </div>
            </div>

            <div className="about-stats">
              {stats.map((s, i) => (
                <div className="stat-box" key={i}>
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
