const pool = require("./config/db");

async function testClients() {
  try {
    const [rows] = await pool.query("SELECT * FROM client;");
    console.log(rows);
  } catch (err) {
    console.error(err);
  }
}

testClients();
