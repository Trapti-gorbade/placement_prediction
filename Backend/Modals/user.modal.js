import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    resume : {
        fid : String
    },
    personal: {
        name: { type: String,  },
        email: { type: String, },
        phone: { type: String,  },
        gender: { type: String },
        category: { type: String },
    },
    academicDetails: {
        highestQualifications: { type: String },
        currentCGPA: { type: Number },
        ssc: { type: String },
        hsc: { type: String },
        backlogs: { type: Number },
        educationalGap: { type: String },
        branch: { type: String },
    },
    skillsAndCertifications: {
        programmingSkills: { type: String },
        technicalSkills: { type: String },
        certifications: { type: String },
        projects: { type: String },
        hackathonParticipation: { type: String },
    },
    workAndExperience: {
        internships: { type: String },
        workExperience: { type: String },
        researchPublications: { type: String },
    },
    extracurricular: {
        softSkills: { type: String },
        clubsAndSocieties: { type: String },
        sportsParticipation: { type: String },
    },
    preferences: {
        domain: { type: String },
        location: { type: String },
        jobRole: { type: String },
        salaryRange: { type: String },
    },
    behavioralAndPsychometric: {
        problemSolving: { type: String },
        aptitudeTestScore: { type: String },
        communicationSkills: { type: String },
    },
});

export const User = mongoose.model("User", UserSchema);

