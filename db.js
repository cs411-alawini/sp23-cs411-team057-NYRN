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

// Creating indexes
// pool.query('CREATE INDEX idx_games_query_name ON Games(QueryName)', (err, results) => {
//   if (err) {
//     console.error('Error creating index:', err);
//     return;
//   }
//   console.log('Index created');
// });


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

app.get('/data3', (req, res) => {
  pool.query(
    'SELECT * FROM users',
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

// Update user endpoint
app.put('/update-user', async (req, res) => {
  const { id, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
      'UPDATE users SET email = ?, password_hash = ? WHERE id = ?',
      [email, hashedPassword, id],
      (err, results) => {
          if (err) {
              console.error('Error updating user:', err);
              res.status(500).send('Error updating user');
              return;
          }
          res.send('User updated');
      }
  );
});

// Delete user endpoint
app.delete('/delete-user/:id', (req, res) => {
  const { id } = req.params;

  pool.query(
      'DELETE FROM users WHERE id = ?',
      [id],
      (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).send('Error deleting user');
            return;
        }
        res.send('User deleted');
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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
