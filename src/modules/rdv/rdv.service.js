const pool = require("../../config/db");

async function getAllRdv() {
  try {
    const [rows] = await pool.query(`
      SELECT rdv.*, pro.nom AS pro_nom, pro.prenom AS pro_prenom
      FROM rdv
      LEFT JOIN pro ON rdv.pro_id = pro.id
      ORDER BY rdv.date_rdv, rdv.heure_rdv;
    `);
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getAllClient() {
  try {
    const [rows] = await pool.query("SELECT * FROM client;");
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getAllPro() {
  try {
    const [rows] = await pool.query("SELECT * FROM pro;");
    return rows;
  } catch (err) {
    throw err;
  }
}

async function newRdv(date_rdv, heure_rdv, prestation, client_id, pro_id) {
  try {
    const [rows] = await pool.query("INSERT INTO `rdv` (`date_rdv`, `heure_rdv`, `prestation`, `client_id`, `pro_id`) VALUES (?, ?, ?, ?, ?);"
      , [date_rdv, heure_rdv, prestation, client_id, pro_id]
    );
    return rows;
  } catch (err) {
      throw err;
  }
}

async function updateRdv(id, date, heure, service, statut, client_id, pro_id) {
  try {
    const [rows] = await pool.query("UPDATE `rdv` SET date = ?, heure = ?, service = ?, statut = ?, client_id = ?, pro_id = ? WHERE id = ?;",
      [date, heure, service, statut, client_id, pro_id, id]
    );
  } catch (err) {
      throw err;
  }
}

async function deleteRdv(id) {
  try {
    const [rows] = await pool.query("DELETE FROM `rdv` WHERE id = ?;", [id]);
  } catch (err) {
      throw err;
  }
}

async function checkDisponibilite(date_rdv, heure_rdv, pro_id) {
  const [rows] = await pool.query(
    "SELECT * FROM rdv WHERE date_rdv=? AND heure_rdv=? AND pro_id=? AND statut!='refuse'",
    [date_rdv, heure_rdv, pro_id]
  );
  return rows.length === 0;
}

async function updateRdvStatus(id, statut) {
  const [rows] = await pool.query(
    "UPDATE rdv SET statut=? WHERE id=?",
    [statut, id]
  );
  return rows;
}

module.exports = {getAllRdv, getAllPro, getAllClient, newRdv, updateRdv, deleteRdv, checkDisponibilite, updateRdvStatus};