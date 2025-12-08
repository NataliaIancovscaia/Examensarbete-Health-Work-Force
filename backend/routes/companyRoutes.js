import express from 'express';
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobes, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';

const router=express.Router();

//Register company

router.post('/register',upload.single('image'), registerCompany);

//Company logo

 router.post('/login',loginCompany);

//Company data

router.get ('/company',getCompanyData);

//Create a new job

 router.post('/post-job',postJob);

//Job Applicants

router.get ('/applicants',getCompanyJobApplicants);

//Company posted jobs

router.get ('/list-jobs', getCompanyPostedJobes);

//Change Job application status

router.post ('/change-status', changeJobApplicationsStatus);

//Change Job visibility

router.post ('/change-visibility', changeVisibility);

export default router;