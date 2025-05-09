const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'earist',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database: earist');
});


app.get('/cor', (req, res) => {
  const sql = 'SELECT * FROM certificate_of_registration';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching COR data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});


app.get('/cor/:student_no', (req, res) => {
  const { student_no } = req.params;
  const sql = 'SELECT * FROM certificate_of_registration WHERE student_no = ?';
  db.query(sql, [student_no], (err, results) => {
    if (err) {
      console.error('Error fetching COR by student number:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});


app.get('/cor/byreg/:registration_no', (req, res) => {
  const { registration_no } = req.params;
  const sql = 'SELECT * FROM certificate_of_registration WHERE registration_no = ?';
  db.query(sql, [registration_no], (err, results) => {
    if (err) {
      console.error('Error fetching COR by registration number:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});


app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
