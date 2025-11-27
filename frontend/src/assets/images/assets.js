import logo from "./logo.png";
import search_icon from "./search_icon.svg";
import company_icon from "./company_icon.svg";
import accenture_logo from "./accenture_logo.png";
import profile_img from "./profile-image.png"
import cross_icon from './cross_icon.svg';
import location_icon from './location_icon.svg';
import money_icon from './money_icon.svg';
import suitcase_icon from './suitcase_icon.svg';
import person_icon from './person_icon.svg';
import upload_area from './upload_area.svg';
import resume_selected from './resume_selected.svg';
import resume_not_selected from './resume_not_selected.svg';
import play_store from './play_store.svg';
import background from './background1.jpg';
import app_store from './app_store.svg';
import back_arrow_icon from './back_arrow_icon.svg';
import left_arrow_icon from './left_arrow_icon.svg';
import right_arrow_icon from './right_arrow_icon.svg';
import facebook_icon from './facebook_icon.svg';
import instagram_icon from './instagram_icon.svg';
import twitter_icon from './twitter_icon.svg';
import home_icon from './home_icon.svg';
import add_icon from './add_icon.svg';
import profile_upload_icon from './profile_upload_icon.svg';
import person_tick_icon from './person_tick_icon.svg';
import resume_download_icon from './resume_download_icon.svg';
import delete_icon from './delete_icon.svg';
import email_icon from './email_icon.svg';
import lock_icon from './lock_icon.svg';
import adobe_logo from './adobe_logo.png';






// ASSETS EXPORT


export const assets = {
    logo,
     background,
    search_icon,
    cross_icon,
    upload_area,
    company_icon,
    resume_not_selected,
    resume_selected,
    accenture_logo,
    play_store,
    app_store,
    back_arrow_icon,
    left_arrow_icon,
    right_arrow_icon,
    location_icon,
    money_icon,
    suitcase_icon,
    person_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    home_icon,
    add_icon,
    person_tick_icon,
    resume_download_icon,
    profile_img,
    delete_icon,
    profile_upload_icon,
    email_icon,
    lock_icon,   
    adobe_logo,
    
};


// DATA ARRAYS


export const JobCategories = [
    "Doctors",
    "Dentistry",
    "Pharmaceuticals",
    "Pediatrics",
    "Diagnostics",
    "Nursing staff",
    "Paramedical",
];

export const JobLocations = [
    "Stockholm",
    "Gothenburg",
    "Malmo",
    "Uppsala",
    "Vasteras",
    "Orebro",
    "Linkoping",
    "Helsingborg",
    "Jonkoping",
    "Norrkoping",
];

export const manageJobsDate = [
    { _id: 1, title: "Dentist-therapist", date: 1760376000000, location: "Norrkoping", applicants: 2 },
    { _id: 2, title: "Surgeon", date: 1760462400000, location: "Jonkoping", applicants: 1 },
    { _id: 3, title: "Pediatric cardiologist", date: 1760548800000, location: "Linkoping", applicants: 3 },
    { _id: 4, title: "Laboratory assistant", date: 1760635200000, location: "Orebro", applicants: 2 },
];

export const jobsApplied = [
    {
        company: 'Karolinska Institute',
        title: 'General Practitioner',
        category: 'Doctors',
        location: 'Stockholm',
        date: '10 Nov, 2025',
        status: 'Open',
        logo: company_icon
    },
    {
        company: 'Smile Dental Clinic',
        title: 'Dentist',
        category: 'Dentistry',
        location: 'Gothenburg',
        date: '12 Nov, 2025',
        status: 'Pending',
        logo: company_icon
    },
    {
        company: 'AstraZeneca',
        title: 'Pharmacist',
        category: 'Pharmaceuticals',
        location: 'Malmo',
        date: '11 Nov, 2025',
        status: 'Open',
        logo: company_icon
    },
    {
        company: 'ChildCare Hospital',
        title: 'Pediatrician',
        category: 'Pediatrics',
        location: 'Uppsala',
        date: '13 Nov, 2025',
        status: 'Closed',
        logo: company_icon
    },
    {
        company: 'MediLab Diagnostics',
        title: 'Lab Technician',
        category: 'Diagnostics',
        location: 'Vasteras',
        date: '15 Nov, 2025',
        status: 'Open',
        logo: company_icon
    },
    {
        company: 'City Hospital',
        title: 'Registered Nurse',
        category: 'Nursing staff',
        location: 'Orebro',
        date: '14 Nov, 2025',
        status: 'Pending',
        logo: company_icon
    },
    {
        company: 'Rehab Center',
        title: 'Physiotherapist',
        category: 'Paramedical',
        location: 'Linkoping',
        date: '16 Nov, 2025',
        status: 'Open',
        logo: company_icon
    },
];

