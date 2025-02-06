import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { User } from "../Modals/user.modal.js";
import Grid from "gridfs-stream";
import { connectDB } from "../DB/db.js";
import fs from "fs";
export const SaveUserDataToDB = async (req, res) => {
  console.log("Backend Hit !!!!!!!!!1");
  const {
    resume,
    personal,
    academicDetails,
    skillsAndCertifications,
    workAndExperience,
    extracurricular,
    preferences,
    behavioralAndPsychometric,
  } = req.body;
  console.log(resume, personal, academicDetails, skillsAndCertifications);
  const resume_file = resume.file;
  const connect_to_db = await connectDB();
  const database = connect_to_db.db;
  const bucket = new GridFSBucket(database);

        
  if (!fs.existsSync(resume_file)) {
    console.log("NO File Found")
    return res.status(400).json({
      success: false,
      message: "Provided file path does not exist",
    });
  }

  const fileName = resume_file.split("/").pop();
  const fileData = fs.createReadStream(fileName);
  const uploadStream = bucket.openUploadStream(fileName);

  const fileId = await new Promise((resolve, reject) => {
    fileData
      .pipe(uploadStream)
      .on("error", (error) =>
        reject(new Error("Error uploading file: " + error))
      )
      .on("finish", () => resolve(uploadStream.id));
  });
  const new_user = new User({
    resume : {
      fid : fileId
    },
    personal,
    academicDetails,
    skillsAndCertifications,
    workAndExperience,
    extracurricular,
    preferences,
    behavioralAndPsychometric,
  });
  console.log("File stored successfully:", fileId);

  new_user.save();
  console.log(personal);
  res.status(200).json({
    message: "Successfull",
    success: true,
  });
};
