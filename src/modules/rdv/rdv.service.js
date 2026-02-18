const pool = require("../../config/db");

async function getAllRdv() {
  try {
    const [rows] = await pool.query("SELECT * FROM rdv;");
    console.log(rows);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getAllClient() {
  try {
    const [rows] = await pool.query("SELECT * FROM clien;");
    console.log(rows);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function getAllPro() {
  try {
    const [rows] = await pool.query("SELECT * FROM pro;");
    console.log(rows);
    return rows;
  } catch (err) {
    console.error(err);
  }
}

async function newRdv(date, heure, service, statut, client_id, pro_id) {
  try {
    const [rows] = await pool.query("INSERT INTO `rdv` (`date`, `heure`, `service`, `statut`, `client_id`, `pro_id`) VALUES (?, ?, ?, ?, ?, ?);"
      , [date, heure, service, statut, client_id, pro_id]
    );
  } catch (err) {
      console.error(err);
  }
}

async function updateRdv(id, date, heure, service, statut, client_id, pro_id) {
  try {
    const [rows] = await pool.query("UPDATE `rdv` SET date = ?, heure = ?, service = ?, statut = ?, client_id = ?, pro_id = ? WHERE id = ?;",
      [date, heure, service, statut, client_id, pro_id, id]
    );
  } catch (err) {
      console.error(err);
  }
}

async function deleteRdv(id) {
  try {
    const [rows] = await pool.query("DELETE FROM `rdv` WHERE id = ?;", [id]);
  } catch (err) {
      console.error(err);
  }
}


module.exports = {getAllRdv, newRdv, updateRdv, deleteRdv};