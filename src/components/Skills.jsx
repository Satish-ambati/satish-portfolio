import { useState } from 'react';
import { skills } from '../data/portfolio.js';
import { useInView } from '../hooks/useInView.js';
import './Skills.css';

const categoryColors = {
  'Languages': 'cyan',
  'Frameworks': 'green',
  'Databases & ORM': 'purple',
  'Tools & DevOps': 'orange',
  'Cybersecurity': 'red',
  'Architecture': 'blue',
};

export default function Skills() {
  const [ref, visible] = useInView();
  const [activeCategory, setActiveCategory] = useState('Languages');

  const activeSkills = skills.find(s => s.category === activeCategory);

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className={`section-container reveal-section ${visible ? 'visible' : ''}`}>
        {/* <p className="section-subtitle">// TECH STACK</p> */}
        <h2 className="section-title">Skill Matrix</h2>
        <div className="glow-line" />

        <div className="skills-layout">
          {/* Category tabs */}
          <div className="skills-nav">
            {skills.map(s => (
              <button
                key={s.category}
                className={`skill-tab ${activeCategory === s.category ? 'active' : ''} color-${categoryColors[s.category]}`}
                onClick={() => setActiveCategory(s.category)}
              >
                <span className="tab-indicator" />
                {s.category}
              </button>
            ))}
          </div>

          {/* Skill bars */}
          <div className="skills-content">
            <div className="skills-header">
              <h3 className="skills-cat-title">
                <span className="cat-bracket">&lt;</span>
                {activeCategory}
                <span className="cat-bracket">/&gt;</span>
              </h3>
              <span className="skills-count">{activeSkills?.items.length} skills</span>
            </div>

            <div className="skill-bars">
              {activeSkills?.items.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  color={categoryColors[activeCategory]}
                  delay={i * 100}
                  visible={visible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* All tech tags */}
        <div className="all-tech">
          <p className="all-tech-label">// ALL TECHNOLOGIES</p>
          <div className="tech-tags">
            {skills.flatMap(s => s.items.map(it => ({
              ...it, category: s.category
            }))).map((item, i) => (
              <span
                key={i}
                className={`tag color-tag-${categoryColors[item.category]}`}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, color, delay, visible }) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-meta">
        <span className="skill-name">{skill.name}</span>
        <span className={`skill-pct color-text-${color}`}>{skill.level}%</span>
      </div>
      <div className="skill-track">
        <div
          className={`skill-fill color-fill-${color}`}
          style={{
            width: visible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
        <div
          className={`skill-glow color-fill-${color}`}
          style={{
            width: visible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
