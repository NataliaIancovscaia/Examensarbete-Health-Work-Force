import Company from "../models/Company.js";
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
//Register company
export const registerCompany=async(req,res)=>{
    const {name,email,password}=req.body;
    const imageFile=req.file;

    if(!name||!email||!password||!imageFile){
        return res.json({success:false,message:"Missing details"});

    }
    try {
        const companyExists=await Company.findOne({email});

        if (companyExists){
            return res.json({success:false,message:"Company already register"});

        }
         const salt=await bcrypt.genSalt(10);
         const hashPassword=await bcrypt.hash(password,salt);

         const imageUpload=await cloudinary.uploader.upload(imageFile.path);
         const company=await Company.create({
            name,
            email,
            password:hashPassword,
            image:imageUpload.secure_url
         });

         res.json({
            success:true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image


            },
            token:generateToken(company._id)
         })
        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }


}

//Company login
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

//Company data
export const getCompanyData=async(req,res)=>{
   

    try {
         const company=req.company;
            res.json({
                success:true,
                company            
            })

        }
    catch (error) {
         res.json({success:false,message:error.message});
    }


}

//Create a new job
export const postJob=async(req,res)=>{

    const {title,description,location,category,level, salary}=req.body;

    const companyId=req.company._id;
    try {
        const newJob=new Job({
            title,
            description,
            location,
            level,
            category,
            salary,
            companyId,
            date:Date.now()
        });
        await newJob.save();
       res.json({success:true,newJob});
    } catch (error) {
         res.json({success:false,message:error.message});
    }

    

}

//Job Applicants
export const getCompanyJobApplicants=async(req,res)=>{

}

//Company posted jobs
export const getCompanyPostedJobes=async(req,res)=>{

    try {
         const companyId=req.company._id;

         const jobs=await Job.find({companyId});
            res.json({
                success:true,
               jobsData: jobs           
            })

        }
    catch (error) {
         res.json({success:false,message:error.message});
    }

}

//Change Job application status
export const changeJobApplicationsStatus=async(req,res)=>{

}
//Change Job visibility
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
