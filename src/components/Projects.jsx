import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { projects } from '../data/portfolio.js';
import { useInView } from '../hooks/useInView.js';
import './Projects.css';

const colorMap = {
  cyan: { border: 'var(--accent-cyan)', glow: 'rgba(0,245,255,0.1)', text: 'var(--accent-cyan)' },
  green: { border: 'var(--accent-green)', glow: 'rgba(0,255,136,0.1)', text: 'var(--accent-green)' },
  purple: { border: 'var(--accent-purple)', glow: 'rgba(189,0,255,0.1)', text: 'var(--accent-purple)' },
};

export default function Projects() {
  const [ref, visible] = useInView();

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className={`section-container reveal-section ${visible ? 'visible' : ''}`}>
        {/* <p className="section-subtitle">// BUILD LOG</p> */}
        <h2 className="section-title">Projects</h2>
        <div className="glow-line" />

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const c = colorMap[project.color];

  return (
    <div
      className="project-card"
      style={{
        '--card-color': c.border,
        '--card-glow': c.glow,
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Header */}
      <div className="project-header">
        <span className="project-icon">{project.icon}</span>
        <div className="project-title-wrap">
          <h3 className="project-name">{project.name}</h3>
          <div className="project-stack">
            {project.stack.map(s => (
              <span key={s} className="stack-tag">{s}</span>
            ))}
          </div>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
      </div>

      {/* Description */}
      <p className="project-desc">{project.description}</p>

      {/* Features */}
      <ul className="project-features">
        {project.features.map((f, i) => (
          <li key={i} className="feature-item">
            <ChevronRight size={12} className="feature-arrow" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Card number */}
      <div className="project-number">0{index + 1}</div>
    </div>
  );
}
