function loadStats() {
  document.getElementById("statProfs").textContent = profs.length;
  document.getElementById("statEtudiants").textContent = etudiants.length;
  document.getElementById("statCours").textContent = cours.length;
  document.getElementById("statSalles").textContent = salles.length;
  document.getElementById("statNotes").textContent = notes.length;
}

function loadDashboard() {
  loadStats();

  const content = document.getElementById("content");

  content.innerHTML = `
  <h3>Statistiques générales</h3>

  <canvas id="chartNotes"></canvas>

  <canvas id="chartCours" style="margin-top:40px;"></canvas>

  <canvas id="chartCoursProfs" style="margin-top:40px;"></canvas>

  <canvas id="chartNotesLine" style="margin-top:40px;"></canvas>
`;

  createNotesChart();
  createCoursChart();
  createCoursProfsChart();
  createNotesLineChart();

}

function createNotesChart() {
  const ctx = document.getElementById("chartNotes");

  let ranges = [0, 0, 0, 0];

  notes.forEach(n => {
    if (n.note <= 5) ranges[0]++;
    else if (n.note <= 10) ranges[1]++;
    else if (n.note <= 15) ranges[2]++;
    else ranges[3]++;
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["0-5", "6-10", "11-15", "16-20"],
      datasets: [{
        label: "Répartition des notes",
        data: ranges,
        backgroundColor: "#2563eb"
      }]
    }
  });
}

function createCoursChart() {
  const ctx = document.getElementById("chartCours");

  let labels = [];
  let data = [];

  cours.forEach(c => {
    labels.push(c.intitule);
    data.push(notes.filter(n => n.coursId == c.id).length);
  });

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data
      }]
    }
  });
}

function createCoursProfsChart() {
  const ctx = document.getElementById("chartCoursProfs");

  let labels = [];
  let data = [];

  profs.forEach(p => {
    labels.push(p.nom);
    data.push(cours.filter(c => c.profId == p.id).length);
  });

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        label: "Cours par professeur",
        data: data
      }]
    }
  });
}

function createNotesLineChart() {
  const ctx = document.getElementById("chartNotesLine");

  let labels = notes.map((n, index) => index + 1);
  let data = notes.map(n => n.note);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Évolution des notes",
        data: data,
        tension: 0.3,
        fill: false,
        borderWidth: 2
      }]
    }
  });
}

