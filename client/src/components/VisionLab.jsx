import React, { useState } from 'react';
import { 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Calendar,
  Grid,
  Palette,
  Compass
} from 'lucide-react';

export default function VisionLab({ onBookWithFindings }) {
  const [activeTab, setActiveTab] = useState('acuity');

  // 1. Acuity Test State
  const [acuityStep, setAcuityStep] = useState(0);
  const [acuityScore, setAcuityScore] = useState(0);
  const [acuityComplete, setAcuityComplete] = useState(false);

  const acuityRounds = [
    { target: 'E', direction: 'RIGHT', sizeRem: 4.5, acuityLabel: '20/100 (High font scale)' },
    { target: 'E', direction: 'UP', sizeRem: 3.0, acuityLabel: '20/70 (Medium font scale)' },
    { target: 'E', direction: 'LEFT', sizeRem: 2.0, acuityLabel: '20/40 (Standard driving vision)' },
    { target: 'E', direction: 'DOWN', sizeRem: 1.25, acuityLabel: '20/25 (Fine resolution)' },
    { target: 'E', direction: 'RIGHT', sizeRem: 0.85, acuityLabel: '20/20 (Optimal visual acuity)' }
  ];

  const handleAcuityChoice = (chosenDir) => {
    const isCorrect = chosenDir === acuityRounds[acuityStep].direction;
    if (isCorrect) setAcuityScore(prev => prev + 1);

    if (acuityStep + 1 < acuityRounds.length) {
      setAcuityStep(prev => prev + 1);
    } else {
      setAcuityComplete(true);
    }
  };

  const resetAcuity = () => {
    setAcuityStep(0);
    setAcuityScore(0);
    setAcuityComplete(false);
  };

  // 2. Astigmatism Test State
  const [astigmatismResult, setAstigmatismResult] = useState(null);

  // 3. Color Vision Test State
  const [colorStep, setColorStep] = useState(0);
  const [colorScore, setColorScore] = useState(0);
  const [colorComplete, setColorComplete] = useState(false);

  const colorPlates = [
    {
      plateNumber: 1,
      correctVal: '12',
      options: ['12', '72', 'Nothing', '21'],
      description: 'High contrast demonstration plate (identifiable by all visual spectrums)'
    },
    {
      plateNumber: 2,
      correctVal: '74',
      options: ['21', '74', 'Nothing', '71'],
      description: 'Red-Green discrimination plate'
    },
    {
      plateNumber: 3,
      correctVal: '8',
      options: ['3', '8', 'Nothing', '6'],
      description: 'Protan/Deutan optic nerve response plate'
    }
  ];

  const handleColorChoice = (val) => {
    if (val === colorPlates[colorStep].correctVal) {
      setColorScore(prev => prev + 1);
    }
    if (colorStep + 1 < colorPlates.length) {
      setColorStep(prev => prev + 1);
    } else {
      setColorComplete(true);
    }
  };

  const resetColor = () => {
    setColorStep(0);
    setColorScore(0);
    setColorComplete(false);
  };

  // 4. Amsler Grid Test State
  const [amslerResult, setAmslerResult] = useState(null);

  // Format summary findings to carry over into booking
  const getFindingsSummary = () => {
    let summary = 'Online Vision Lab Results: ';
    if (acuityComplete) {
      summary += `Visual Acuity Score: ${acuityScore}/${acuityRounds.length} (${acuityScore >= 4 ? 'Estimated ~20/20 or 20/25' : 'Reduced acuity detected'}); `;
    }
    if (astigmatismResult) {
      summary += `Astigmatism check: ${astigmatismResult === 'uneven' ? 'Reported uneven radial line thickness (possible astigmatism)' : 'All radial lines even'}; `;
    }
    if (colorComplete) {
      summary += `Color perception: ${colorScore === 3 ? 'Normal trichromatic' : 'Partial color response variance'}; `;
    }
    if (amslerResult) {
      summary += `Macular Amsler check: ${amslerResult === 'distorted' ? 'Noticeable wavy/distorted lines (Advised immediate retinal OCT)' : 'Lines straight and intact'}.`;
    }
    return summary;
  };

  return (
    <section className="section-padding vision-lab-section" id="vision-lab">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} /> Al Ayn Interactive Vision Lab
          </span>
          <h2>Self-Assessment Clinical Screening Suite</h2>
          <p>
            Assess your visual acuity, corneal astigmatism, color perception, and macular function 
            from home in minutes. Note: This screening aids early symptom detection but does not replace a comprehensive dilated eye exam.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="vision-tabs-bar">
          <button
            className={`vision-tab-btn ${activeTab === 'acuity' ? 'active' : ''}`}
            onClick={() => setActiveTab('acuity')}
          >
            <Eye size={16} />
            <span>Visual Acuity (Snellen)</span>
          </button>
          <button
            className={`vision-tab-btn ${activeTab === 'astigmatism' ? 'active' : ''}`}
            onClick={() => setActiveTab('astigmatism')}
          >
            <Compass size={16} />
            <span>Astigmatism Dial</span>
          </button>
          <button
            className={`vision-tab-btn ${activeTab === 'color' ? 'active' : ''}`}
            onClick={() => setActiveTab('color')}
          >
            <Palette size={16} />
            <span>Color Vision Test</span>
          </button>
          <button
            className={`vision-tab-btn ${activeTab === 'amsler' ? 'active' : ''}`}
            onClick={() => setActiveTab('amsler')}
          >
            <Grid size={16} />
            <span>Amsler Grid (Macula)</span>
          </button>
        </div>

        {/* Active Test Container */}
        <div className="vision-lab-display glass-panel">
          {/* TAB 1: VISUAL ACUITY */}
          {activeTab === 'acuity' && (
            <div className="test-module">
              <div className="test-instructions">
                <h4>Snellen Tumbling 'E' Visual Acuity Test</h4>
                <p>
                  Sit approximately <strong>arm’s length (~60 cm / 2 ft)</strong> from your screen. 
                  If you wear prescription glasses or contacts for distance, keep them on. 
                  Indicate which way the prongs of the letter 'E' are pointing.
                </p>
              </div>

              {!acuityComplete ? (
                <div className="acuity-interactive-area">
                  <div className="test-progress-bar">
                    Round {acuityStep + 1} of {acuityRounds.length} — Level: {acuityRounds[acuityStep].acuityLabel}
                  </div>

                  <div className="optotype-viewport">
                    <div 
                      className={`tumbling-e dir-${acuityRounds[acuityStep].direction.toLowerCase()}`}
                      style={{ fontSize: `${acuityRounds[acuityStep].sizeRem}rem` }}
                    >
                      E
                    </div>
                  </div>

                  <div className="direction-controls">
                    <span className="controls-label">Select the direction the prongs point:</span>
                    <div className="dpad-grid">
                      <button className="btn btn-secondary dpad-btn up" onClick={() => handleAcuityChoice('UP')}>▲ Up</button>
                      <div className="dpad-middle-row">
                        <button className="btn btn-secondary dpad-btn left" onClick={() => handleAcuityChoice('LEFT')}>◀ Left</button>
                        <button className="btn btn-secondary dpad-btn right" onClick={() => handleAcuityChoice('RIGHT')}>Right ▶</button>
                      </div>
                      <button className="btn btn-secondary dpad-btn down" onClick={() => handleAcuityChoice('DOWN')}>▼ Down</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="test-result-box">
                  <div className="result-header">
                    <CheckCircle size={32} className="result-icon-success" />
                    <div>
                      <h3>Acuity Test Completed!</h3>
                      <p>You scored <strong>{acuityScore} out of {acuityRounds.length}</strong> correct.</p>
                    </div>
                  </div>
                  <div className="result-interpretation">
                    {acuityScore >= 4 ? (
                      <p className="interpretation-good">
                        <strong>Excellent Clarity:</strong> Your distance vision appears sharp and close to optimal 20/20 resolution on this display scale.
                      </p>
                    ) : (
                      <p className="interpretation-caution">
                        <strong>Mild-to-Moderate Reduction Detected:</strong> You missed smaller optotypes. You may benefit from refraction testing for myopia, hyperopia, or astigmatism.
                      </p>
                    )}
                  </div>
                  <div className="test-action-row">
                    <button className="btn btn-secondary btn-sm" onClick={resetAcuity}>
                      <RotateCcw size={14} /> Retest
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onBookWithFindings(getFindingsSummary())}
                    >
                      <Calendar size={14} /> Schedule Doctor Refraction
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ASTIGMATISM CLOCK */}
          {activeTab === 'astigmatism' && (
            <div className="test-module">
              <div className="test-instructions">
                <h4>Corneal Astigmatism Clock Dial Test</h4>
                <p>
                  Cover your left eye and focus on the center of the clock dial below. 
                  Observe all the numbered radiating spoke lines. Repeat with your other eye.
                </p>
              </div>

              <div className="astigmatism-interactive-area">
                <div className="dial-container">
                  <svg viewBox="0 0 300 300" className="astigmatism-clock-svg">
                    <circle cx="150" cy="150" r="140" fill="white" stroke="#0ea5e9" strokeWidth="2" />
                    <circle cx="150" cy="150" r="6" fill="#0f172a" />
                    {/* 12 radial spokes */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                      <g key={deg} transform={`rotate(${deg} 150 150)`}>
                        <line x1="150" y1="20" x2="150" y2="135" stroke="#1e293b" strokeWidth="3.5" />
                        <line x1="144" y1="20" x2="144" y2="135" stroke="#1e293b" strokeWidth="1.5" />
                        <line x1="156" y1="20" x2="156" y2="135" stroke="#1e293b" strokeWidth="1.5" />
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="astigmatism-questionnaire">
                  <p className="question-title">How do the radiating black lines look to you?</p>
                  <div className="answer-options">
                    <button 
                      className={`option-btn ${astigmatismResult === 'even' ? 'selected' : ''}`}
                      onClick={() => setAstigmatismResult('even')}
                    >
                      <CheckCircle size={18} />
                      <div>
                        <strong>All lines appear equally sharp & dark</strong>
                        <span>No significant astigmatic asymmetry detected.</span>
                      </div>
                    </button>

                    <button 
                      className={`option-btn ${astigmatismResult === 'uneven' ? 'selected' : ''}`}
                      onClick={() => setAstigmatismResult('uneven')}
                    >
                      <AlertTriangle size={18} />
                      <div>
                        <strong>Certain lines look bolder, thicker, or darker than others</strong>
                        <span>Common indicator of uncorrected corneal astigmatism.</span>
                      </div>
                    </button>
                  </div>

                  {astigmatismResult && (
                    <div className="result-feedback">
                      {astigmatismResult === 'uneven' ? (
                        <p className="warn-text">
                          💡 You may have corneal cylinder/astigmatism. Our Cornea and Refractive team at Al Ayn can perform high-resolution corneal tomography (Pentacam) to map your exact curvature.
                        </p>
                      ) : (
                        <p className="good-text">
                          ✓ Your cornea appears symmetrical across meridians.
                        </p>
                      )}
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => onBookWithFindings(getFindingsSummary())}
                      >
                        <Calendar size={14} /> Book Corneal Topography Check
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COLOR VISION */}
          {activeTab === 'color' && (
            <div className="test-module">
              <div className="test-instructions">
                <h4>Pseudoisochromatic Color Perception Screening</h4>
                <p>
                  Identify the number pattern embedded within the chromatic dot matrix. 
                  This screens for common congenital and acquired red-green dyschromatopsia.
                </p>
              </div>

              {!colorComplete ? (
                <div className="color-interactive-area">
                  <div className="test-progress-bar">
                    Plate {colorStep + 1} of {colorPlates.length} — {colorPlates[colorStep].description}
                  </div>

                  <div className="ishihara-plate-container">
                    <div className={`ishihara-plate plate-style-${colorPlates[colorStep].plateNumber}`}>
                      <span className="plate-num-overlay">{colorPlates[colorStep].correctVal}</span>
                    </div>
                  </div>

                  <div className="plate-options-panel">
                    <p className="choose-plate-prompt">What number do you see in the circle?</p>
                    <div className="plate-buttons-row">
                      {colorPlates[colorStep].options.map((opt) => (
                        <button
                          key={opt}
                          className="btn btn-secondary plate-opt-btn"
                          onClick={() => handleColorChoice(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="test-result-box">
                  <div className="result-header">
                    <CheckCircle size={32} className="result-icon-success" />
                    <div>
                      <h3>Color Vision Screening Finished</h3>
                      <p>Correct responses: <strong>{colorScore} / {colorPlates.length}</strong></p>
                    </div>
                  </div>
                  <div className="result-interpretation">
                    {colorScore === colorPlates.length ? (
                      <p className="interpretation-good">
                        <strong>Standard Trichromacy:</strong> You clearly distinguished red and green hues across all test plates.
                      </p>
                    ) : (
                      <p className="interpretation-caution">
                        <strong>Color Spectrum Variance:</strong> Some plates were challenging. A Farnsworth-Munsell 100-hue test at our clinic can provide a definitive diagnostic profile.
                      </p>
                    )}
                  </div>
                  <div className="test-action-row">
                    <button className="btn btn-secondary btn-sm" onClick={resetColor}>
                      <RotateCcw size={14} /> Retest
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onBookWithFindings(getFindingsSummary())}
                    >
                      <Calendar size={14} /> Schedule Comprehensive Exam
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AMSLER GRID */}
          {activeTab === 'amsler' && (
            <div className="test-module">
              <div className="test-instructions">
                <h4>Amsler Grid Macular Degeneration & Retinal Check</h4>
                <p>
                  <strong>Vital for adults over 40 & diabetic patients:</strong> Cover one eye, 
                  fixate steadily on the white center dot from 30 cm distance. 
                  Do not look away from the center dot. Check if surrounding grid lines appear bent or distorted.
                </p>
              </div>

              <div className="amsler-interactive-area">
                <div className="amsler-grid-box">
                  <div className="amsler-grid-pattern">
                    <div className="amsler-center-dot"></div>
                  </div>
                </div>

                <div className="amsler-questions">
                  <p className="question-title">While fixating on the center dot:</p>
                  
                  <div className="amsler-options">
                    <button 
                      className={`option-btn ${amslerResult === 'normal' ? 'selected' : ''}`}
                      onClick={() => setAmslerResult('normal')}
                    >
                      <CheckCircle size={18} />
                      <div>
                        <strong>All squares & lines are straight, sharp & complete</strong>
                        <span>Normal macular appearance.</span>
                      </div>
                    </button>

                    <button 
                      className={`option-btn ${amslerResult === 'distorted' ? 'selected' : ''}`}
                      onClick={() => setAmslerResult('distorted')}
                    >
                      <AlertTriangle size={18} />
                      <div>
                        <strong>Some lines look wavy, bent, broken, or missing</strong>
                        <span>Possible macular edema or age-related macular changes (AMD).</span>
                      </div>
                    </button>
                  </div>

                  {amslerResult && (
                    <div className="result-feedback">
                      {amslerResult === 'distorted' ? (
                        <div className="urgent-banner">
                          <AlertTriangle size={20} className="urgent-icon" />
                          <div>
                            <strong>Prompt Retina Evaluation Recommended:</strong>
                            <p>Distorted lines (metamorphopsia) warrant a high-resolution OCT scan by our Vitreoretinal specialists.</p>
                          </div>
                        </div>
                      ) : (
                        <p className="good-text">
                          ✓ Grid symmetry intact. Routine annual dilated checks are advised.
                        </p>
                      )}
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => onBookWithFindings(getFindingsSummary())}
                      >
                        <Calendar size={14} /> Book Retina & Macula OCT Exam
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Action Banner */}
        <div className="vision-lab-cta glass-panel-dark">
          <div className="cta-text">
            <h4>Ready to discuss your vision with an eye doctor?</h4>
            <p>Our clinics feature ultra-precise computerized wavefront refraction and 3D OCT tomography.</p>
          </div>
          <button 
            className="btn btn-accent btn-lg"
            onClick={() => onBookWithFindings(getFindingsSummary())}
          >
            <Calendar size={18} /> Book In-Person Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
