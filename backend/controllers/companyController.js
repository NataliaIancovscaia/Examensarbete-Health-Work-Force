import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplications.js";
import { uploadFileToCloudinary } from "../helpers/uploadToCloudinary.js";

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password || !file) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const existing = await Company.findOne({ email });
    if (existing)
      return res.json({
        success: false,
        message: "Company already registered",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const uploadResult = await uploadFileToCloudinary(
      file.buffer,
      "company_logos",
      "image",
    );

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({
      success: true,
      company,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const postJob = async (req, res) => {
  const { title, description, location, category, level, salary } = req.body;

  const companyId = req.company._id;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      level,
      category,
      salary,
      companyId,
      date: Date.now(),
    });
    await newJob.save();
    res.json({ success: true, message: "Job posted successfully", newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCompanyPostedJobes = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });

    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({
          jobId: job._id,
        });

        return {
          ...job.toObject(),
          applicants: applicants.length,
        };
      }),
    );

    res.json({
      success: true,
      jobsData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changeJobApplicationsStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    await JobApplication.findOneAndUpdate({ _id: id }, { status });
    res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    if (!id) {
      return res.json({
        success: false,
        message: "Job id is required",
      });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.companyId.toString() !== companyId.toString()) {
      return res.json({
        success: false,
        message: "You are not allowed to edit this job",
      });
    }

    job.visible = !job.visible;
    await job.save();

    res.json({
      success: true,

      job,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
