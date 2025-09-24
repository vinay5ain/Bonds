let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
let bondData = JSON.parse(localStorage.getItem("bondData"));

if (!loggedInUser) window.location.href = "../index.html";

// Logout
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
});

// Points & History
let userPoints = loggedInUser.points || 100;
let partnerPoints = loggedInUser.partnerPoints || 100;
let history = loggedInUser.history || [];

function updatePoints() {
  const userEl = document.getElementById("userPoints");
  const partnerEl = document.getElementById("partnerPoints");
  if (userEl) userEl.textContent = userPoints;
  if (partnerEl) partnerEl.textContent = partnerPoints;
}
updatePoints();

function saveData() {
  loggedInUser.points = userPoints;
  loggedInUser.partnerPoints = partnerPoints;
  loggedInUser.history = history;
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.map(u => u.email === loggedInUser.email ? loggedInUser : u);
  localStorage.setItem("users", JSON.stringify(users));
}

function addHistory(msg) {
  history.unshift(msg);
  saveData();
  const historyBox = document.getElementById("history");
  if (!historyBox) return;
  if (historyBox.children.length === 1 && historyBox.children[0].textContent === "No history yet.") historyBox.innerHTML = "";
  const entry = document.createElement("div");
  entry.classList.add("list-item");
  entry.textContent = msg;
  historyBox.prepend(entry);
}

// Interaction form
const interactionForm = document.getElementById("interactionForm");
if (interactionForm) {
  interactionForm.addEventListener("submit", e => {
    e.preventDefault();
    const incident = document.getElementById("incident").value;
    const person = document.getElementById("person").value;
    const damage = document.getElementById("damage").value;

    let deduction = 10;
    if (damage === "mental") deduction = 15;
    if (damage === "trust") deduction = 20;
    if (damage === "time") deduction = 5;

    if (person === "you") userPoints -= deduction;
    else partnerPoints -= deduction;

    updatePoints();
    addHistory(`${person === "you" ? "You" : "Partner"} lost ${deduction} pts due to ${damage} damage (${incident}).`);
    interactionForm.reset();
    updateBondLevel();
  });
}

// Bond level progress
function updateBondLevel() {
  if (!bondData) return;
  const userProgress = document.getElementById("userProgress");
  const partnerProgress = document.getElementById("partnerProgress");
  const bondLevelText = document.getElementById("bondLevel");
  if (userProgress) userProgress.style.width = Math.min((userPoints / 500) * 100, 100) + "%";
  if (partnerProgress) partnerProgress.style.width = Math.min((partnerPoints / 500) * 100, 100) + "%";
  if (bondLevelText) {
    const totalPoints = userPoints + partnerPoints;
    let level = Math.floor((totalPoints / 1000) * 10);
    if (level < 1) level = 1;
    if (level > 10) level = 10;
    bondLevelText.textContent = level;
  }
}

// Restore history
if (history.length > 0) {
  const historyBox = document.getElementById("history");
  if (historyBox) {
    historyBox.innerHTML = "";
    history.forEach(msg => {
      const entry = document.createElement("div");
      entry.classList.add("list-item");
      entry.textContent = msg;
      historyBox.appendChild(entry);
    });
  }
}
updateBondLevel();

// Bond info
const bondInfoEl = document.getElementById("bondInfo");
if (bondInfoEl && bondData) {
  bondInfoEl.innerHTML = `
    <h3>Current Bond</h3>
    <p><strong>${bondData.userName}</strong> & <strong>${bondData.partnerName}</strong></p>
    <p>Type: <strong>${bondData.bondType}</strong></p>
    <p>Duration: <strong>${bondData.startDate}</strong> to <strong>${bondData.endDate}</strong></p>
  `;
}
