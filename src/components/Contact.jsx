import { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Send, Terminal, CheckCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolio.js';
import { useInView } from '../hooks/useInView.js';
import './Contact.css';

export default function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contacts = [
    { icon: <Mail size={18}/>, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <Phone size={18}/>, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: <Linkedin size={18}/>, label: 'LinkedIn', value: 'satish0804', href: personalInfo.linkedin },
    { icon: <Github size={18}/>, label: 'GitHub', value: 'Satish-ambati', href: personalInfo.github },
  ];

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className={`section-container reveal-section ${visible ? 'visible' : ''}`}>
        {/* <p className="section-subtitle">// OPEN CHANNEL</p> */}
        <h2 className="section-title">Contact</h2>
        <div className="glow-line" />

        <div className="contact-grid">
          {/* Left: Info */}
          <div className="contact-info">
            <div className="contact-terminal">
              <div className="terminal-header">
                <span className="t-dot red"/><span className="t-dot yellow"/><span className="t-dot green"/>
                <span className="t-title">ping.sh</span>
              </div>
              <div className="terminal-body">
                <div className="t-line"><span className="t-prompt">$</span> <span className="t-cmd">ping satish --open-to-work</span></div>
                <div className="t-line t-output" style={{marginTop:'0.5rem'}}>
                  <span style={{color:'var(--accent-green)'}}>✓</span> Available for internships
                </div>
                <div className="t-line t-output">
                  <span style={{color:'var(--accent-green)'}}>✓</span> Open to freelance projects
                </div>
                <div className="t-line t-output">
                  <span style={{color:'var(--accent-green)'}}>✓</span> Available for full time or part time jobs
                </div>
                <div className="t-line t-output">
                  <span style={{color:'var(--accent-green)'}}>✓</span> Interested in collaborations
                </div>
                <div className="t-line t-output" style={{marginTop:'0.5rem', color:'var(--text-muted)'}}>
                  Response time: &lt; 24 hours
                </div>
              </div>
            </div>

            <div className="contact-links">
              {contacts.map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-link-row">
                  <div className="contact-link-icon">{c.icon}</div>
                  <div className="contact-link-info">
                    <span className="contact-link-label">{c.label}</span>
                    <span className="contact-link-value">{c.value}</span>
                  </div>
                  <div className="contact-link-arrow">→</div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrap">
            <div className="form-header">
              <Terminal size={16} />
              <span>send_message.sh</span>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">// YOUR NAME</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your_name"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">// YOUR EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">// MESSAGE</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="form-input form-textarea"
                  placeholder="your message here..."
                  rows={5}
                />
              </div>
              <button type="submit" className={`btn-cyber send-btn ${sent ? 'sent' : ''}`}>
                {sent ? (
                  <><CheckCircle size={14} /> Message Sent</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
