const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../../config/db');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const [rows] = await pool.query(
      "INSERT INTO client (nom, prenom, email, password) VALUES (?, ?, ?, ?)",
      [nom, prenom, email, hashed]
    );

    res.json({ message: "Compte créé", id: rows.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM client WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(401).json({ message: "Email inconnu" });

    const client = rows[0];
    const valid = await bcrypt.compare(password, client.mot_de_passe);
    if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: client.id, nom: client.nom }, process.env.SECRET, { expiresIn: '1h' });
    res.json({ message: "Connecté", token, client: { id: client.id, nom: client.nom } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;