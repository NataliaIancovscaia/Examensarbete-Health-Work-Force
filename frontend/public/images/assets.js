import logo from "./logo.png";
import search_icon from "./search_icon.svg";
import company_icon from "./company_icon.svg";
import microsoft_logo from "./microsoft_logo.svg";
import walmart_logo from "./walmart_logo.svg";
import accenture_logo from "./accenture_logo.png";
import profile_img from "./profile_img.png";
import app_main_img from "./app_main_img.png";
import cross_icon from './cross_icon.svg';
import location_icon from './location_icon.svg';
import money_icon from './money_icon.svg';
import suitcase_icon from './suitcase_icon.svg';
import person_icon from './person_icon.svg';
import upload_area from './upload_area.svg';
import resume_selected from './resume_selected.svg';
import resume_not_selected from './resume_not_selected.svg';
import play_store from './play_store.svg';
import app_store from './app_store.svg';
import back_arrow_icon from './back_arrow_icon.svg';
import left_arrow_icon from './left_arrow_icon.svg';
import right_arrow_icon from './right_arrow_icon.svg';
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import home_icon from './home_icon.svg'
import add_icon from './add_icon.svg'
import profile_upload_icon from './profile_upload_icon.svg'
import person_tick_icon from './person_tick_icon.svg'
import resume_download_icon from './resume_download_icon.svg'
import delete_icon from './delete_icon.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import samsung_logo from './samsung_logo.png'
import adobe_logo from './adobe_logo.png'
import amazon_logo from './amazon_logo.png'

export const assets = {
    logo,
    search_icon,
    cross_icon,
    upload_area,
    company_icon,
    resume_not_selected,
    resume_selected,
    microsoft_logo,
    walmart_logo,
    accenture_logo,
    app_main_img,
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
    samsung_logo,
    adobe_logo,
    amazon_logo
}

export const JobCategories = [
    "Doctors",
    "Dentistry",
    "Pharmaceuticals",
    "Pediatrics",
    "Diagnostics",
    "Nursing staff",
    "Paramedical",
]

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

]


