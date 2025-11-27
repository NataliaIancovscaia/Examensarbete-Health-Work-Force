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


export const jobsData= [
    {
        id: '1',
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
        The General Practitioner provides comprehensive medical care to patients of all ages. This role requires excellent diagnostic abilities, strong communication skills, and the ability to manage both acute and chronic health conditions. You will be responsible for assessing patient needs, offering preventive care, and supporting patients through various stages of treatment.
        <p><strong>Employee Responsibilities:</strong><br/>
        -Conduct routine checkups and perform physical examinations.<br/>

Diagnose and treat a broad range of medical issues.<br/>

Create treatment plans and provide follow-up care.<br/>

Educate patients on health maintenance and disease prevention.<br/>

Maintain accurate and confidential patient records.<br/>

Refer patients to specialists when necessary.<br/>
        <p><strong>Other Information:</strong><br/>
        A valid Swedish medical license is required. This role offers opportunities for career development and involvement in ongoing medical research projects.
        `,
        salary: 95000,
        date: 1732041600000,
        category: "Doctors",
    },
    {
        id: '2',
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
         Provide dental care, perform diagnoses, and carry out restorative and preventive procedures. You will work closely with dental assistants and hygienists to deliver high-quality patient care.</p>
        <p><strong>Employee Responsibilities:</strong><br/>
        - Conduct dental examinations and interpret X-rays.<br/>
        - Perform fillings, extractions, crowns, and other treatments.<br/>
        - Educate patients on oral hygiene and preventive care.<br/>
        - Maintain sterilization standards and clinic protocols.</p>
        <p><strong>Other Information:</strong><br/>
        - Experience with modern dental equipment preferred.<br/>
        - Continuing education support provided.<br/>
        - Must hold a Swedish dental license.</p>
        `,
        salary: 87000,
        date: 1732128000000,
        category: "Dentistry",
    },
    {
        id: '3',
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
       Responsible for dispensing medications, providing pharmaceutical advice, and ensuring customers receive safe and accurate prescriptions. Requires strong attention to detail and knowledge of drug interactions.</p>
        <p><strong>Employee Responsibilities:</strong><br/>
        - Review and process prescriptions accurately.<br/>
        - Provide guidance on medication use and side effects.<br/>
        - Assist in inventory management and stock ordering.<br/>
        - Ensure regulatory compliance within the pharmacy.</p>
        <p><strong>Other Information:</strong><br/>
        - Opportunities for training and specialization.<br/>
        - Modern pharmacy environment.<br/>
        - Requires certified pharmacist credentials in Sweden.</p>
        `,
        salary: 80000,
        date: 1732214400000,
        category: "Pharmaceuticals",
    },
    {
        id: '4',
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
       Provide specialized medical care to infants, children, and adolescents. The role involves diagnosing childhood illnesses, offering treatment, and guiding parents on child health and development.</p>
        <p><strong>Employee Responsibilities:</strong><br/>
        - Conduct pediatric examinations and developmental assessments.<br/>
        - Treat acute and chronic childhood conditions.<br/>
        - Work collaboratively with nurses and pediatric specialists.<br/>
        - Communicate effectively with families and caregivers.</p>
        <p><strong>Other Information:</strong><br/>
        - Child-friendly environment with modern equipment.<br/>
        - Support for pediatric-related research.<br/>
        - Requires a pediatric specialization license.</p>
        `,
        salary: 92000,
        date: 1732300800000,
        category: "Pediatrics",
    },
    {
        id: '5',
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
         Perform laboratory tests and assist in sample preparation and analysis. You will work under senior lab specialists to ensure accurate test results.</p>
        <p><strong>Employee Responsibilities:</strong><br/>
        - Prepare biological samples.<br/>
        - Operate laboratory equipment.<br/>
        - Record and organize test data.<br/>
        - Follow all safety and sterilization procedures.</p>
        <p><strong>Other Information:</strong><br/>
        - Entry-level role with training available.<br/>
        - Requires basic laboratory knowledge.<br/>
        - Opportunities for internal career growth.</p>
        `,
        salary: 60000,
        date: 1732387200000,
        category: "Diagnostics",
    },
    {
        id: '6',
        title: "Medical Assistant",
        location: "Vasteras",
        level: "Beginner Level",
        companyId: {
            id: "6",
            name: "Vasteras Diagnostics Lab",
            email: "hr@vasteraslab.se",
            image: company_icon,
        },
        description: `
        Assist healthcare professionals in patient care, record keeping, and routine clinical tasks.</p>
        <p><strong>Employee Responsibilities:</strong><br/>
        - Take patient vitals and record medical history.<br/>
        - Support patient examinations.<br/>
        - Handle administrative tasks.<br/>
        - Maintain cleanliness within clinical areas.</p>
        <p><strong>Other Information:</strong><br/>
        - Ideal for individuals starting a medical career.<br/>
        - On-the-job training provided.<br/>
        - Requires strong interpersonal skills.</p>
        `,
        salary: 58000,
        date: 1732387200000,
        category: "Healthcare",
    },
    {
        id: '7',
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
        Coordinate and support clinical research studies, ensuring compliance and accurate data collection.</p>
        <p><strong>Employee Responsibilities:</strong><br/>
        - Assist with study documentation and participant scheduling.<br/>
        - Maintain research databases and logs.<br/>
        - Communicate with research teams and participants.<br/>
        - Ensure studies meet ethical and regulatory standards.</p>
        <p><strong>Other Information:</strong><br/>
        - Great entry point into clinical research.<br/>
        - Training in research protocols included.<br/>
        - Requires strong organizational skills.</p>
        `,
        salary: 62000,
        date: 1732387200000,
        category: "Research",
    },
    {
        id: '8',
        title: "Lab Assistant",
        location: "Vasteras",
        level: "Beginner Level",
        companyId: {
            id: "8",
            name: "Vasteras Diagnostics Lab",
            email: "hr@vasteraslab.se",
            image: company_icon,
        },
        description: `
        Support laboratory operations through sample handling, equipment cleaning, and general lab maintenance.</p>
        <p><strong>Employee Responsibilities:</strong><br/>
        - Label and organize samples.<br/>
        - Assist lab technicians during tests.<br/>
        - Maintain equipment cleanliness.<br/>
        - Follow safety and quality standards.</p>
        <p><strong>Other Information:</strong><br/>
        - Suitable for entry-level laboratory workers.<br/>
        - Basic scientific knowledge required.<br/>
        - Opportunities for advancement to technician roles.</p>
        `,
        salary: 57000,
        date: 1732387200000,
        category: "Diagnostics",
    },


];
