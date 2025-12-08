import express from 'express';
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobes, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMeddleware.js';

const router=express.Router();

//Register company

router.post('/register',upload.single('image'), registerCompany);

//Company logo

 router.post('/login',loginCompany);

//Company data

router.get ('/company',protectCompany,getCompanyData);

//Create a new job

 router.post('/post-job',protectCompany,postJob);

//Job Applicants

router.get ('/applicants',protectCompany,getCompanyJobApplicants);

//Company posted jobs

router.get ('/list-jobs',protectCompany, getCompanyPostedJobes);

//Change Job application status

router.post ('/change-status', protectCompany,changeJobApplicationsStatus);

//Change Job visibility

router.post ('/change-visibility',protectCompany, changeVisibility);

export default router;