export const initialDoctors = [
  {
    name: "Dr. Tariq Al-Mansoor",
    title: "Chief of Ophthalmology & Medical Director",
    specialty: "Cataract & Refractive Surgery",
    department: "Refractive Surgery & Cornea",
    degrees: ["MBBS", "MD (Ophthalmology)", "FRCOphth (London)", "Fellowship in Cornea (Johns Hopkins)"],
    experience: 22,
    rating: 4.98,
    reviewsCount: 380,
    photo: "/images/chief_surgeon.jpg",
    bio: "Dr. Tariq is an internationally recognized pioneer in custom Femto-LASIK, SMILE Pro, and premium trifocal intraocular lens implants. With over 20,000 successful refractive procedures, he has served as chair of the Middle East Cornea Society.",
    languages: ["English", "Arabic", "French"],
    consultationFee: 120,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"],
    availableSlots: ["09:00 AM", "10:30 AM", "11:45 AM", "02:30 PM", "04:00 PM"],
    isFeatured: true
  },
  {
    name: "Dr. Sarah Jenkins",
    title: "Senior Consultant Vitreoretinal Surgeon",
    specialty: "Vitreoretinal Diseases & Macular Surgery",
    department: "Retina & Vitreous Center",
    degrees: ["MBBS (Hons)", "MS (Ophthalmology)", "FACS", "Fellowship in Surgical Retina (Moorfields)"],
    experience: 18,
    rating: 4.95,
    reviewsCount: 290,
    photo: "/images/retina_specialist.jpg",
    bio: "Specializing in diabetic retinopathy, macular holes, retinal detachment repairs, and age-related macular degeneration (AMD). Dr. Sarah is renowned for micro-incision 27-gauge vitrectomy with rapid visual recovery.",
    languages: ["English", "Arabic", "German"],
    consultationFee: 110,
    availableDays: ["Sunday", "Tuesday", "Wednesday", "Thursday"],
    availableSlots: ["09:30 AM", "11:00 AM", "01:30 PM", "03:30 PM", "05:00 PM"],
    isFeatured: true
  },
  {
    name: "Dr. Zaid Al-Hashimi",
    title: "Director of Glaucoma & Advanced Diagnostics",
    specialty: "Glaucoma & Optic Nerve Disorders",
    department: "Glaucoma & Anterior Segment",
    degrees: ["MD", "PhD (Neuro-ophthalmology)", "Fellowship in Glaucoma (Harvard Medical School)"],
    experience: 16,
    rating: 4.92,
    reviewsCount: 215,
    photo: "/images/slit_lamp_exam.jpg",
    bio: "Expert in minimally invasive glaucoma surgery (MIGS), selective laser trabeculoplasty (SLT), and complex filtration valves. Dedicated to early detection and preservation of the visual field.",
    languages: ["English", "Arabic"],
    consultationFee: 105,
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday"],
    availableSlots: ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
    isFeatured: true
  },
  {
    name: "Dr. Elena Rostova",
    title: "Head of Pediatric Ophthalmology & Strabismus",
    specialty: "Pediatric Ophthalmology & Squint",
    department: "Pediatric Eye Center",
    degrees: ["MD", "Specialization in Pediatric Ophthalmology (King's College London)", "DNB"],
    experience: 14,
    rating: 4.97,
    reviewsCount: 260,
    photo: "/images/chief_surgeon.jpg",
    bio: "Passionate about children's vision health, treating lazy eye (amblyopia), congenital cataracts, pediatric refractive errors, and complex squint corrections using adjustable sutures.",
    languages: ["English", "Russian", "Arabic"],
    consultationFee: 95,
    availableDays: ["Sunday", "Monday", "Wednesday", "Saturday"],
    availableSlots: ["09:00 AM", "10:15 AM", "12:00 PM", "03:00 PM"],
    isFeatured: false
  },
  {
    name: "Dr. Kareem Mansour",
    title: "Oculoplastic & Orbital Reconstructive Surgeon",
    specialty: "Oculoplastics & Aesthetic Eyelid Surgery",
    department: "Oculofacial Plastics",
    degrees: ["MBBS", "FRCS (Glasgow)", "Fellowship in Oculoplastic Surgery (UCLA)"],
    experience: 15,
    rating: 4.90,
    reviewsCount: 180,
    photo: "/images/hospital_facade.jpg",
    bio: "Subspecialized in blepharoplasty, ptosis correction, tear duct obstructions (DCR), and orbital trauma reconstruction, combining delicate microsurgical technique with cosmetic refinement.",
    languages: ["English", "Arabic"],
    consultationFee: 115,
    availableDays: ["Tuesday", "Thursday", "Friday", "Saturday"],
    availableSlots: ["10:30 AM", "01:00 PM", "03:00 PM", "05:30 PM"],
    isFeatured: false
  }
];