export const viewApplicationsPageData = [
    { _id: 1, name: "Anna Svensson", jobTitle: "General Practitioner", location: "Stockholm", imgSrc: profile_img, category: "Doctors" },
    { _id: 2, name: "Erik Johansson", jobTitle: "Dentist", location: "Gothenburg", imgSrc: profile_img, category: "Dentistry" },
    { _id: 3, name: "Sara Lindberg", jobTitle: "Pharmacist", location: "Malmo", imgSrc: profile_img, category: "Pharmaceuticals" },
    { _id: 4, name: "Lars Karlsson", jobTitle: "Pediatrician", location: "Uppsala", imgSrc: profile_img, category: "Pediatrics" },
    { _id: 5, name: "Emma Nilsson", jobTitle: "Lab Technician", location: "Vasteras", imgSrc: profile_img, category: "Diagnostics" },
    { _id: 6, name: "Johan Andersson", jobTitle: "Registered Nurse", location: "Orebro", imgSrc: profile_img, category: "Nursing staff" },
    { _id: 7, name: "Karin Olsson", jobTitle: "Physiotherapist", location: "Linkoping", imgSrc: profile_img, category: "Paramedical" },
];

export const siteReviews = [
    {
        _id: "1",
        name: "Anna Svensson",
        role: "General Practitioner",
        rating: "★★★★★",
        comment:
            "The platform helped me find a new job in less than two weeks. The filters and application tracking system are extremely useful.",
        date: "2024-05-22",
       
    },
    {
        _id: "2",
        name: "Erik Johansson",
        role: "Dentist",
               rating: "★★★★★",

        comment:
            "Great website for medical professionals. I received several interview invitations within days.",
        date: "2024-04-30",
        
    },
    {
        _id: "3",
        name: "Sara Lindberg",
        role: "Pharmacist",
        rating: "★★★★★",
        comment:
            "Very smooth experience. Many high-quality job postings and fast responses from employers.",
        date: "2024-03-18",
        
    },
    {
        _id: "4",
        name: "Lars Karlsson",
        role: "Pediatrician",
        rating: "★★★★★",
        comment:
            "The site made my job search so much easier. Found a position that perfectly matched my specialization.",
        date: "2024-02-14",
       
    },
    
     {
        _id: "5",
        employer: "Karolinska Hospital",
        rating: "★★★★★",
        comment:
            "We found several highly qualified candidates through the platform. The hiring process became much faster and more efficient.",
        date: "2024-05-10",
        
    },
    {
        _id: "6",
        employer: "Gothenburg Dental Center",
        rating: "★★★★★",
        comment:
            "Great selection of dental professionals. We filled two vacant positions quickly.",
        date: "2024-04-22",
        
    },
    {
        _id: "7",
        employer: "Apoteket AB",
        rating: "★★★★★",
        comment:
            "Excellent tool for recruiting pharmacists. The candidates we found exceeded our expectations.",
        date: "2024-03-14",
       
    },
    {
        _id: "8",
        employer: "Uppsala Children's Clinic",
         rating: "★★★★★",
        comment:
            "The platform made it easy to review applications and contact pediatric specialists.",
        date: "2024-02-18",
        
    },
    
];


