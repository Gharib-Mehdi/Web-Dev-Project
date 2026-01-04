function getMoyenneNotes() {
  if (notes.length === 0) return 0;

  let total = 0;
  notes.forEach(n => {
    total += Number(n.note);
  });

  return (total / notes.length).toFixed(2);
}


function loadStats() {
  document.getElementById("statProfs").textContent = profs.length;
  document.getElementById("statEtudiants").textContent = etudiants.length;
  document.getElementById("statCours").textContent = cours.length;
  document.getElementById("statSalles").textContent = salles.length;
  document.getElementById("statNotes").textContent = getMoyenneNotes();
}

function loadDashboard() {
  loadStats();

  const content = document.getElementById("content");

  content.innerHTML = `
  <h3>Statistiques générales</h3>

  <canvas id="chartNotes"></canvas>

  <div class="charts-row">
    <canvas id="chartCours"></canvas>
    <canvas id="chartCoursProfs"></canvas>
  </div>

  <canvas id="chartNotesLine"></canvas>
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
        data: ranges,
        backgroundColor: "#2563eb"
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Répartition des notes par intervalle"
        }
      }
    }
  });
}

function createCoursChart() {
  const ctx = document.getElementById("chartCours");

  const uniqueCours = getUniqueCoursByIntitule();
  let labels = [];
  let data = [];

  uniqueCours.forEach(c => {
    labels.push(c.intitule);
    data.push(cours.filter(x => x.intitule === c.intitule).length);
  });

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: data
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Répartition des cours par matière"
        }
      }
    }
  });
}

function createCoursProfsChart() {
  const ctx = document.getElementById("chartCoursProfs");

  const uniqueProfs = getUniqueProfsByNom();
  let labels = [];
  let data = [];

  uniqueProfs.forEach(p => {
    labels.push(p.nom);
    data.push(cours.filter(c => c.profId == p.id).length);
  });

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: data
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Charge pédagogique par professeur"
        }
      }
    }
  });
}


function createNotesLineChart() {
  const ctx = document.getElementById("chartNotesLine");

  let labels = notes.map((_, index) => index + 1);
  let data = notes.map(n => n.note);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        tension: 0.3,
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Évolution chronologique des notes"
        }
      }
    }
  });
}


function getUniqueCoursByIntitule() {
  let unique = [];

  cours.forEach(c => {
    if (!unique.some(u => u.intitule === c.intitule)) {
      unique.push(c);
    }
  });

  return unique;
}

function getUniqueProfsByNom() {
  let unique = [];

  profs.forEach(p => {
    if (!unique.some(u => u.nom === p.nom)) {
      unique.push(p);
    }
  });

  return unique;
}
