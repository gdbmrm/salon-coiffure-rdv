const express = require('express');
const { getAllRdv, getAllPro, newRdv, updateRdv, deleteRdv, updateRdvStatus, checkDisponibilite } = require('./rdv.service');
const router = express.Router();
const authMiddleware = require('../../middlewares/authHandler');

router.get('/', async(req, res) => {
  const allRdv = await getAllRdv();
  res.json(allRdv);
});  

router.post('/prise_rdv',authMiddleware,  async(req, res) => {
  try {
    const {date, heure, service, pro_id} = req.body;
    const client_id = req.user.id;
    const dispo = await checkDisponibilite(date, heure, pro_id);

    if (!dispo) {
      return res.status(400).json({ message: "Créneau indisponible" });
    }
    console.log('Avant insert:', date, heure, service, client_id, pro_id);
    const rdv = await newRdv(date, heure, service, client_id, pro_id);

    res.json({ message: "Demande de RDV envoyée", rdv });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.put('/rdv', async(req, res) => {
  const {id, date, heure, service, statut, client_id, pro_id} = req.body;
  const rdv = await updateRdv(id, date, heure, service, statut, client_id, pro_id);
  res.json(rdv);
})

router.delete('/rdv', async(req, res) => {
  const {id} = req.body;
  const deletion = await deleteRdv(id);
  res.json(deletion);
})

router.put('/admin/confirm_rdv', async (req, res) => {
  const {id} = req.body;

  const rdv = await updateRdvStatus(id, "confirme");

  res.json({
    message: "RDV confirmé",
    rdv
  });
});

router.get('/pros', async (req, res) => {
  try {
    const pros = await getAllPro();
    res.json(pros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


module.exports = router;