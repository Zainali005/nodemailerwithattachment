// import React, { useState } from "react";
// import Breadcrumb from "../components/common/Breadcrumb";
// import JoinOurTeam from "../components/common/JoinOurTeam";
// import Layout from "../components/layout/index";

// function JobDetails() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     position: "",
//     experience: "",
//     coverLetter: "",
//     email: "", // Added email field
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/send-mail", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Application submitted successfully!");
//         setFormData({
//           name: "",
//           phone: "",
//           position: "",
//           experience: "",
//           coverLetter: "",
//           email: "",
//         });
//       } else {
//         alert("Error submitting application. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error submitting application. Please try again.");
//     }
//   };

//   return (
//     <Layout>
//       <Breadcrumb pageTitle="Career" pageName="Career" id="#job-details" />
//       <div className="job-details-section pt-120 pb-120" id="job-details">
//         <div className="container">
//           <div className="row d-flex justify-content-center gy-5">
//             <div className="col-lg-12">
//               <div className="job-details-wrap">
//                 <p>
//                   Currently, there are no job openings available. However, if
//                   you believe you possess the skills and expertise that align
//                   with our team, we encourage you to share your resume. We will
//                   review your qualifications and get in touch with you when a
//                   suitable position becomes available.
//                 </p>
//               </div>
//             </div>
//             <div className="col-lg-12">
//               <div className="apply-form">
//                 <div className="apply-form-title">
//                   <h4>Apply for a Position:</h4>
//                   <p>Please complete the form below to share your details:</p>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="row g-4">
//                     <div className="col-lg-6">
//                       <div className="form-inner">
//                         <input
//                           type="text"
//                           name="name"
//                           placeholder="Your Name:"
//                           value={formData.name}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-6">
//                       <div className="form-inner">
//                         <input
//                           type="text"
//                           name="phone"
//                           placeholder="Phone Number:"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <div className="form-inner">
//                         <input
//                           type="text"
//                           name="email"
//                           placeholder="Your Email:"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <div className="form-inner">
//                         <input
//                           type="text"
//                           name="position"
//                           placeholder="Position Applied For:"
//                           value={formData.position}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <div className="form-inner">
//                         <input
//                           type="text"
//                           name="experience"
//                           placeholder="Experience:"
//                           value={formData.experience}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <div className="form-inner">
//                         <textarea
//                           name="coverLetter"
//                           cols={30}
//                           rows={6}
//                           placeholder="Cover Letter:"
//                           value={formData.coverLetter}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div className="col-lg-12">
//                       <div className="form-inner">
//                         <input
//                           type="file"
//                           name="resume"
//                           accept=".pdf,.doc,.docx"
//                           // onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     </div>
//                     <div className="col-lg-12 text-center">
//                       <input
//                         type="submit"
//                         value="Send Now"
//                         className="eg-btn btn--submit"
//                       />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <JoinOurTeam btnclass="btn--primary" />
//     </Layout>
//   );
// }

// export default JobDetails;


"use client";
import React, { useState } from "react";
function JobDetails() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    experience: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setResume(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    if (resume) {
      data.append("resume", resume);
    }

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          position: "",
          experience: "",
          coverLetter: "",
        });
        setResume(null);
      } else {
        alert("Error submitting application. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting application. Please try again.");
    }
  };

  return (
      <div className="job-details-section pt-120 pb-120" id="job-details">
        <div className="container">
          <div className="row d-flex justify-content-center gy-5">
            <div className="col-lg-12">
              <div className="job-details-wrap">
                <p>
                  Currently, there are no job openings available. However, if
                  you believe you possess the skills and expertise that align
                  with our team, we encourage you to share your resume.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="apply-form">
                <h4>Apply for a Position:</h4>
                <p>Please complete the form below to share your details:</p>
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="text"
                        name="position"
                        placeholder="Position Applied For"
                        value={formData.position}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="text"
                        name="experience"
                        placeholder="Experience"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        name="coverLetter"
                        cols={30}
                        rows={6}
                        placeholder="Cover Letter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-12 text-center">
                      <input
                        type="submit"
                        value="Send Now"
                        className="btn--submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default JobDetails;