export const initialServices = [
  {
    name: "Femto-LASIK & SMILE Pro",
    category: "Refractive Surgery",
    tagline: "Blade-Free Precision Laser Vision Correction",
    shortDesc: "Eliminate glasses and contact lenses with Carl Zeiss VisuMax 800 high-speed femtosecond laser technology in under 10 minutes.",
    fullDesc: "Our state-of-the-art refractive surgery suite offers flapless SMILE Pro and customized wavefront-guided Femto-LASIK. By mapping over 22,000 elevation points on your cornea, we sculpt the surface to achieve high-definition 20/20 or better visual acuity with zero blade incisions.",
    icon: "Laser",
    image: "/images/laser_surgery.jpg",
    duration: "10-15 minutes both eyes",
    recoveryTime: "Clear vision in 24 hours",
    benefits: [
      "100% blade-free laser precision",
      "Painless procedure with rapid corneal healing",
      "Minimal dry eye risk compared to traditional LASIK",
      "Next-day return to work & driving"
    ],
    idealFor: [
      "Myopia (Nearsightedness) up to -10.00D",
      "Astigmatism up to -5.00D",
      "Hyperopia (Farsightedness) up to +5.00D",
      "Active individuals & athletes seeking glasses-free freedom"
    ],
    technology: "Zeiss VisuMax 800 & Schwind Amaris 1050RS",
    startingPrice: "$1,450"
  },
  {
    name: "Micro-Incision Cataract Surgery (MICS)",
    category: "Cataract Care",
    tagline: "Custom Multifocal & Toric Intraocular Lens Implantation",
    shortDesc: "Gentle ultrasound phacoemulsification through a 1.8mm micro-incision to replace clouded lenses with crystal-clear trifocal intraocular lenses.",
    fullDesc: "Cataracts are removed in minutes under topical eye drops without stitches, injections, or bandages. We offer advanced Toric, Extended Depth of Focus (EDOF), and PanOptix Trifocal lenses that restore both distance, intermediate (computer), and near reading vision.",
    icon: "Eye",
    image: "/images/slit_lamp_exam.jpg",
    duration: "15 minutes per eye",
    recoveryTime: "Immediate vision improvement, full recovery in 3-5 days",
    benefits: [
      "No stitches, needles, or patches required",
      "Restores reading, digital screen, and night driving vision",
      "Corrects pre-existing astigmatism in the same session",
      "Alcon Centurion active fluidics for maximum safety"
    ],
    idealFor: [
      "Patients with cloudy or blurry vision, night glare, or dull colors",
      "Patients over 50 experiencing advancing cataract changes",
      "Those who desire total freedom from bifocal glasses"
    ],
    technology: "Alcon Centurion Vision System & VERION Image Guided System",
    startingPrice: "$1,800"
  },
  {
    name: "Advanced Vitreoretinal Care & Macular Clinic",
    category: "Retina & Vitreous",
    tagline: "Sub-millimeter Micro-Vitrectomy & Anti-VEGF Therapy",
    shortDesc: "Specialized diagnostics and surgical solutions for diabetic retinopathy, retinal detachment, macular degeneration (AMD), and floaters.",
    fullDesc: "Equipped with Heidelberg Spectralis OCT angiography and 3D digital heads-up visualization, our retina suite delivers intravitreal injections (Eylea, Vabysmo), micropulse retinal laser therapy, and sutureless 27G vitrectomy with the highest success rates.",
    icon: "ShieldAlert",
    image: "/images/slit_lamp_exam.jpg",
    duration: "30-60 minutes depending on procedure",
    recoveryTime: "1-2 weeks for surgery, immediate for outpatient injections",
    benefits: [
      "Ultra-high resolution 3D retinal tomograms",
      "Emergency same-day retinal detachment intervention",
      "Preservation and recovery of central reading vision",
      "Minimally invasive sutureless surgical access"
    ],
    idealFor: [
      "Diabetic patients with blurry vision or retinal bleeding",
      "Sudden flashes of light or sudden shower of floaters",
      "Distorted wavy lines on Amsler grid (Macular degeneration)",
      "Retinal vein occlusion"
    ],
    technology: "Heidelberg Spectralis OCT & Constellation 27G Vitrectomy",
    startingPrice: "$750"
  },
  {
    name: "Glaucoma Early Detection & Laser Surgery",
    category: "Glaucoma Care",
    tagline: "Protecting Your Optic Nerve Before Symptoms Arise",
    shortDesc: "Selective Laser Trabeculoplasty (SLT), iStent MIGS implants, and computerized visual field testing to halt progressive vision loss.",
    fullDesc: "Known as the 'silent thief of sight', glaucoma demands rigorous pressure monitoring. We specialize in non-thermal SLT laser therapy which reduces intraocular pressure safely without daily drop dependence, alongside minimally invasive glaucoma shunt implants.",
    icon: "Activity",
    image: "/images/laser_surgery.jpg",
    duration: "10-20 minutes",
    recoveryTime: "Same day normal activities",
    benefits: [
      "Reduces or eliminates reliance on prescription eye drops",
      "Painless in-clinic laser treatment with no downtime",
      "Early optical nerve fiber layer thickness tracking",
      "Prevents irreversible peripheral vision damage"
    ],
    idealFor: [
      "Patients with elevated eye pressure (ocular hypertension)",
      "Individuals with a family history of glaucoma",
      "Patients struggling with eye drop side-effects or compliance"
    ],
    technology: "Humphrey HFA3 Visual Field Analyzer & Ellex Tango Reflex SLT",
    startingPrice: "$600"
  },
  {
    name: "Pediatric Eye Care & Squint Rehabilitation",
    category: "Pediatric Ophthalmology",
    tagline: "Gentle, Child-Friendly Diagnostics & Vision Restoration",
    shortDesc: "Dedicated pediatric wing for amblyopia (lazy eye), congenital tear duct obstruction, refractive errors in toddlers, and strabismus surgery.",
    fullDesc: "Children's vision systems develop rapidly up to age 8. Our warm, child-friendly suite features video pupillometry, orthoptic vision therapy, and precision squint realignment to ensure both eyes develop synchronized binocular depth perception.",
    icon: "HeartPulse",
    image: "/images/chief_surgeon.jpg",
    duration: "Comprehensive child evaluation 45 minutes",
    recoveryTime: "Same day play / 3 days post-squint surgery",
    benefits: [
      "Child-friendly sensory testing rooms with zero anxiety",
      "Early amblyopia therapy before permanent vision deficit",
      "Modern adjustable suture squint correction",
      "Custom specialized pediatric orthoptics"
    ],
    idealFor: [
      "Crossed or wandering eyes in infants and children",
      "Squinting, head-tilting, or rubbing eyes while reading",
      "School vision screening failures or learning difficulties"
    ],
    technology: "Plusoptix S12 Vision Screener & Synoptophore",
    startingPrice: "$120"
  },
  {
    name: "Cornea Transplant & Keratoconus Cross-Linking",
    category: "Cornea Care",
    tagline: "Restoring Optical Clarity with Modern Endothelial Lamellar Keratoplasty",
    shortDesc: "Advanced accelerated CXL cross-linking, Intacs ring segments, and ultra-thin endothelial transplants (DMEK/DSAEK).",
    fullDesc: "Our Cornea Center provides cutting-edge corneal cross-linking (KXL) to permanently halt keratoconus progression in young adults, and micro-layer DMEK transplants where only a 15-micron diseased cell layer is replaced rather than the entire cornea.",
    icon: "Sparkles",
    image: "/images/hospital_facade.jpg",
    duration: "30-45 minutes",
    recoveryTime: "Rapid visual rehabilitation within 1-2 weeks",
    benefits: [
      "Halts conical corneal bulging in keratoconus",
      "DMEK provides 98% graft clarity with minimal rejection risk",
      "Custom scleral lens fitting lab on-site",
      "International eye-bank certified donor tissues"
    ],
    idealFor: [
      "Progressive keratoconus patients",
      "Fuchs' endothelial corneal dystrophy",
      "Corneal scarring from past infections or injuries"
    ],
    technology: "Avedro KXL Accelerated Cross-Linking & Haag-Streit Lenstar",
    startingPrice: "$1,950"
  }
];