export const manageJobsData = [
    { _id: 1, title: "Dentist-therapist", date: 1760376000000, location: "Norrkoping", applicants: 2 },
    { _id: 2, title: "Surgeon", date: 1760462400000, location: "Jonkoping", applicants: 1 },
    { _id: 3, title: "Pediatric cardiologist", date: 1760548800000, location: "Linkoping", applicants: 3},
    { _id: 4, title: "Laboratory assistant", date: 1760635200000, location: "Orebro", applicants: 2}
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
    }
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
export const jobsData = [
     {
        _id: '1',
        title: "General Practitioner",
        location: "Stockholm",
        level: "Senior Level",
        companyId: {
            _id: "1",
            name: "Karolinska Hospital",
            email: "info@karolinska.se",
            image: company_icon,
        },
        description: `
        <p>We are seeking a highly skilled General Practitioner to provide excellent healthcare services. You will diagnose, treat, and advise patients while working closely with other medical staff to ensure quality care.</p>
        <h2><strong>Key Responsibilities</strong></h2>
        <ol>
            <li>Examine patients and diagnose medical conditions.</li>
            <li>Prescribe medications and treatment plans.</li>
            <li>Coordinate with specialists and nursing staff.</li>
            <li>Maintain patient records accurately.</li>
            <li>Participate in health education and preventive care programs.</li>
        </ol>
        <h2><strong>Skills Required</strong></h2>
        <ol>
            <li>Medical degree with valid license.</li>
            <li>Excellent diagnostic and clinical skills.</li>
            <li>Strong communication and empathy.</li>
            <li>Experience with electronic health records (EHR).</li>
            <li>Ability to work in a fast-paced healthcare environment.</li>
        </ol>
        `,
        salary: 95000,
        date: 1732041600000, 
        category: "Doctors",
    },
    {
        _id: '2',
        title: "Dentist",
        location: "Gothenburg",
        level: "Intermediate Level",
        companyId: {
            _id: "2",
            name: "Gothenburg Dental Clinic",
            email: "contact@gothenburgdental.se",
            image: company_icon,
        },
        description: `
        <p>Provide dental care including diagnosis, treatment, and preventive education. Work with a team to ensure high-quality patient experiences.</p>
        <h2><strong>Key Responsibilities</strong></h2>
        <ol>
            <li>Perform dental exams and procedures.</li>
            <li>Educate patients on oral health.</li>
            <li>Maintain dental records accurately.</li>
            <li>Collaborate with dental hygienists and assistants.</li>
            <li>Stay updated with dental practices and technologies.</li>
        </ol>
        <h2><strong>Skills Required</strong></h2>
        <ol>
            <li>Dental degree with valid license.</li>
            <li>Proficiency in dental procedures and equipment.</li>
            <li>Strong communication and patient care skills.</li>
            <li>Attention to detail and manual dexterity.</li>
            <li>Teamwork and adaptability in a clinical setting.</li>
        </ol>
        `,
        salary: 87000,
        date: 1732128000000,
        category: "Dentistry",
    },
    {
        _id: '3',
        title: "Pharmacist",
        location: "Malmo",
        level: "Senior Level",
        companyId: {
            _id: "3",
            name: "Apoteket Pharmacy",
            email: "hr@apoteket.se",
            image: company_icon,
        },
        description: `
        <p>Responsible for dispensing medications, advising patients, and managing pharmaceutical operations within the pharmacy.</p>
        <h2><strong>Key Responsibilities</strong></h2>
        <ol>
            <li>Dispense prescription and over-the-counter medications.</li>
            <li>Provide advice on drug interactions and usage.</li>
            <li>Maintain inventory and ensure regulatory compliance.</li>
            <li>Collaborate with healthcare providers.</li>
            <li>Stay updated on pharmaceutical advancements.</li>
        </ol>
        <h2><strong>Skills Required</strong></h2>
        <ol>
            <li>Pharmacy degree with license.</li>
            <li>Knowledge of medications and therapeutic guidelines.</li>
            <li>Attention to detail and accuracy.</li>
            <li>Strong communication and counseling skills.</li>
            <li>Team collaboration and problem-solving abilities.</li>
        </ol>
        `,
        salary: 80000,
        date: 1732214400000,
        category: "Pharmaceuticals",
    },
    {
        _id: '4',
        title: "Pediatrician",
        location: "Uppsala",
        level: "Intermediate Level",
        companyId: {
            _id: "4",
            name: "Uppsala Children's Hospital",
            email: "info@uppsalachildren.se",
            image: company_icon,
        },
        description: `
        <p>Provide specialized medical care to infants, children, and adolescents. Work closely with families to ensure comprehensive health management.</p>
        <h2><strong>Key Responsibilities</strong></h2>
        <ol>
            <li>Conduct pediatric examinations and monitor growth and development.</li>
            <li>Diagnose and treat illnesses in children.</li>
            <li>Advise parents on preventive healthcare and nutrition.</li>
            <li>Coordinate with pediatric nurses and specialists.</li>
            <li>Maintain accurate patient records.</li>
        </ol>
        <h2><strong>Skills Required</strong></h2>
        <ol>
            <li>Pediatric medical degree with license.</li>
            <li>Strong diagnostic and clinical skills.</li>
            <li>Excellent communication with children and parents.</li>
            <li>Empathy and patience.</li>
            <li>Experience in pediatric care protocols.</li>
        </ol>
        `,
        salary: 92000,
        date: 1732300800000,
        category: "Pediatrics",
    },
    {
        _id: '5',
        title: "Lab Technician",
        location: "Vasteras",
        level: "Beginner Level",
        companyId: {
            _id: "5",
            name: "Vasteras Diagnostics Lab",
            email: "hr@vasteraslab.se",
            image: company_icon,
        },
        description: `
        <p>Perform laboratory tests, analyze samples, and ensure accurate diagnostic results. Support medical staff with reliable laboratory findings.</p>
        <h2><strong>Key Responsibilities</strong></h2>
        <ol>
            <li>Collect and process patient samples.</li>
            <li>Perform laboratory tests and analyze results.</li>
            <li>Maintain lab equipment and ensure calibration.</li>
            <li>Document results accurately and timely.</li>
            <li>Follow safety and regulatory protocols.</li>
        </ol>
        <h2><strong>Skills Required</strong></h2>
        <ol>
            <li>Degree in medical laboratory technology.</li>
            <li>Knowledge of lab instruments and procedures.</li>
            <li>Attention to detail and precision.</li>
            <li>Ability to work under supervision.</li>
            <li>Good communication and teamwork skills.</li>
        </ol>
        `,
        salary: 60000,
        date: 1732387200000,
        category: "Diagnostics",
    },

   {
    _id: '6',
    title: "Medical Assistant",
    location: "Vasteras",
    level: "Beginner Level",
    companyId: {
        _id: "6",
        name: "Vasteras Diagnostics Lab",
        email: "hr@vasteraslab.se",
        image: company_icon,
    },
    description: `
    <p>Assist healthcare professionals with patient care, basic medical procedures, and administrative tasks. Ensure smooth operations in the clinic or lab setting.</p>
    <h2><strong>Key Responsibilities</strong></h2>
    <ol>
        <li>Prepare patients for examinations and tests.</li>
        <li>Record patient history and vital signs.</li>
        <li>Assist in routine laboratory procedures.</li>
        <li>Maintain patient records and documentation.</li>
        <li>Ensure cleanliness and safety of work area.</li>
    </ol>
    <h2><strong>Skills Required</strong></h2>
    <ol>
        <li>Basic medical knowledge or relevant certification.</li>
        <li>Ability to handle patient interactions professionally.</li>
        <li>Attention to detail and organizational skills.</li>
        <li>Teamwork and communication skills.</li>
        <li>Familiarity with medical documentation procedures.</li>
    </ol>
    `,
    salary: 58000,
    date: 1732387200000,
    category: "Healthcare",
},
{
    _id: '7',
    title: "Clinical Research Coordinator",
    location: "Vasteras",
    level: "Beginner Level",
    companyId: {
        _id: "7",
        name: "Vasteras Diagnostics Lab",
        email: "hr@vasteraslab.se",
        image: company_icon,
    },
    description: `
    <p>Coordinate and support clinical research studies, ensuring accurate data collection and compliance with study protocols. Work closely with research teams and patients.</p>
    <h2><strong>Key Responsibilities</strong></h2>
    <ol>
        <li>Recruit and screen study participants.</li>
        <li>Collect and maintain study data accurately.</li>
        <li>Ensure compliance with regulatory guidelines.</li>
        <li>Prepare study reports and documentation.</li>
        <li>Assist investigators with study procedures.</li>
    </ol>
    <h2><strong>Skills Required</strong></h2>
    <ol>
        <li>Basic understanding of clinical research principles.</li>
        <li>Attention to detail and organizational skills.</li>
        <li>Good communication and teamwork abilities.</li>
        <li>Ability to follow protocols strictly.</li>
        <li>Familiarity with medical terminology is a plus.</li>
    </ol>
    `,
    salary: 62000,
    date: 1732387200000,
    category: "Research",
},
{
    _id: '8',
    title: "Lab Assistant",
    location: "Vasteras",
    level: "Beginner Level",
    companyId: {
        _id: "8",
        name: "Vasteras Diagnostics Lab",
        email: "hr@vasteraslab.se",
        image: company_icon,
    },
    description: `
    <p>Support laboratory operations by preparing samples, maintaining equipment, and assisting technicians. Ensure smooth and efficient lab workflow.</p>
    <h2><strong>Key Responsibilities</strong></h2>
    <ol>
        <li>Prepare and organize lab materials and samples.</li>
        <li>Assist in basic laboratory tests and procedures.</li>
        <li>Maintain cleanliness and order in the lab.</li>
        <li>Document lab activities and results accurately.</li>
        <li>Follow all safety and regulatory guidelines.</li>
    </ol>
    <h2><strong>Skills Required</strong></h2>
    <ol>
        <li>Basic knowledge of laboratory practices.</li>
        <li>Attention to detail and precision.</li>
        <li>Ability to work under supervision.</li>
        <li>Good organizational and teamwork skills.</li>
        <li>Willingness to learn and follow protocols.</li>
    </ol>
    `,
    salary: 57000,
    date: 1732387200000,
    category: "Diagnostics",
},
    
];
