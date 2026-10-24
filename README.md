# 👁️ Al Ayn Specialized Eye Hospital (مستشفى العين التخصصي للعيون)
### Full MERN Stack Web Application (MongoDB • Express • React • Node.js)

A state-of-the-art web application for **Al Ayn Specialized Eye Hospital**, a premier tertiary ophthalmic center of excellence offering blade-free SMILE Pro & Femto-LASIK, micro-incision cataract surgery, vitreoretinal care, glaucoma laser therapy, pediatric squint rehabilitation, and 24/7 eye trauma emergency services.

---

## 🌟 Key Features

1. **🏥 Hospital Hero & Emergency Triage**
   - 24/7 Eye Trauma emergency banner with one-click direct dialing (`+971 3 700 8000`).
   - Live hospital operations ticker, surgery counters (35,000+ Surgeries, 99.8% Satisfaction), and JCI Gold Seal accreditation.
   - High-impact architectural exterior and surgical theater photography.

2. **🔬 Interactive Online Vision Lab (Self-Screening Suite)**
   - **Snellen 'E' Tumbling Visual Acuity**: Interactive multi-level vision resolution test with directional D-Pad.
   - **Corneal Astigmatism Dial**: Radial spoke symmetry test detecting cylinder blur.
   - **Ishihara Pseudoisochromatic Color Plates**: Red-green color deficiency screening with hidden numeral verification.
   - **Amsler Grid Macular Check**: Central fixation grid screening for wavy lines / blind spots (Macular Degeneration & Diabetic Edema).
   - Generates an instant clinical findings summary with one-click specialist booking transfer.

3. **🩺 Surgical Specialties & Treatments Directory**
   - Femto-LASIK & Carl Zeiss VisuMax 800 SMILE Pro
   - Micro-Incision Cataract Surgery (MICS) with PanOptix Trifocal IOLs
   - 27-Gauge sutureless Vitrectomy & Heidelberg OCT Angiography
   - Selective Laser Trabeculoplasty (SLT) & iStent MIGS Glaucoma Implants
   - Pediatric Squint Realignment & Amblyopia Therapy
   - Cornea Endothelial Transplants (DMEK/DALK) & Keratoconus Cross-Linking

4. **👨‍⚕️ Distinguished Faculty & Eye Surgeons Directory**
   - Fellowship-trained consultants from Moorfields, Johns Hopkins, and Harvard.
   - Filter by specialty, live name search, bio credentials modal, rating stars, and slot availability.

5. **📅 Interactive 4-Step Appointment Booking Wizard**
   - Step 1: Select Eye Specialist & Department.
   - Step 2: Choose preferred Consultation Date & Time Slot.
   - Step 3: Enter Patient Details (Name, Phone, Email, Age, Symptoms).
   - Step 4: Instant Confirmation with unique **Reference Code** (e.g. `AYN-2026-9782`), printable pass, and preparation guidelines.

6. **🔍 Live Appointment Tracking & Self-Service**
   - Patients can enter their booking reference or phone number to retrieve status, date, time, assigned surgeon, and doctor's clinical notes.
   - One-click cancellation with immediate database synchronization.

7. **📊 Staff & Doctor Clinical Management Dashboard**
   - Real-time KPIs: Total Bookings, Confirmed Slots, Completed Consultations, Pending Reviews.
   - Live appointments table with instant status changer (`Confirmed`, `Pending`, `Completed`, `Cancelled`).
   - Inline Doctor Clinical Notes editor for adding diagnoses and prescriptions.
   - Inquiries desk for handling patient messages and emergency requests.

8. **💬 Patient Stories & Verified Testimonials**
   - Verified patient reviews with 5-star ratings and procedure categories.
   - Interactive review submission modal saving directly to MongoDB.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Vanilla CSS (Modern CSS Variables, Glassmorphism), Lucide Icons |
| **Backend** | Node.js, Express.js (ES Modules), Morgan logger, CORS |
| **Database** | MongoDB with Mongoose ODM (includes resilient in-memory fallback store) |
| **Styling** | Ophthalmic medical color palette (Deep Sapphire `#0a1f3d`, Laser Cyan `#0ea5e9`, Sterile Ice `#f8fafc`) |

---

## 🚀 Running the Project Locally

### 1. Backend Server
```bash
cd server
npm install
node seed.js     # Seeds MongoDB with initial doctors, treatments, and reviews
npm start        # Runs on http://localhost:5000
```

### 2. Frontend Application
```bash
cd client
npm install
npm run dev      # Runs on http://localhost:5173
```

- **Frontend URL**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`
