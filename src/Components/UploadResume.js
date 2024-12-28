import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./UploadResume.css";
function UploadResume() {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [steps, setSteps] = useState(1);
  const [formData, setFormData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      category: "",
    },
    academicDetails: {
      highestQualifications: "",
      currentCGPA: "",
      ssc: "",
      hsc: "",
      backlogs: "",
      educationalGap: "",
      branch: "",
    },
    skillsAndCertifications: {
      programmingSkills: "",
      technicalSkills: "",
      certifications: "",
      projects: "",
      hackathonParticipation: "",
    },
    workAndExperience: {
      internships: "",
      workExperience: "",
      researchPublications: "",
    },
    extracurricular: {
      softSkills: "",
      clubsAndSocieties: "",
      sportsParticipation: "",
    },
    preferences: {
      domain: "",
      location: "",
      jobRole: "",
      salaryRange: "",
    },
    behavioralAndPsychometric: {
      problemSolving: "",
      aptitudeTestScore: "",
      communicationSkills: "",
    },
  });

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNext = () => setSteps((prev) => prev + 1);
  const handlePrev = () => setSteps((prev) => prev - 1);

  return (
    <div className="container">
      <div className="form-container">
        <h2>Step {steps} of 7</h2>

        {steps === 1 && (
          <div className="form-step">
            
            <div className="resume-section">
               
              <div className="resume-submit">
                <p className="upload-resume-text">Upload Your Resume</p>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
              </div>
            </div>
            <h3>Personal Details</h3>
            <div className="form-step-in">
              <TextField
                label="Name"
                variant="filled"
                value={formData.personal.name}
                onChange={(e) =>
                  handleChange("personal", "name", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Email"
                variant="filled"
                type="email"
                value={formData.personal.email}
                onChange={(e) =>
                  handleChange("personal", "email", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Phone"
                variant="filled"
                type="tel"
                value={formData.personal.phone}
                onChange={(e) =>
                  handleChange("personal", "phone", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Gender"
                variant="filled"
                value={formData.personal.gender}
                onChange={(e) =>
                  handleChange("personal", "gender", e.target.value)
                }
                fullWidth
              />
            </div>
          </div>
        )}

        {steps === 2 && (
          <div className="form-step">
            <h3>Academic Details</h3>
            <div className="form-step-in">
              <TextField
                label="Highest Qualifications"
                variant="filled"
                value={formData.academicDetails.highestQualifications}
                onChange={(e) =>
                  handleChange(
                    "academicDetails",
                    "highestQualifications",
                    e.target.value
                  )
                }
                fullWidth
              />
              <TextField
                label="Current CGPA"
                variant="filled"
                value={formData.academicDetails.currentCGPA}
                onChange={(e) =>
                  handleChange("academicDetails", "currentCGPA", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="SSC Percentage"
                variant="filled"
                value={formData.academicDetails.ssc}
                onChange={(e) =>
                  handleChange("academicDetails", "ssc", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="HSC Percentage"
                variant="filled"
                value={formData.academicDetails.hsc}
                onChange={(e) =>
                  handleChange("academicDetails", "hsc", e.target.value)
                }
                fullWidth
              />
            </div>
          </div>
        )}

        {steps === 3 && (
          <div className="form-step">
            <h3>Skills and Certifications</h3>
            <div className="form-step-in">
              <TextField
                label="Programming Skills"
                variant="filled"
                value={formData.skillsAndCertifications.programmingSkills}
                onChange={(e) =>
                  handleChange(
                    "skillsAndCertifications",
                    "programmingSkills",
                    e.target.value
                  )
                }
                fullWidth
                multiline
                rows={4}
              />
              <TextField
                label="Technical Skills"
                variant="filled"
                value={formData.skillsAndCertifications.technicalSkills}
                onChange={(e) =>
                  handleChange(
                    "skillsAndCertifications",
                    "technicalSkills",
                    e.target.value
                  )
                }
                fullWidth
                multiline
                rows={4}
              />
            </div>
          </div>
        )}

        {steps === 4 && (
          <div className="form-step">
            <h3>Work and Experience</h3>
            <div className="form-step-in">
              <TextField
                label="Internships"
                variant="filled"
                value={formData.workAndExperience.internships}
                onChange={(e) =>
                  handleChange(
                    "workAndExperience",
                    "internships",
                    e.target.value
                  )
                }
                fullWidth
                multiline
                rows={4}
              />
              <TextField
                label="Work Experience"
                variant="filled"
                value={formData.workAndExperience.workExperience}
                onChange={(e) =>
                  handleChange(
                    "workAndExperience",
                    "workExperience",
                    e.target.value
                  )
                }
                fullWidth
                multiline
                rows={4}
              />
            </div>
          </div>
        )}

        {steps === 5 && (
          <div className="form-step">
            <h3>Extracurricular</h3>
            <div className="form-step-in">
              <TextField
                label="Soft Skills"
                variant="filled"
                value={formData.extracurricular.softSkills}
                onChange={(e) =>
                  handleChange("extracurricular", "softSkills", e.target.value)
                }
                fullWidth
                multiline
                rows={4}
              />
              <TextField
                label="Clubs and Societies"
                variant="filled"
                value={formData.extracurricular.clubsAndSocieties}
                onChange={(e) =>
                  handleChange(
                    "extracurricular",
                    "clubsAndSocieties",
                    e.target.value
                  )
                }
                fullWidth
                multiline
                rows={4}
              />
            </div>
          </div>
        )}

        {steps === 6 && (
          <div className="form-step">
            <h3>Preferences</h3>
            <div className="form-step-in">
              <TextField
                label="Preferred Domain"
                variant="filled"
                value={formData.preferences.domain}
                onChange={(e) =>
                  handleChange("preferences", "domain", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Preferred Location"
                variant="filled"
                value={formData.preferences.location}
                onChange={(e) =>
                  handleChange("preferences", "location", e.target.value)
                }
                fullWidth
              />
            </div>
          </div>
        )}

        {steps === 7 && (
          <div className="form-step">
            <h3>Behavioral and Psychometric</h3>
            <TextField
              label="Problem Solving"
              variant="filled"
              value={formData.behavioralAndPsychometric.problemSolving}
              onChange={(e) =>
                handleChange(
                  "behavioralAndPsychometric",
                  "problemSolving",
                  e.target.value
                )
              }
              fullWidth
            />
          </div>
        )}

        <div className="form-navigation">
          {steps > 1 && (
            <div className="next-btn">
              <Button variant="contained" onClick={handlePrev}>
                Previous
              </Button>
            </div>
          )}
          {steps < 7 && (
            <div className="next-btn">
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            </div>
          )}
          {steps === 7 && (
            <div className="next-btn">
              <Button
                variant="contained"
                onClick={() => alert(JSON.stringify(formData))}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadResume;
