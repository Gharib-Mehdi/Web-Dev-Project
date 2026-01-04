let notes = JSON.parse(localStorage.getItem("notes")) || [
  { id: 1, etudiantId: 1, coursId: 1, note: 15 }
];

let notesIdCounter = 2;
let editNoteId = null;

function loadNotes() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <h2>Gestion des Notes</h2>

    <form id="noteForm">
      <select id="etudiantSelect" required>
        <option value="">-- Choisir un étudiant --</option>
      </select>

      <select id="coursSelect" required>
        <option value="">-- Choisir un cours --</option>
      </select>

      <input type="number" id="noteValue" placeholder="Note /20" min="0" max="20" required />

      <button type="submit">Ajouter</button>
    </form>

    <table border="1" width="100%" style="margin-top:20px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Étudiant</th>
          <th>Cours</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="notesTable"></tbody>
    </table>
  `;

  loadEtudiantOptions();
  loadCoursOptionsForNotes();
  displayNotes();

  document.getElementById("noteForm")
    .addEventListener("submit", addNote);
}

function loadEtudiantOptions() {
  const select = document.getElementById("etudiantSelect");
  select.innerHTML += etudiants.map(e =>
    `<option value="${e.id}">${e.nom}</option>`
  ).join("");
}

function loadCoursOptionsForNotes() {
  const select = document.getElementById("coursSelect");
  select.innerHTML += cours.map(c =>
    `<option value="${c.id}">${c.intitule}</option>`
  ).join("");
}

function displayNotes() {
  const table = document.getElementById("notesTable");
  table.innerHTML = "";

  notes.forEach(n => {
    const etudiant = etudiants.find(e => e.id == n.etudiantId);
    const coursItem = cours.find(c => c.id == n.coursId);

    table.innerHTML += `
      <tr>
        <td>${n.id}</td>
        <td>${etudiant ? etudiant.nom : "—"}</td>
        <td>${coursItem ? coursItem.intitule : "—"}</td>
        <td>${n.note}/20</td>
        <td>
          <button onclick="editNote(${n.id})">Edit</button>
          <button onclick="deleteNote(${n.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addNote(e) {
  e.preventDefault();

  const etudiantId = document.getElementById("etudiantSelect").value;
  const coursId = document.getElementById("coursSelect").value;
  const noteValue = document.getElementById("noteValue").value;

  if (editNoteId === null) {
    notes.push({
      id: getNextId(notes),
      etudiantId,
      coursId,
      note: noteValue
    });
  } else {
    const n = notes.find(x => x.id === editNoteId);
    n.etudiantId = etudiantId;
    n.coursId = coursId;
    n.note = noteValue;

    editNoteId = null;
    document.querySelector("#noteForm button").textContent = "Ajouter";
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  loadStats();
  displayNotes();
  e.target.reset();
}

function editNote(id) {
  const n = notes.find(x => x.id === id);

  document.getElementById("etudiantSelect").value = n.etudiantId;
  document.getElementById("coursSelect").value = n.coursId;
  document.getElementById("noteValue").value = n.note;

  editNoteId = id;
  document.querySelector("#noteForm button").textContent = "Update";
}

function deleteNote(id) {
  if (confirm("Delete this note?")) {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
    loadStats();
  }
}
