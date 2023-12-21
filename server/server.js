const express = require('express');
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
  //password: 'Blue12:34',
  password:'Cj10856672',
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
        service: 'gmail',
        auth: {
          user: 'irondicjonathan@gmail.com',
          pass: 'zsfi avjq dagk joyf',
        },
      });

      const userMailOptions = {
        from: 'irondicjonathan@gmail.com',
        to: formData.email,
        subject: 'Innovation Submission Received',
        text: `Dear Sir/Madam,

        Your innovation submission has been received.
        We will review it and get back to you in due time.        
        Thank you.
        
        +233-(0)303-930436 orid@ug.edu.gh
        +233-(0)302-213850
        P.O. Box LG 1142
        Legon, Accra`,
      };

      try {
        await transporter.sendMail(userMailOptions);
        console.log('Email sent to user successfully');
      } catch (emailError) {
        console.error('Error sending email to user:', emailError);
      }

      const adminMailOptions = {
        from: 'irondicjonathan@gmail.com',
        to: 'mikesaxxmusic@gmail.com', // Use your admin email
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
    sql += ` WHERE status = '${filter}'`; // Adjust this based on your data structure
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