export const jobsData = [
  {
    id: "1",
    title: "General Practitioner",
    location: "Stockholm",
    level: "Senior Level",
    companyId: {
      id: "1",
      name: "Karolinska Hospital",
      email: "info@karolinska.se",
      image: company_icon,
    },
    description: `
      <p>
        As a General Practitioner, you will become the first sentinel of care — a clinician whose expertise forms the cornerstone upon which patients of all generations rest their trust. This role demands not only diagnostic precision but a profound understanding of the human pulse behind every symptom. You will operate in a high-velocity, technologically empowered clinical ecosystem, where prevention, early detection, and long-term patient stewardship intertwine to form a seamless continuum of healthcare.
      </p>

      <h4>Core Clinical Duties:</h4>
      <ul>
        <li>Conduct comprehensive medical examinations, capture detailed patient histories, and perform evidence-based clinical assessments.</li>
        <li>Diagnose and treat an extensive spectrum of conditions — acute, chronic, viral, metabolic, cardiovascular, or psychosomatic.</li>
        <li>Design patient-specific treatment pathways, adjusting plans dynamically to medical response, safety margins, and quality-of-life expectations.</li>
        <li>Educate patients on preventive strategies, lifestyle medicine, pharmacological effects, and long-term health maintenance.</li>
        <li>Maintain meticulous clinical documentation, preserving confidentiality, medical legality, and data precision.</li>
        <li>Coordinate referrals to specialists, ensuring continuity rather than interruption of care.</li>
      </ul>

      <h4>Professional Requirements:</h4>
      <ul>
        <li>Valid Swedish Medical License (Legitimerad Läkare) approved by national healthcare authority.</li>
        <li>Advanced clinical reasoning, strong leadership in multidisciplinary flows, and steady decision-making under pressure.</li>
        <li>Empathy, adaptability, communicative clarity, and the ability to translate medical complexity into patient comprehension.</li>
      </ul>

      <p>
        Beyond the consultation room, Karolinska opens corridors into academic horizons — allowing you to mentor medical students, participate in collaborative clinical research, and contribute to modernizing Swedish primary healthcare models. This is more than a profession; it is a journey from clinical rigor to intellectual legacy.
      </p>
      <p><em>Annual salary estimate is listed approximately in SEK.</em></p>
    `,
    salary: 95000,
    date: 1732041600000,
    category: "Doctors",
  },

  {
    id: "2",
    title: "Dentist",
    location: "Gothenburg",
    level: "Intermediate Level",
    companyId: {
      id: "2",
      name: "Gothenburg Dental Clinic",
      email: "contact@gothenburgdental.se",
      image: company_icon,
    },
    description: `
      <p>
        The Dentist is a craftsman of structure and aesthetic brilliance — a medical artisan sculpting health through precision and restoring confidence through science-guided design. In this role, you will navigate the delicate equilibrium between biological preservation and visual harmony, turning complex restorative procedures into enduring architectural triumphs of oral healthcare.
      </p>

      <h4>Essential Responsibilities:</h4>
      <ul>
        <li>Perform thorough dental diagnostics including digital radiography, 3D scans, and CBCT interpretation.</li>
        <li>Execute restorative and surgical interventions such as crowns, bridges, implants, extractions, and enamel reconstruction.</li>
        <li>Develop longitudinal treatment plans centered on disease prevention, periodontal stability, and structural longevity.</li>
        <li>Guide patients in evidence-based oral hygiene, post-surgical care, and lifestyle impact on dental health.</li>
        <li>Work collaboratively with hygienists and assistants while maintaining premium sterilization and safety standards.</li>
      </ul>

      <h4>Required Qualifications:</h4>
      <ul>
        <li>Swedish Dental License (Legitimerad Tandläkare).</li>
        <li>Experience with CAD/CAM systems, laser-assisted treatment, and digital patient-record platforms.</li>
      </ul>

      <p>
        The clinic encourages continuous professional evolution: specialized training, conference participation, and research exposure in emerging domains such as regenerative therapies, implantology, and cosmetic-driven occlusion reconstruction. Here, you polish both teeth and reputation.
      </p>
      <p><em>Salary listed approximately in SEK per year.</em></p>
    `,
    salary: 87000,
    date: 1732128000000,
    category: "Dentistry",
  },

  {
    id: "3",
    title: "Pharmacist",
    location: "Malmo",
    level: "Senior Level",
    companyId: {
      id: "3",
      name: "Apoteket Pharmacy",
      email: "hr@apoteket.se",
      image: company_icon,
    },
    description: `
      <p>
        The Pharmacist stands as the final guardian before treatment reaches human physiology — a professional whose vigilance preserves safety where even microscopic miscalculations are too large to allow. You will serve at the intersection of clinical pharmacology and patient education — a translator of chemical complexity into safe, intelligible, and life-improving medical guidance.
      </p>

      <h4>Key Responsibilities:</h4>
      <ul>
        <li>Verify and dispense prescriptions with unimpeachable accuracy.</li>
        <li>Advise on therapeutic effects, drug compatibility, dosage safety, and interaction risks.</li>
        <li>Manage pharmaceutical inventory, digital prescription flows, and compliance documentation.</li>
        <li>Preserve adherence to Swedish pharmaceutical regulatory frameworks and medical ethics.</li>
      </ul>

      <p>
        Apoteket offers progression into specialized clinical consultancy such as oncology pharmacy guidance, pediatric pharmacology, geriatric drug-plan auditing, or regional pharmacy operations leadership. This is a role of prevention, not just distribution — preventing harm by delivering knowledge.
      </p>
      <p><em>Salary listed approximately in SEK per year.</em></p>
    `,
    salary: 80000,
    date: 1732214400000,
    category: "Pharmaceuticals",
  },

  {
    id: "4",
    title: "Pediatrician",
    location: "Uppsala",
    level: "Intermediate Level",
    companyId: {
      id: "4",
      name: "Uppsala Children's Hospital",
      email: "info@uppsalachildren.se",
      image: company_icon,
    },
    description: `
      <p>
        The Pediatrician is a voyager into the most transformative phase of human development — where diagnosis is intertwined with nurture, and treatment resonates beyond the patient into entire constellations of family and caregivers. In this role, every heartbeat is both a medical datum and a promise of a future you help safeguard.
      </p>

      <h4>Core Duties:</h4>
      <ul>
        <li>Diagnose and treat acute and chronic pathologies in children from infancy to adolescence.</li>
        <li>Monitor developmental, neurological, endocrinological, and immunological milestones.</li>
        <li>Partner with pediatric nurses and specialized research teams.</li>
        <li>Provide parental coaching on treatment, preventive immunity, and long-term wellbeing.</li>
      </ul>

      <p>
        The hospital nurtures your growth toward neonatology, pediatric cardiology, allergy-focused care, or medical-education leadership programs — allowing your influence to expand from patient care to shaping Sweden's pediatric standards for generations yet to smile, speak, and thrive.
      </p>
      <p><em>Salary listed approximately in SEK per year.</em></p>
    `,
    salary: 92000,
    date: 1732300800000,
    category: "Pediatrics",
  },

  {
    id: "5",
    title: "Lab Technician",
    location: "Vasteras",
    level: "Beginner Level",
    companyId: {
      id: "5",
      name: "Vasteras Diagnostics Lab",
      email: "hr@vasteraslab.se",
      image: company_icon,
    },
    description: `
      <p>
        The Laboratory Technician is the cartographer of microscopic truths — decoding the silent languages of biology into data that dictates medical action. This role operates in a precision-driven laboratory orchestra, where instrumentation, sterility, documentation, and analytical discipline perform a synchronized ballet to uncover diagnostic certainty.
      </p>

      <h4>Responsibilities:</h4>
      <ul>
        <li>Prepare, process, and analyze biological samples using modern diagnostic machinery.</li>
        <li>Calibrate, operate, and maintain sophisticated instrumentation.</li>
        <li>Document findings systematically for clinical and research usage.</li>
        <li>Perform fully aligned with biosafety and regulatory protocols.</li>
      </ul>

      <p>
        This position is an academic seedbed — offering training, internal ladder growth into biomedical analysis, data-centric laboratory specialties, or quality-assurance coordination. Here, knowledge evolves, accuracy defines you, and measurement becomes medicine.
      </p>
      <p><em>Salary estimate listed approximately per year in SEK.</em></p>
    `,
    salary: 60000,
    date: 1732387200000,
    category: "Diagnostics",
  },

  {
    id: "6",
    title: "Medical Assistant",
    location: "Vasteras",
    level: "Beginner Level",
    companyId: {
      id: "7",
      name: "Vasteras Diagnostics Lab",
      email: "hr@vasteraslab.se",
      image: company_icon,
    },
    description: `
      <p>
        The Medical Assistant is the connective tissue of clinical rhythm — an essential counterpart to physicians whose role ensures patient care is not disrupted by logistics but empowered by it. This is a position where clinical fundamentals meet structured administration — building order, trust, comfort, and efficiency into the scaffolding of medical environments.
      </p>

      <h4>Duties:</h4>
      <ul>
        <li>Collect patient vitals and medical histories.</li>
        <li>Assist in examinations and clinical procedures.</li>
        <li>Perform medical administration, data entry, and clinic flow coordination.</li>
        <li>Maintain clinical hygiene and assist procedural readiness.</li>
      </ul>

      <p>
        Training is offered as a launchpad for advancement into clinical nursing programs, administrative medical data coordination, or research-focused assistant roles. Here, medicine leans on your hands before it trusts the instruments.
      </p>
    `,
    salary: 58000,
    date: 1732387200000,
    category: "Healthcare",
  },

  {
    id: "7",
    title: "Clinical Research Coordinator",
    location: "Vasteras",
    level: "Beginner Level",
    companyId: {
      id: "7",
      name: "Vasteras Diagnostics Lab",
      email: "hr@vasteraslab.se",
      image: company_icon,
    },
    description: `
      <p>
        The Clinical Research Coordinator is a sentinel of scientific exactitude — a role that governs the ethical cadence between patient participants, research documentation, clinical timelines, and compliance directives. You become the architect of research integrity — where schedules are not mere time, they are pathways, and data is not static, it is destiny measured.
      </p>

      <h4>Responsibilities:</h4>
      <ul>
        <li>Manage participant scheduling and study documentation.</li>
        <li>Maintain clinical research logs and databases.</li>
        <li>Ensure ethical and regulatory adherence.</li>
        <li>Communicate between clinical teams and research participants.</li>
      </ul>

      <p>
        This role is a key entry point into clinical science careers, offering progression toward CRO communication specialization, medical data management, clinical auditing, or full research program leadership. Here, medicine evolves — and you ensure it evolves correctly.
      </p>
    `,
    salary: 62000,
    date: 1732387200000,
    category: "Research",
  },

  {
    id: "8",
    title: "Lab Assistant",
    location: "Vasteras",
    level: "Beginner Level",
    companyId: {
      id: "7",
      name: "Vasteras Diagnostics Lab",
      email: "hr@vasteraslab.se",
      image: company_icon,
    },
    description: `
      <p>
        The Lab Assistant is a steward of foundational accuracy — supporting the laboratory engine that transforms samples into answers. This is a role where scientific precision meets operational flow — labeling, preparing, and safeguarding the environment that high-stakes diagnostics depend on.
      </p>

      <h4>Duties:</h4>
      <ul>
        <li>Label and structure biological samples.</li>
        <li>Maintain equipment hygiene and assist procedural preparation.</li>
        <li>Support technicians mid-analysis.</li>
        <li>Adhere to safety and protocol regulations.</li>
      </ul>

      <p>
        This role provides training and growth toward full lab-technical careers, data analysis specialization, and quality control coordination. Here, knowledge becomes microscope, and microscope becomes medicine.
      </p>
    `,
    salary: 57000,
    date: 1732387200000,
    category: "Diagnostics",
  },

 {
    id: "9",
    title: "Clinic Assistant",
    location: "Vasteras",
    level: "Beginner Level",
    companyId: {
      id: "7",
      name: "Vasteras Diagnostics Lab",
      email: "hr@vasteraslab.se",
      image: company_icon,
    },
    description: `
      <p>
        The Lab Assistant is a steward of foundational accuracy — supporting the laboratory engine that transforms samples into answers. This is a role where scientific precision meets operational flow — labeling, preparing, and safeguarding the environment that high-stakes diagnostics depend on.
      </p>

      <h4>Duties:</h4>
      <ul>
        <li>Label and structure biological samples.</li>
        <li>Maintain equipment hygiene and assist procedural preparation.</li>
        <li>Support technicians mid-analysis.</li>
        <li>Adhere to safety and protocol regulations.</li>
      </ul>

      <p>
        This role provides training and growth toward full lab-technical careers, data analysis specialization, and quality control coordination. Here, knowledge becomes microscope, and microscope becomes medicine.
      </p>
    `,
    salary: 57000,
    date: 1732387200000,
    category: "Diagnostics",
  },

]