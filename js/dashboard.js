const menuItems = document.querySelectorAll(".menu-item");
const content = document.getElementById("content");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const page = item.dataset.page;

    if (page === "profs") {
      loadProfs();
    }
    else if (page === "etudiants") {
      loadEtudiants();
    }
    else if (page === "salles") {
      loadSalles();
    }
    else if (page === "cours") {
      loadCours();
    }
    else if (page === "notes") {
      loadNotes();
    }
    else if (page === "dashboard") {
      loadDashboard();
    }
  });
});
