const express = require('express');
const { getAllRdv } = require('./rdv.service');
const { newRdv } = require('./rdv.service');
const { updateRdv } = require('./rdv.service');
const { deleteRdv } = require('./rdv.service');



const router = express.Router();

router.get('/', async(req, res) => {
  const allRdv = await getAllRdv();
  res.json(allRdv);
});  

router.post('/prise_rdv', async(req, res) => {
  const {date, heure, service, statut, client_id, pro_id} = req.body;
  const rdv = await newRdv(date, heure, service, statut, client_id, pro_id);
  res.json(rdv);
  console.log('rdv crée');
})

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



/** 
router.get('/prise_rendez_vous', function(req, res){

})*/


module.exports = router;