let cours = JSON.parse(localStorage.getItem("cours")) || [
  { id: 1, intitule: "Algorithme", profId: 1, salleId: 1, volume: 30 }
];

let coursIdCounter = 2;
let editCoursId = null;

function loadCours() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <h2>Gestion des Cours</h2>

    <form id="coursForm">
      <input type="text" id="intitule" placeholder="Intitulé du cours" required />

      <select id="profSelect" required>
        <option value="">-- Choisir un prof --</option>
      </select>

      <select id="salleSelect" required>
        <option value="">-- Choisir une salle --</option>
      </select>

      <input type="number" id="volume" placeholder="Volume horaire" required />

      <button type="submit">Ajouter</button>
    </form>

    <table border="1" width="100%" style="margin-top:20px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Intitulé</th>
          <th>Prof</th>
          <th>Salle</th>
          <th>Volume</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="coursTable"></tbody>
    </table>
  `;

  loadProfOptions();
  loadSalleOptions();
  displayCours();

  document.getElementById("coursForm")
    .addEventListener("submit", addCours);
}

function loadProfOptions() {
  const select = document.getElementById("profSelect");
  select.innerHTML += profs.map(p =>
    `<option value="${p.id}">${p.nom}</option>`
  ).join("");
}

function loadSalleOptions() {
  const select = document.getElementById("salleSelect");
  select.innerHTML += salles.map(s =>
    `<option value="${s.id}">${s.nom}</option>`
  ).join("");
}

function displayCours() {
  const table = document.getElementById("coursTable");
  table.innerHTML = "";

  cours.forEach(c => {
    const prof = profs.find(p => p.id == c.profId);
    const salle = salles.find(s => s.id == c.salleId);

    table.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.intitule}</td>
        <td>${prof ? prof.nom : "—"}</td>
        <td>${salle ? salle.nom : "—"}</td>
        <td>${c.volume} h</td>
        <td>
          <button onclick="editCours(${c.id})">Edit</button>
          <button onclick="deleteCours(${c.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addCours(e) {
  e.preventDefault();

  const intitule = document.getElementById("intitule").value;
  const profId = document.getElementById("profSelect").value;
  const salleId = document.getElementById("salleSelect").value;
  const volume = document.getElementById("volume").value;

  if (editCoursId === null) {
    cours.push({
      id: getNextId(cours),
      intitule,
      profId,
      salleId,
      volume
    });
  } else {
    const c = cours.find(x => x.id === editCoursId);
    c.intitule = intitule;
    c.profId = profId;
    c.salleId = salleId;
    c.volume = volume;

    editCoursId = null;
    document.querySelector("#coursForm button").textContent = "Ajouter";
  }

  localStorage.setItem("cours", JSON.stringify(cours));
  displayCours();
  loadStats();
  e.target.reset();
}

function editCours(id) {
  const c = cours.find(x => x.id === id);

  document.getElementById("intitule").value = c.intitule;
  document.getElementById("profSelect").value = c.profId;
  document.getElementById("salleSelect").value = c.salleId;
  document.getElementById("volume").value = c.volume;

  editCoursId = id;
  document.querySelector("#coursForm button").textContent = "Update";
}

function deleteCours(id) {
  if (confirm("Delete this course?")) {
    cours = cours.filter(c => c.id !== id);
    
    localStorage.setItem("cours", JSON.stringify(cours));
    displayCours();
    loadStats();
  }
}