export const initialReviews = [
  {
    patientName: "Rashid Al-Nuaimi",
    location: "Al Ain, UAE",
    treatment: "SMILE Pro Laser Vision Correction",
    doctorName: "Dr. Tariq Al-Mansoor",
    rating: 5,
    comment: "I had -6.50 diopters in both eyes since childhood. Dr. Tariq and the team at Al Ayn Eye Hospital made the SMILE procedure feel effortless. The procedure took less than 15 minutes, zero pain, and next morning I woke up with 20/15 HD vision! The facility is like a 7-star hotel with the world's best ophthalmic technology.",
    date: "October 14, 2026",
    verified: true
  },
  {
    patientName: "Mariam Al-Kaabi",
    location: "Abu Dhabi",
    treatment: "Trifocal Cataract Surgery",
    doctorName: "Dr. Tariq Al-Mansoor",
    rating: 5,
    comment: "My mother could barely read her Quran and had severe glare at night. Dr. Tariq implanted trifocal lenses. She can now read tiny print without glasses and drives with complete confidence. The compassion and professionalism of the nursing staff are unmatched.",
    date: "September 28, 2026",
    verified: true
  },
  {
    patientName: "David Henderson",
    location: "Dubai",
    treatment: "Retinal Detachment Repair & Vitrectomy",
    doctorName: "Dr. Sarah Jenkins",
    rating: 5,
    comment: "I arrived at the Al Ayn 24/7 Emergency Center with sudden curtain shadows across my right eye. Dr. Sarah Jenkins operated on me that exact night and saved my sight. Her surgical expertise and reassuring bedside manner are world-class.",
    date: "August 19, 2026",
    verified: true
  },
  {
    patientName: "Fatima Al-Dhaheri",
    location: "Al Ain, UAE",
    treatment: "Pediatric Squint Correction",
    doctorName: "Dr. Elena Rostova",
    rating: 5,
    comment: "Our 5-year-old daughter was born with inward strabismus. Dr. Elena handled her with unbelievable warmth and gentleness. The surgery aligned her eyes perfectly and now she has full 3D stereo vision. We are eternally grateful to Al Ayn Eye Hospital.",
    date: "July 22, 2026",
    verified: true
  }
];

