import { useState } from 'react';
import { ExternalLink, Award, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { achievements, certifications } from '../data/portfolio.js';
import { useInView } from '../hooks/useInView.js';
import './Achievements.css';

const colorMap = {
  cyan:   'var(--accent-cyan)',
  green:  'var(--accent-green)',
  purple: 'var(--accent-purple)',
  orange: 'var(--accent-orange)',
};

export default function Achievements() {
  const [ref, visible] = useInView();

  return (
    <section id="achievements" className="achievements-section" ref={ref}>
      <div className={`section-container reveal-section ${visible ? 'visible' : ''}`}>
        {/* <p className="section-subtitle">// HALL OF RECORDS</p> */}
        <h2 className="section-title">Achievements</h2>
        <div className="glow-line" />

        <div className="achievements-grid">
          {achievements.map((a, i) => (
            <AchievementCard key={i} item={a} index={i} />
          ))}
        </div>

        <div className="certs-wrap">
          {/* <p className="section-subtitle certs-sub">// CREDENTIALS</p> */}
          <h3 className="certs-title">
            <Award size={18} />
            Certifications
          </h3>
          {/* <p className="certs-hint">
            <Download size={12} />
            Click any certificate to download
          </p> */}
          <div className="certs-grid">
            {certifications.map((c, i) => (
              <CertCard key={i} cert={c} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Achievement card (unchanged layout) ── */
function AchievementCard({ item, index }) {
  const color = colorMap[item.color];
  return (
    <div
      className="achieve-card"
      style={{ '--a-color': color, animationDelay: `${index * 100}ms` }}
    >
      <div className="achieve-top">
        <div className="achieve-stat-block">
          <div className="achieve-stat">{item.stat}</div>
          <div className="achieve-stat-label">{item.statLabel}</div>
        </div>
        <div className="achieve-icon-wrap">
          <span className="achieve-icon">{item.icon}</span>
        </div>
      </div>
      <h3 className="achieve-title">{item.title}</h3>
      <p className="achieve-desc">{item.description}</p>
      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="achieve-link">
          <ExternalLink size={12} /> View Profile
        </a>
      )}
      {item.date && <span className="achieve-date">{item.date}</span>}
    </div>
  );
}

/* ── Certificate card with download ── */
function CertCard({ cert, index }) {
  const color = colorMap[cert.color];
  // 'idle' | 'downloading' | 'done' | 'error'
  const [status, setStatus] = useState('idle');

  const handleDownload = async () => {
    if (!cert.file) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }

    setStatus('downloading');

    try {
      const url = `/certificates/${cert.file}`;

      // Fetch to verify the file actually exists before triggering download
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) throw new Error('File not found');

      // Create a temporary anchor and programmatically click it
      const a = document.createElement('a');
      a.href = url;
      // Suggest a friendly filename: e.g. "Java_NPTEL_Certificate.pdf"
      const friendlyName = `${cert.name.replace(/[^a-z0-9]/gi, '_')}_Certificate${cert.file.slice(cert.file.lastIndexOf('.'))}`;
      a.download = friendlyName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setStatus('done');
      setTimeout(() => setStatus('idle'), 2500);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  const stateIcon = {
    idle:        <Download size={14} />,
    downloading: <span className="cert-spinner" />,
    done:        <CheckCircle size={14} />,
    error:       <AlertCircle size={14} />,
  };

  const stateLabel = {
    idle:        'Download',
    downloading: 'Fetching…',
    done:        'Saved!',
    error:       cert.file ? 'File not found' : 'No file set',
  };

  return (
    <div
      className={`cert-card cert-status-${status}`}
      style={{
        '--c-color': color,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Animated top border */}
      <div className="cert-top-bar" />

      {/* Header row */}
      <div className="cert-header">
        <Award size={15} className="cert-award-icon" />
        <span className="cert-issuer">{cert.issuer}</span>
        <span className="cert-date-badge">{cert.date}</span>
      </div>

      {/* Name */}
      <h4 className="cert-name">{cert.name}</h4>

      {/* Grade */}
      <div className="cert-grade-wrap">
        <span className="cert-grade">{cert.grade}</span>
      </div>

      {/* File path hint */}
      {/* {cert.file && (
        <div className="cert-file-hint">
          <span className="cert-file-path">/certificates/{cert.file}</span>
        </div>
      )} */}

      {/* Download button */}
      <button
        className={`cert-download-btn btn-state-${status}`}
        onClick={handleDownload}
        disabled={status === 'downloading'}
        aria-label={`Download ${cert.name} certificate`}
      >
        <span className="cert-btn-icon">{stateIcon[status]}</span>
        <span className="cert-btn-label">{stateLabel[status]}</span>
      </button>
    </div>
  );
}