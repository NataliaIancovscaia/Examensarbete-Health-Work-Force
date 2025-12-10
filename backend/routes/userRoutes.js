import express from 'express';
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userControllers.js';
const router=express.Router();
//User data

router.get('/user',getUserData);
//Apply for a job

router.post('/apply',applyForJob);
//User applied applications

router.get('/applications',getUserJobApplications);
// //Uppdate users resume

// router.post('/update-resume',upload.single('resume'),updateUserResume);


export default router;
