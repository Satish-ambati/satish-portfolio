import { useState } from 'react';
import { Briefcase, Calendar, ChevronRight, Download, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { internships } from '../data/portfolio.js';
import { useInView } from '../hooks/useInView.js';
import './Internships.css';

export default function Internships() {
  const [ref, visible] = useInView();

  return (
    <section id="internships" className="internships-section" ref={ref}>
      <div className={`section-container reveal-section ${visible ? 'visible' : ''}`}>
        <h2 className="section-title">Experience</h2>
        <div className="glow-line" />

        <div className="timeline">
          {internships.map((intern, i) => (
            <TimelineCard
              key={i}
              intern={intern}
              index={i}
              isLast={i === internships.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ intern, index, isLast }) {
  const [dlState, setDlState] = useState('idle');

  const colorVar = {
    cyan:   'var(--accent-cyan)',
    green:  'var(--accent-green)',
    purple: 'var(--accent-purple)',
    orange: 'var(--accent-orange)',
  }[intern.color];

  const handleDownload = async () => {
    if (dlState === 'loading') return;

    if (!intern.file) {
      setDlState('error');
      setTimeout(() => setDlState('idle'), 2800);
      return;
    }

    setDlState('loading');

    try {
      const url = `/certificates/${intern.file}`;
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) throw new Error('Not found');

      const a = document.createElement('a');
      a.href = url;
      a.download = `${intern.company} - Internship Certificate.${intern.file.split('.').pop()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDlState('done');
      setTimeout(() => setDlState('idle'), 3000);
    } catch {
      setDlState('error');
      setTimeout(() => setDlState('idle'), 3000);
    }
  };

  const stateIcon = {
    idle:    <Download    size={13} />,
    loading: <Loader      size={13} className="spin-icon" />,
    done:    <CheckCircle size={13} />,
    error:   <AlertCircle size={13} />,
  };

  const stateLabel = {
    idle:    'Certificate',
    loading: 'Fetching…',
    done:    'Downloaded!',
    error:   'File missing',
  };

  return (
    <div className="timeline-item" style={{ '--tl-color': colorVar }}>
      {/* Spine */}
      <div className="timeline-spine">
        <div className="tl-dot">
          <Briefcase size={14} />
        </div>
        {!isLast && <div className="tl-line" />}
      </div>

      {/* Card */}
      <div className={`tl-card tl-card-${dlState}`}>
        {/* Scan sweep on hover */}
        <div className="tl-scan" />

        <div className="tl-header">
          <div className="tl-header-left">
            <div className="tl-company">{intern.company}</div>
            <h3 className="tl-role">{intern.role}</h3>
            <div className="tl-project">⟶ {intern.project}</div>
          </div>

          <div className="tl-header-right">
            <div className="tl-period">
              <Calendar size={12} />
              <span>{intern.period}</span>
            </div>

            {/* Download button */}
            <button
              className={`tl-dl-btn tl-dl-${dlState}`}
              onClick={handleDownload}
              disabled={dlState === 'loading'}
              aria-label={`Download ${intern.company} internship certificate`}
            >
              {stateIcon[dlState]}
              <span>{stateLabel[dlState]}</span>
            </button>
          </div>
        </div>

        <div className="tl-stack">
          {intern.stack.map(s => (
            <span key={s} className="stack-badge">{s}</span>
          ))}
        </div>

        <ul className="tl-points">
          {intern.points.map((p, i) => (
            <li key={i} className="tl-point">
              <ChevronRight size={12} className="tl-arrow" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        {/* Success flash overlay */}
        {dlState === 'done' && <div className="tl-success-flash" />}

        <div className="tl-index">0{index + 1}</div>
      </div>
    </div>
  );
}