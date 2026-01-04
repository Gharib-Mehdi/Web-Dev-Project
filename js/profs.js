let editId = null;
let profIdCounter = 3; 

let profs = JSON.parse(localStorage.getItem("profs")) || [
  { id: 1, nom: "Ahmed", matiere: "Math" },
  { id: 2, nom: "Sara", matiere: "Physique" }
];


function loadProfs() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <h2>Gestion des Profs</h2>

    <form id="profForm">
      <input type="text" id="nom" placeholder="Nom du prof" required />
      <input type="text" id="matiere" placeholder="Matière" required />
      <button type="submit">Ajouter</button>
    </form>

    <table border="1" width="100%" style="margin-top:20px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Matière</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="profTable"></tbody>
    </table>
  `;

  displayProfs();

  document.getElementById("profForm").addEventListener("submit", addProf);
}

function displayProfs() {
  const table = document.getElementById("profTable");
  table.innerHTML = "";

  profs.forEach(prof => {
    table.innerHTML += `
      <tr>
        <td>${prof.id}</td>
        <td>${prof.nom}</td>
        <td>${prof.matiere}</td>
        <td>
          <button onclick="editProf(${prof.id})">Edit</button>
          <button onclick="deleteProf(${prof.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addProf(e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const matiere = document.getElementById("matiere").value;

  if (editId === null) {
    // CREATE
    const newProf = {
      id: getNextId(profs),
      nom: nom,
      matiere: matiere
    };
    profs.push(newProf);
  } else {
    // UPDATE
    const prof = profs.find(p => p.id === editId);
    prof.nom = nom;
    prof.matiere = matiere;

    editId = null;
    document.querySelector("#profForm button").textContent = "Ajouter";
  }

  localStorage.setItem("profs", JSON.stringify(profs));
  displayProfs();
  loadStats();
  e.target.reset();
}

function deleteProf(id) {
  if (confirm("Are you sure?")) {
    profs = profs.filter(prof => prof.id !== id);
    localStorage.setItem("profs", JSON.stringify(profs));
    loadStats();
    displayProfs();
  }
}

function editProf(id) {
  const prof = profs.find(p => p.id === id);

  document.getElementById("nom").value = prof.nom;
  document.getElementById("matiere").value = prof.matiere;

  editId = id;

  document.querySelector("#profForm button").textContent = "Update";
}