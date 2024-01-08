const express = require('express');
const authRoutes = require('./authRoutes'); // Adjust the path as needed
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { format } = require('date-fns');
const mysql = require('mysql2');
const path = require('path'); // Add this line for handling file paths


const app = express();
const port = 3002;

app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Blue12:34',
  //password:'Cj10856672',
  database: 'tech_online',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Event listener for when a connection is acquired
db.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

// Serve the 'uploads' folder as a static directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Specify the directory where you want to store the files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());

app.post('/submit-form', upload.array('files', 3), async (req, res) => {
  const formData = req.body;
  console.log('Received form data from the front end:', formData);
  

  const sql = 'INSERT INTO innovation_details SET ?';

  const currentDate = new Date();
  const uploadDate = format(currentDate, 'dd-MM-yyyy');

  const insertData = {
    ...formData,
    approved: false,
    upload_date: uploadDate,
  };

  console.log('key:', insertData);
  

  if (req.files) {
    insertData.files = req.files.map(file => file.path).join(', ');
  }

  // Your existing MySQL query and data insertion code
  db.query(sql, insertData, async (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data inserted into MySQL:', result);
      res.status(200).send('Form submitted successfully');

      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,  // You can also use port 25 if needed
        secure: false,  // For port 587, set to false
        auth: {
          user: 'sipp@ug.edu.gh',  // Use the Microsoft 365 email address
          pass: 'Saq85511',
        },
      });

      

      const userMailOptions = {
        from: 'sipp@ug.edu.gh',
        to: formData.email,
        subject: 'Innovation Submission Received and Under Review',
        text: `
        Dear Applicant,

Your Innovation application has been successfully received.

Our team is currently reviewing your submission. If additional information is needed, we'll be in touch. Expect another email soon regarding the status of your application. Thank you.


Best regards,

UG Innovations and Technology Team`,
      };

      try {
        await transporter.sendMail(userMailOptions);
        console.log('Email sent to user successfully');
      } catch (emailError) {
        console.error('Error sending email to user:', emailError);
      }

      const adminMailOptions = {
        from: 'sipp@ug.edu.gh',
        to: 'mnhutchful@ug.edu.gh, DAdobeaAntwiOwusu@ug.edu.gh', // admin mails
        subject: 'New Innovation Submission',
        text: `
        Dear Administrator

You are receiving this automated notification to inform you that a new Innovation Application has been submitted and is awaiting your review.
        
To access the Innovation Application for evaluation, please click on the following link to visit the Innovations Portal: https://innovate.ug.edu.gh
        
Your prompt attention to this matter is appreciated to ensure timely assessment of the submitted innovation.
        
Thank you.`,
      };

      try {
        await transporter.sendMail(adminMailOptions);
        console.log('Email sent to admin successfully');
      } catch (adminEmailError) {
        console.error('Error sending email to admin:', adminEmailError);
      }
    }
  });
});






// Route to get project data from the database with filter
app.get('/api/projects', (req, res) => {
  let sql = 'SELECT * FROM innovation_details';

  // Check for filter query parameter
  const filter = req.query.filter;

  if (filter) {
    // Check if the filter is "All" (case-insensitive)
    if (filter.toLowerCase() !== 'all') {
      // Map user-friendly options to filter values
      const filterValue = filter === 'Approved' ? '1' : (filter === 'Not Approved' ? '0' : '');

      // Only add WHERE clause if the filter value is valid
      if (filterValue !== '') {
        sql += ` WHERE approved = '${filterValue}'`;
      }
    }
    // If filter is "All," fetch all projects without applying a filter
  }
  

  db.query(sql, async (err, results) => {
    if (err) {
      console.error('Error fetching projects:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const projectsWithImages = results.map((project) => {
        const imagePaths = project.files ? project.files.split(',').map((path) => path.trim()) : [];
        const firstImagePath = imagePaths.length > 0 ? imagePaths[0] : null;

        return {
          ...project,
          image_path: firstImagePath,
        };
      });

      console.log('Backend projects with images:', projectsWithImages);

      res.json(projectsWithImages);
    }
  });
});




