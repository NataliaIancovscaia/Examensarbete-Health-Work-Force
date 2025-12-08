import express from 'express';
import { getJobById, getJobs } from '../controllers/jobControllers.js';

const router=express.Router();

//Get all jobs data

router.get('/',getJobs);
//Get a single job
router.get('/:id',getJobById);

export default router;