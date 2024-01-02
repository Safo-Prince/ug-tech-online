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

      const htmlTemplate = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
      <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>
        
          <style type="text/css">
            @media only screen and (min-width: 520px) {
        .u-row {
          width: 500px !important;
        }
        .u-row .u-col {
          vertical-align: top;
        }
      
        .u-row .u-col-50 {
          width: 250px !important;
        }
      
        .u-row .u-col-100 {
          width: 500px !important;
        }
      
      }
      
      @media (max-width: 520px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }
        .u-row .u-col {
          min-width: 320px !important;
          max-width: 100% !important;
          display: block !important;
        }
        .u-row {
          width: 100% !important;
        }
        .u-col {
          width: 100% !important;
        }
        .u-col > div {
          margin: 0 auto;
        }
      }
      body {
        margin: 0;
        padding: 0;
      }
      
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      
      p {
        margin: 0;
      }
      
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      
      * {
        line-height: inherit;
      }
      
      a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
      }
      
      table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
          </style>
        
        
      
      </head>
      
      <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
          
        
        
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
        <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
        
      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
              
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-right: 0px;padding-left: 0px;" align="left">
            
            <img align="left" border="0" src="images/image-1.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 60%;max-width: 288px;" width="288"/>
            
          </td>
        </tr>
      </table>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        </div>
        
      
      
        
        
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ecf0f1;width: 500px;padding: 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
        <div style="background-color: #ecf0f1;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
        
      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
              
        <div style="font-size: 14px; color: #6b6b6b; line-height: 140%; text-align: left; word-wrap: break-word;">
          <p style="line-height: 140%;">Dear Innovator,</p>
      <p style="line-height: 140%;"> </p>
      <p style="line-height: 140%;">Your application has been received. </p>
      <p style="line-height: 140%;">It will go through an approval process.</p>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        </div>
        
      
      
        
        
      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
            
      <!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #ffffff;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
        <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
        
      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:16px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
              
        <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
          <div>
      <div><a href="https://orid.ug.edu.gh/">+233-(0)303-930436</a></div>
      <div><a href="https://orid.ug.edu.gh/">+233-(0)302-</a><a href="https://orid.ug.edu.gh/">213850</a></div>
      <div title="Location"> </div>
      </div>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #ffffff;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
      <div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
        <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
        <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
        
      <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
          <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
              
        <div style="font-size: 14px; line-height: 140%; text-align: right; word-wrap: break-word;">
          <div><a href="http://orid@ug.edu.gh/">orid@ug.edu.gh</a></div>
      <div title="Location"><a href="https://www.google.com.gh/maps/place/Legon+Centre+for+International+Affairs+and+Diplomacy,+University+of+Ghana,+Botanical+Gardens+Rd,+Accra/@5.6521685,-0.1841788,19z/data=!4m7!1m4!3m3!1s0x0fdf9c86dc2b3e93:0xf2c110cbc16a70a3!2sLegon+Centre+for+International+Affairs+and+Diplomacy,+University+of+Ghana,+Botanical+Gardens+Rd,+Accra!3b1!3m1!1s0x0fdf9c86dc2b3e93:0xf2c110cbc16a70a3?hl=en">P.O. Box LG 1142<br />Legon, Accra</a></div>
        </div>
      
            </td>
          </tr>
        </tbody>
      </table>
      
        <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
        </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
        </div>
        
      
      
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
      
      </html>
      
`;

      const userMailOptions = {
        from: 'sipp@ug.edu.gh',
        to: formData.email,
        subject: 'Innovation Submission Received',
        html: htmlTemplate,
      };

      try {
        await transporter.sendMail(userMailOptions);
        console.log('Email sent to user successfully');
      } catch (emailError) {
        console.error('Error sending email to user:', emailError);
      }

      const adminMailOptions = {
        from: 'sipp@ug.edu.gh',
        to: 'irondicjonathan@@gmail.com', // Use your admin email
        subject: 'New Innovation Submission',
        text: 'A new innovation has been uploaded.',
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





// Route to get project data from the database
// Route to get project data from the database with filter
app.get('/api/projects', (req, res) => {
  let sql = 'SELECT * FROM innovation_details';

  // Check for filter query parameter
  const filter = req.query.filter;

  if (filter) {
    // Map user-friendly options to filter values
    const filterValue = filter === 'Approved' ? '1' : (filter === 'Not Approved' ? '0' : '');

    // Only add WHERE clause if the filter value is valid
    if (filterValue !== '') {
      sql += ` WHERE approved = '${filterValue}'`;
    }
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
  let sql = 'SELECT * FROM innovation_details WHERE approved = true'; // Adjust this based on your data structure

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
          console.log(userEmail)

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
            text: 'Your project has been approved. Congratulations!',
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
          console.log(userEmail)

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
            subject: 'Project Still Under Review',
            text: `Dear Applicant,

            Your Innovation application has been successfully received.
            
            Our team is currently reviewing your submission. If additional information is needed, we'll be in touch. Expect another email soon regarding the status of your application. Thank you.
            
            
            Best regards,
            
            UG Innovations and Technology Team`,
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

        const mailOptions = {
          from: 'sipp@ug.edu.gh',
          to: 'irondicjonathan@gmail.com',  // Replace with the admin's email
          subject: 'New Meeting Form Submission',
          text: `A new meeting form has been submitted. Details: ${JSON.stringify(formData)}`,
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
