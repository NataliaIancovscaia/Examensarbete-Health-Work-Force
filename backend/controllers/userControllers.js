import User from "../models/User.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplications.js";

import { uploadFileToCloudinary } from "../helpers/uploadToCloudinary.js";

export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.json({ success: false, message });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });
    if (isAlreadyApplied) {
      return res.json({ success: false, message: "Already applied" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Applied successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.json({ success: false, message });
  }
};

export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (applications.length === 0) {
      return res.json({
        success: false,
        message: "No applications found for this user",
      });
    }

    res.json({ success: true, applications });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.json({ success: false, message });
  }
};

export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const file = req.file;

    if (!file) return res.json({ success: false, message: "No file uploaded" });
    if (file.mimetype !== "application/pdf")
      return res.json({ success: false, message: "Only PDF files allowed" });

    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId, {
        resource_type: "raw",
      });
    }

    const result = await uploadFileToCloudinary(file.buffer, "resumes", "raw");

    user.resume = result.secure_url;
    user.resumePublicId = result.public_id;
    await user.save();

    res.json({
      success: true,
      message: "Resume updated successfully",
      resume: user.resume,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
