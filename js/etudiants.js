let etudiants = JSON.parse(localStorage.getItem("etudiants")) || [
  { id: 1, nom: "Youssef", filiere: "Informatique", niveau: "S2" },
  { id: 2, nom: "Amina", filiere: "Réseaux", niveau: "S3" }
];

let etudiantIdCounter = 3;
let editEtudiantId = null;

function loadEtudiants() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <h2>Gestion des Étudiants</h2>

    <form id="etudiantForm">
      <input type="text" id="nom" placeholder="Nom" required />
      <input type="text" id="filiere" placeholder="Filière" required />
      <input type="text" id="niveau" placeholder="Niveau" required />
      <button type="submit">Ajouter</button>
    </form>

    <table border="1" width="100%" style="margin-top:20px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Filière</th>
          <th>Niveau</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="etudiantTable"></tbody>
    </table>
  `;

  displayEtudiants();
  document.getElementById("etudiantForm")
    .addEventListener("submit", addEtudiant);
}

function displayEtudiants() {
  const table = document.getElementById("etudiantTable");
  table.innerHTML = "";

  etudiants.forEach(e => {
    table.innerHTML += `
      <tr>
        <td>${e.id}</td>
        <td>${e.nom}</td>
        <td>${e.filiere}</td>
        <td>${e.niveau}</td>
        <td>
          <button onclick="editEtudiant(${e.id})">Edit</button>
          <button onclick="deleteEtudiant(${e.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addEtudiant(e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const filiere = document.getElementById("filiere").value;
  const niveau = document.getElementById("niveau").value;

  if (editEtudiantId === null) {
    etudiants.push({
      id: getNextId(etudiants),
      nom,
      filiere,
      niveau
    });
  } else {
    const etu = etudiants.find(e => e.id === editEtudiantId);
    etu.nom = nom;
    etu.filiere = filiere;
    etu.niveau = niveau;

    editEtudiantId = null;
    document.querySelector("#etudiantForm button").textContent = "Ajouter";
  }

  localStorage.setItem("etudiants", JSON.stringify(etudiants));
  loadStats();
  displayEtudiants();
  e.target.reset();
}

function editEtudiant(id) {
  const e = etudiants.find(x => x.id === id);

  document.getElementById("nom").value = e.nom;
  document.getElementById("filiere").value = e.filiere;
  document.getElementById("niveau").value = e.niveau;

  editEtudiantId = id;
  document.querySelector("#etudiantForm button").textContent = "Update";
}

function deleteEtudiant(id) {
  if (confirm("Delete this student?")) {
    etudiants = etudiants.filter(e => e.id !== id);
    
    localStorage.setItem("etudiants", JSON.stringify(etudiants));
    displayEtudiants();
    loadStats();
  }
}
