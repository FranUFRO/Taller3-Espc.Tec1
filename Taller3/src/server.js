import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos
const db = new sqlite3.Database('./proyectoEspecializacion1.db');

// Crear tabla de usuarios
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS user_stats(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    total_games INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) 
    REFERENCES users(id)
)`);

//db.run(`INSERT INTO users (username,password) VALUES ('fran','1234'),('test','test')`); //se uso para insertar a los dos usuarios de prueba

// CRUD Endpoints
db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row);
    });
});

// Validar inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT id, username FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            return res.status(500).send('Error logging in');
        }
        if (row) {
            res.json({ message: 'Login successful', userId: row.id, username: row.username });
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password) VALUES (?,?)', [username, password] ,(err) => {
        if (err) {
          console.error(`Error registrando al usuario`, err);
          return res.status(500).send('Error registrando al usuario');
        }
        return res.status(200).send('Usuario registrado correctamente');
      });
});



// Obtener estadísticas de un usuario
app.get('/obtener-stats/:userId', (req, res) => {
    const userId = req.params.userId;
    db.get('SELECT * FROM user_stats WHERE user_id = ?', [userId], (err, row) => {
      if (err) {
        console.error('Error retrieving user stats:', err);
        return res.status(500).send('Error retrieving user stats');
      }
      if (row) {
        res.json(row);
      } else {
        console.log(`No stats found for user ${userId}, creating default stats`);
        db.run("INSERT INTO user_stats (user_id, wins, losses, total_games) VALUES (?, 0, 0, 0)", [userId], (err) => {
          if (err) {
            console.error(`Error creating default stats for user ${userId}:`, err);
            return res.status(500).send('Error creating default user stats');
          }
          res.json({user_id: userId, wins: 0, losses: 0, total_games: 0});
        });
      }
    });
});

// Actualizar estadísticas de un usuario
app.post('/actualizar-stats/:userId', (req, res) => {
    const userId = req.params.userId;
    const { wins, losses, totalGames } = req.body;

    db.run('UPDATE user_stats SET wins = ?, losses = ?, total_games = ? WHERE user_id = ?',
        [wins, losses, totalGames, userId],
        function (err) {
            if (err) {
                return res.status(500).send('Error updating user stats');
            }
            res.send(`User stats updated for user with ID ${userId}`);
        });
});

app.get('/obtener-id-user/:username', (req, res) => {
    const username = req.params.username;
    db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            return res.status(500).send('Error retrieving user ID');
        }
        if (row) {
            res.json({ userId: row.id });
        } else {
            res.status(404).send('User not found');
        }
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});
