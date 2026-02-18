const express = require('express');
const rdvRoutes = require('./modules/rdv/rdv.routes')
const app = express();

app.use(express.json())
app.use('/', rdvRoutes);

app.listen(3000, () => {
  console.log('Serveur lancé');
});