// Route to get only approved projects
app.get('/api/approved-projects', (req, res) => {
  const { industry, search } = req.query;

  let sql = 'SELECT * FROM innovation_details WHERE approved = true';

  if (industry && industry.toLowerCase() === 'all') {
    sql = 'SELECT * FROM innovation_details WHERE approved = true';
  } else if (industry) {
    sql += ` AND industry = '${industry}'`;
  }

  // Apply search logic
  if (search) {
    sql += ` AND (innovation_name LIKE '%${search}%' OR description LIKE '%${search}%' OR keyWords LIKE '%${search}%')`;
  }

  db.query(sql, async (err, results) => {
    if (err) {
      console.error('Error fetching approved projects:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const projectsWithImages = results.map((project) => {
        const imagePaths = project.files ? project.files.split(',').map((path) => path.trim()) : [];
        const firstImagePath = imagePaths.length > 0 ? imagePaths[0] : null;

        return {
          ...project,
          image_path: firstImagePath,
        };
      });

      console.log('Backend approved projects with images:', projectsWithImages);

      res.json(projectsWithImages);
    }
  });
});




// Update the approved status in the database
app.post('/api/approve-project/:id', async (req, res) => {
  const projectId = req.params.id;

  
  const updateSql = `UPDATE innovation_details SET approved = true WHERE id = ${projectId}`;

  db.query(updateSql, async (err, result) => {
    if (err) {
      console.error('Error updating approval status:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Fetch project details after the update
      const fetchSql = `SELECT email FROM innovation_details WHERE id = ${projectId}`;
      db.query(fetchSql, async (err, results) => {
        if (err) {
          console.error('Error fetching email after approval:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const userEmail = results[0]?.email;
          //console.log(userEmail)

          // Send an email to the associated email address
          const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,  // You can also use port 25 if needed
            secure: false,  // For port 587, set to false
            auth: {
              user: 'sipp@ug.edu.gh',  // Use the Microsoft 365 email address
              pass: 'Saq85511',
            },
          });

          const userMailOptions = {
            from: 'sipp@ug.edu.gh',
            to: userEmail,
            subject: 'Project Approval',
            text: `
            Dear Applicant,

We are thrilled to inform you that your Innovation has been approved for showcasing on our main Innovations Portal. Your idea has passed our evaluation process with flying colors and is now set to be featured for industry partnerships.

To view your Innovation on our Innovations Portal and explore its visibility for potential collaborations, kindly click on the following link: https://innovate.ug.edu.gh

Your dedication to fostering innovation within our organization is commendable, and we believe your idea holds significant potential for industry partnerships.

Thank you for your valuable contribution to our innovative landscape. We're excited about the possibilities your Innovation brings.

Best regards,

UG Innovations Assessment Team`,
          };

          try {
            await transporter.sendMail(userMailOptions);
            console.log('Email sent to user successfully');

            // Send an email to the Pro VC (replace 'provc@example.com' with the actual Pro VC email address)
            const proVCMailOptions = {
              from: 'sipp@ug.edu.gh',
              to: 'irondicjonathan@gmail.com', // Replace with the Pro VC email address
              subject: 'New Approved Project',
              text: `Dear Sir,

An innovation project has been greenlit and uploaded to the UG Innovations Portal by the ORID Innovation Assessment team.
              
To view the details and provide your invaluable insights, click: Access https://innovate.ug.edu.gh/project-details/${projectId}
              
Your feedback is crucial in propelling this project forward. If you have any comments or misgivings about the project, please let us know. Thank you
              
Best regards,
              
UG Innovations Portal Assessment Team
              `,
            };
    

            await transporter.sendMail(proVCMailOptions);
            console.log('Email sent to Pro VC successfully');

            res.json({ success: true });
          } catch (emailError) {
            console.error('Error sending approval email:', emailError);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
      });
    }
  });
});



app.post('/api/pend-project/:id', async (req, res) => {
  const projectId = req.params.id;
  const { messageContent } = req.body;

  
  const updateSql = `UPDATE innovation_details SET approved = false WHERE id = ${projectId}`;

  db.query(updateSql, async (err, result) => {
    if (err) {
      console.error('Error updating approval status:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Fetch project details after the update
      const fetchSql = `SELECT email FROM innovation_details WHERE id = ${projectId}`;
      db.query(fetchSql, async (err, results) => {
        if (err) {
          console.error('Error fetching email after approval:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const userEmail = results[0]?.email;
          //console.log(userEmail)

          // Send an email to the associated email address
          const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,  // You can also use port 25 if needed
            secure: false,  // For port 587, set to false
            auth: {
              user: 'sipp@ug.edu.gh',  // Use the Microsoft 365 email address
              pass: 'Saq85511',
            },
          });

          const userMailOptions = {
            from: 'sipp@ug.edu.gh',
            to: userEmail,
            subject: 'Request for Additional Information - UG Innovation & Technology Portal',
            text: `Dear Sir/Madam,

Your submission to UG Innovation & Technology portal is currently pending. Our Assessment Team has reviewed your submission and identified that further information is required to proceed with the assessment.
            
Below, you'll find comments from our Assessment Team regarding the additional information needed for your application. We kindly ask you to review these comments and provide the requested details at your earliest convenience.
            
${ messageContent }
            
Your prompt attention to this matter will enable us to move forward with the assessment of your submission 
            
Should you have any questions or need clarification on the required information, please don't hesitate to reach out to us. 
            
Thank you for your cooperation.
            
Best regards,
            
UG Innovations Portal Assessment Team`,
          };

          try {
            await transporter.sendMail(userMailOptions);
            console.log('Email sent to user successfully');

            res.json({ success: true });
          } catch (emailError) {
            console.error('Error sending approval email:', emailError);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
      });
    }
  });
});




// Route for project details
app.get('/api/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const sql = `SELECT * FROM innovation_details WHERE id = ?`;

  db.query(sql, [projectId], (err, results) => {
    if (err) {
      console.error('Error fetching project details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const projectDetails = results[0]; // Assuming the query returns a single project
      res.json(projectDetails);
    }
  });
});









//Enpoint to set meeting
app.post('/api/submit-meeting-form', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form data from the front end:', formData);

    const currentDate = new Date();
  const uploadDate = format(currentDate, 'dd-MM-yyyy');

    const insertData = {
      ...formData,
      upload_date: uploadDate,
    };

    const sql = 'INSERT INTO set_meeting SET ?';

    // Your existing MySQL query and data insertion code
    db.query(sql, insertData, async (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Data inserted into set_meeting table:', result);

        // Send email
        const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,  // You can also use port 25 if needed
          secure: false,  // For port 587, set to false
          auth: {
            user: 'sipp@ug.edu.gh',  // Use the Microsoft 365 email address
            pass: 'Saq85511',
          },
        });

        const subject = 'Meeting Request - ' + formData.innovation_name;
const text = `
Title: Meeting Request - ${formData.innovation_name}

Dear Administrator,

A meeting has been requested in relation to ${formData.innovation_name} by a potential investor. Please find below their details:

Company Name: ${formData.company_name}
Contact Person Name: ${formData.contact_person_name}
Phone Number: ${formData.phone_number}
User Email: ${formData.user_email}
Purpose: ${formData.purpose}

Thank you
`;

const mailOptions = {
  from: 'sipp@ug.edu.gh',
  to: 'mnhutchful@ug.edu.gh, DAdobeaAntwiOwusu@ug.edu.gh', // admin mails
  subject: subject,
  text: text,
};

        try {
          const emailResult = await transporter.sendMail(mailOptions);
          console.log('Email sent:', emailResult.response);
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }

        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/', authRoutes); // Mount the auth routes under the /auth path

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