export const sampleAppointments = [
  {
    bookingReference: "AYN-2026-9041",
    patientName: "Omar Khalifa",
    email: "omar.khalifa@example.com",
    phone: "+971 50 123 4567",
    age: 32,
    gender: "Male",
    doctorName: "Dr. Tariq Al-Mansoor",
    specialty: "Cataract & Refractive Surgery",
    appointmentDate: "2026-10-26",
    timeSlot: "10:30 AM",
    symptoms: "Interested in SMILE Pro laser surgery consultation and corneal topography check.",
    isFirstVisit: true,
    status: "Confirmed",
    doctorNotes: "Requested suitability evaluation for SMILE Pro."
  },
  {
    bookingReference: "AYN-2026-7812",
    patientName: "Ayesha Sultan",
    email: "ayesha.s@example.com",
    phone: "+971 52 987 6543",
    age: 58,
    gender: "Female",
    doctorName: "Dr. Sarah Jenkins",
    specialty: "Vitreoretinal Diseases & Macular Surgery",
    appointmentDate: "2026-10-27",
    timeSlot: "11:00 AM",
    symptoms: "Diabetic retinopathy follow-up and OCT macular evaluation.",
    isFirstVisit: false,
    status: "Confirmed",
    doctorNotes: "Routine 6-month OCT angiography check."
  }
];
