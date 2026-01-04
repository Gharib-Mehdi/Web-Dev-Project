let salles = JSON.parse(localStorage.getItem("salles")) || [
  { id: 1, nom: "Salle A1", capacite: 30, type: "Cours" },
  { id: 2, nom: "Salle TP2", capacite: 20, type: "TP" }
];

let salleIdCounter = 3;
let editSalleId = null;

function loadSalles() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <h2>Gestion des Salles</h2>

    <form id="salleForm">
      <input type="text" id="nom" placeholder="Nom de la salle" required />
      <input type="number" id="capacite" placeholder="Capacité" required />
      
      <select id="type" required>
        <option value="">-- Type de salle --</option>
        <option value="Cours">Cours</option>
        <option value="TP">TP</option>
        <option value="Amphi">Amphi</option>
      </select>

      <button type="submit">Ajouter</button>
    </form>

    <table border="1" width="100%" style="margin-top:20px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Capacité</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="salleTable"></tbody>
    </table>
  `;

  displaySalles();
  document.getElementById("salleForm")
    .addEventListener("submit", addSalle);
}

function displaySalles() {
  const table = document.getElementById("salleTable");
  table.innerHTML = "";

  salles.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.nom}</td>
        <td>${s.capacite}</td>
        <td>${s.type}</td>
        <td>
          <button onclick="editSalle(${s.id})">Edit</button>
          <button onclick="deleteSalle(${s.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addSalle(e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const capacite = document.getElementById("capacite").value;
  const type = document.getElementById("type").value;

  if (editSalleId === null) {
    salles.push({
      id: getNextId(salles),
      nom,
      capacite,
      type
    });
  } else {
    const s = salles.find(x => x.id === editSalleId);
    s.nom = nom;
    s.capacite = capacite;
    s.type = type;

    editSalleId = null;
    document.querySelector("#salleForm button").textContent = "Ajouter";
  }
  
  localStorage.setItem("salles", JSON.stringify(salles));
  loadStats();
  displaySalles();
  e.target.reset();
}

function editSalle(id) {
  const s = salles.find(x => x.id === id);

  document.getElementById("nom").value = s.nom;
  document.getElementById("capacite").value = s.capacite;
  document.getElementById("type").value = s.type;

  editSalleId = id;
  document.querySelector("#salleForm button").textContent = "Update";
}

function deleteSalle(id) {
  if (confirm("Delete this room?")) {
    salles = salles.filter(s => s.id !== id);
    localStorage.setItem("salles", JSON.stringify(salles));
    displaySalles();
    loadStats();
  }
}

