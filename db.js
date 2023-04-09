const express = require('express');
const { createPool } = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

const pool = createPool({
  host: '34.134.88.232',
  port: 3306,
  user: 'root',
  password: 'NRN',
  database: 'GameFinder',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Data endpoints
app.get('/data', (req, res) => {
  pool.query(
    'SELECT g.QueryName, AVG(r.review_score) AS avg_review_score FROM Games g JOIN Reviews r ON g.QueryName = r.app_name GROUP BY g.QueryID, g.QueryName HAVING AVG(r.review_score) >= 0.75 LIMIT 15;',
    (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/data2', (req, res) => {
  pool.query(
    'SELECT DISTINCT pu.Name, AVG(pu.Hours) AS avg_hours, pc.PlatformWindows FROM Purchases pu JOIN PC pc ON pu.Name = pc.QueryName WHERE pc.PlatformWindows = 1 GROUP BY pu.Name ORDER BY AVG(pu.Hours) DESC LIMIT 15;',
    (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error executing query');
        return;
      }
      res.json(results);
    }
  );
});

app.get('/check-login-status', (req, res) => {
  if (req.session.user) {
  res.json(true);
  } else {
  res.json(false);
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, hashedPassword],
    (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Error signing up');
        return;
      }
      res.send('Signup successful');
    }
  );
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      res.status(401).send('Invalid email or password');
      return;
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      res.status(401).send('Invalid email or password');
      return;
    }

    req.session.user = { id: user.id, email: user.email };
    res.send('Login successful');
  });
});

app.post('/add-pc', async (req, res) => {
  if (!req.session.user) {
    res.status(401).send('Unauthorized');
    return;
  }
  const userId = req.session.user.id;
  const pcData = req.body;
  const keys = Object.keys(pcData);
  const values = Object.values(pcData);

  // Add user_id to the values array
  values.unshift(userId);

  const sql = `
    INSERT INTO UserPC
    (user_id, ${keys.join(', ')})
    VALUES
    (?, ${values.map(() => '?').join(', ')})
  `;

  try {
    const [result] = await pool.query(sql, values);
    res.status(200).send('PC added successfully');
  } catch (err) {
    console.error('Error adding PC:', err);
    res.status(500).send('Error adding PC');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
