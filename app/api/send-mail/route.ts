// // app/api/send-mail/route.js
// import nodemailer from 'nodemailer';
// import multer from 'multer';
// import { NextResponse } from 'next/server';

// const upload = multer({ dest: 'uploads/' }); // Specify the upload directory

// export async function POST(request) {
//   const formData = await request.formData();
  
//   const name = formData.get('name');
//   const phone = formData.get('phone');
//   const position = formData.get('position');
//   const experience = formData.get('experience');
//   const coverLetter = formData.get('coverLetter');
//   const email = formData.get('email');
//   const resumeFile = formData.get('resume'); 

//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const adminEmail = 'zainali5002@gmail.com';
//   const userMailOptions = {
//     from: process.env.EMAIL_USER,
//     to: adminEmail,
//     subject: 'New Job Application',
//     text: `You have received a new job application from ${name}.\n\nDetails:\nName: ${name}\nPhone: ${phone}\nPosition: ${position}\nExperience: ${experience}\nCover Letter: ${coverLetter}\nEmail: ${email}`,
//     attachments: [
//       {
//         filename: resumeFile.name,
//         path: resumeFile.path,
//       },
//     ],
//   };

//   try {
//     await transporter.sendMail(userMailOptions);
//     return NextResponse.json({ message: 'Emails sent successfully!' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
//   }
// }


// app/api/send-mail/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const formData = await request.formData();
  
  const name = formData.get('name');
  const phone = formData.get('phone');
  const position = formData.get('position');
  const experience = formData.get('experience');
  const coverLetter = formData.get('coverLetter');
  const email = formData.get('email');
  const resumeFile = formData.get('resume'); 

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminEmail = 'zainali5002@gmail.com';

  // Email options for the admin
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: 'New Job Application',
    text: `You have received a new job application from ${name}.\n\nDetails:\nName: ${name}\nPhone: ${phone}\nPosition: ${position}\nExperience: ${experience}\nCover Letter: ${coverLetter}\nEmail: ${email}`,
    attachments: [
      {
        filename: resumeFile.name,
        path: resumeFile.path,
      },
    ],
  };

  // Email options for the user
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: "zainali5002@gmail.com",
    subject: 'Application Received',
    text: `Hi ${name},\n\nThank you for your application for the position of ${position}. We will get back to you shortly.\n\nBest Regards,\nCodeErtz`,
  };

  try {
    // Send the admin email
    await transporter.sendMail(adminMailOptions);
    
    // Send the user email
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}
