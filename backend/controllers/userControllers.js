import User from "../models/User.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplications.js";
import { v2 as cloudinary } from "cloudinary";

// User data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    res.json({ success: false, message });
  }
};

// Apply for a job
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
    const message =
      error instanceof Error ? error.message : "Unknown error";
    res.json({ success: false, message });
  }
};

// User job applications
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate(
        "jobId",
        "title description location category level salary"
      )
      .exec();

    if (applications.length === 0) {
      return res.json({
        success: false,
        message: "No applications found for this user",
      });
    }

    res.json({ success: true, applications });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    res.json({ success: false, message });
  }
};

// Update user resume

export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    const userData = await User.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });
    if (!resumeFile) return res.json({ success: false, message: "No file uploaded" });
    if (resumeFile.mimetype !== "application/pdf")
      return res.json({ success: false, message: "Only PDF files are allowed" });

    if (userData.resumePublicId) {
      await cloudinary.uploader.destroy(userData.resumePublicId);
    }

    const uploadResult = await cloudinary.uploader.upload_stream(
      {
        folder: "resumes",
        resource_type: "image",
        access_mode: "public",
        type: "upload",   
      },
      async (error, result) => {
        if (error) {
          return res.json({ success: false, message: error.message });
        }

        userData.resume = result.secure_url;
        userData.resumePublicId = result.public_id;
        await userData.save();

        res.json({
          success: true,
          message: "Resume updated",
          resume: result.secure_url,
        });
      }
    );

    uploadResult.end(resumeFile.buffer);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.json({ success: false, message });
  }
};
