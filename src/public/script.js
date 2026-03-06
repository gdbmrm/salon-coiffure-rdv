let token = "";

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        token = data.token;
        alert(`Connecté en tant que ${data.client.nom}`);
        loadPros();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  });
}

async function loadPros() {
  try {
    const res = await fetch("/rdv/pros");
    const pros = await res.json();

    console.log("Pros reçus :", pros);

    const select = document.getElementById("pro_id");
    select.innerHTML = "";
    pros.forEach((pro) => {
      const option = document.createElement("option");
      option.value = pro.id;
      option.textContent = `${pro.nom} ${pro.prenom}`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPros();
});

// Prendre RDV
const rdvForm = document.getElementById("rdvForm");
if (rdvForm) {
  rdvForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const date_rdv = document.getElementById("date_rdv").value;
    const heure_rdv = document.getElementById("heure_rdv").value;
    const prestation = document.getElementById("prestation").value;
    const pro_id = parseInt(document.getElementById("pro_id").value);

    try {
      const res = await fetch("/rdv/prise_rdv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date_rdv, heure_rdv, prestation, pro_id }),
      });
      const data = await res.json();
      document.getElementById("result").textContent = JSON.stringify(
        data,
        null,
        2,
      );
      bcrypt.hash("motdepasse", 10).then(console.log);
    } catch (err) {
      console.error(err);
      document.getElementById("result").textContent = "Erreur serveur";
    }
  });
}

async function loadRdv() {
  try {
    const res = await fetch("/rdv");
    const rdvs = await res.json();
    console.log("RDV reçus :", rdvs);

    const tbody = document.querySelector("#rdvTable tbody");
    tbody.innerHTML = "";

    rdvs.forEach((rdv) => {
      const dateObj = new Date(rdv.date_rdv);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${dateObj.toLocaleDateString("fr-FR")}</td>
        <td>${rdv.heure_rdv}</td>
        <td>${rdv.prestation}</td>
        <td>${rdv.pro_nom ? rdv.pro_nom : rdv.pro_id}</td>
        <td>${rdv.statut}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadRdv();
});
