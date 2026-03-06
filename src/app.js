const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const rdvRoutes = require('./modules/rdv/rdv.routes');
const auth = require('./modules/client/auth.routes')
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/rdv', rdvRoutes);
app.use('/auth', auth)

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});