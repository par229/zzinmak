// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost:1521',
    user: 'sys',
    password: '^^alsgud229',
    database: 'newtest.sql',
  });

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

app.post('/api/projects/add', (req, res) => {
  const projectData = req.body;

  // 데이터베이스에 프로젝트 정보 저장
  const sql = 'INSERT INTO projects SET ?';
  db.query(sql, projectData, (err, result) => {
    if (err) {
      console.error('Error inserting project into database: ' + err.stack);
      res.status(500).json({ success: false, message: 'Failed to save project.' });
      return;
    }

    console.log('Project added to database');
    res.status(200).json({ success: true, message: 'Project saved successfully.' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
