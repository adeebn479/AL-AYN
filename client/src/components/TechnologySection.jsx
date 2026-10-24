import React from 'react';
import { Cpu, Zap, Activity, Eye, ShieldCheck, CheckCircle } from 'lucide-react';

export default function TechnologySection() {
  const techList = [
    {
      name: "Carl Zeiss VisuMax 800",
      category: "Femtosecond Refractive Laser",
      description: "Creates laser lenticules for SMILE Pro in as little as 8 to 10 seconds, virtually eliminating patient anxiety and involuntary eye movement risks.",
      features: ["Centration guidance system", "Cyclotorsion alignment", "Sub-micron pulse precision"]
    },
    {
      name: "Heidelberg Spectralis OCT-A",
      category: "3D Retinal Angiography",
      description: "Non-invasive microscopic depth scans of the retina, macula, and choroid without requiring intravenous dye injections.",
      features: ["TruTrack active eye tracking", "High-speed 85,000 Hz A-scans", "Micro-vascular blood flow visualization"]
    },
    {
      name: "Alcon Centurion Active Sentry",
      category: "Micro-Incision Phacoemulsification",
      description: "Next-generation fluidics sensor handpiece that maintains physiological eye pressure continuously during cataract extraction.",
      features: ["Eliminates post-occlusion surge", "1.8mm micro-incision access", "Minimized corneal endothelial loss"]
    },
    {
      name: "Humphrey HFA3 SITA Faster",
      category: "Glaucoma Visual Field Analyzer",
      description: "The global gold standard in measuring peripheral visual field defects, providing accurate optic nerve progression tracking in half the traditional test time.",
      features: ["SITA Faster algorithm", "Reliability index verification", "Early nerve fiber damage detection"]
    }
  ];

  return (
    <section className="section-padding tech-section" id="technology">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Cpu size={14} /> Surgical Technology & Instrumentation
          </span>
          <h2>Ultra-Precision Diagnostic & Operative Suites</h2>
          <p>
            Al Ayn Eye Hospital is equipped with top-tier German and American medical platforms, 
            ensuring sub-millimeter surgical accuracy and maximum safety.
          </p>
        </div>

        <div className="tech-showcase-grid">
          {/* Main Visual Feature */}
          <div className="tech-main-card glass-panel-dark">
            <div className="tech-img-wrapper">
              <img 
                src="/images/laser_surgery.jpg" 
                alt="Al Ayn Ophthalmic Laser Suite" 
                className="tech-showcase-img"
              />
              <div className="tech-img-badge">
                <Zap size={14} /> Robotic Precision Suite
              </div>
            </div>
            <div className="tech-main-content">
              <h3>Next-Gen Refractive & Vitreoretinal Theaters</h3>
              <p>
                Our laminar-flow operating theaters feature HEPA class-100 sterile air purification, 
                Heads-Up 3D digital visualization microscopes, and femtosecond laser docking systems 
                providing unmatched ergonomic control and patient safety.
              </p>
              <div className="tech-badges-row">
                <span className="badge badge-cyan">ISO Class 5 Cleanroom</span>
                <span className="badge badge-emerald">Real-time Topographic Tracking</span>
                <span className="badge badge-amber">Dual Backup Power Redundancy</span>
              </div>
            </div>
          </div>

          {/* Technology Cards Grid */}
          <div className="tech-cards-column">
            {techList.map((tech, idx) => (
              <div key={idx} className="tech-item-card glass-panel">
                <div className="tech-item-header">
                  <div className="tech-icon-pill">
                    <Cpu size={18} />
                  </div>
                  <div>
                    <span className="tech-category">{tech.category}</span>
                    <h4 className="tech-title">{tech.name}</h4>
                  </div>
                </div>
                <p className="tech-description">{tech.description}</p>
                <div className="tech-features-list">
                  {tech.features.map((feat, fIdx) => (
                    <span key={fIdx} className="tech-feature-pill">
                      <CheckCircle size={12} /> {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
