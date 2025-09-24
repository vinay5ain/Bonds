let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) {
  window.location.href = "../index.html";
}

const bondSetupForm = document.getElementById("bondSetupForm");
if (bondSetupForm) {
  const userNameInput = document.getElementById("userName");
  const partnerNameInput = document.getElementById("partnerName");
  const bondTypeSelect = document.getElementById("bondType");
  const bondDurationSelect = document.getElementById("bondDuration");
  const bondStartDateInput = document.getElementById("bondStartDate");
  const bondEndDateInput = document.getElementById("bondEndDate");
  const bondSummary = document.getElementById("bondSummary");
  const startBondBtn = document.getElementById("startBondBtn");
  const bondInfo = document.getElementById("bondInfo");

  const today = new Date().toISOString().split("T")[0];
  bondStartDateInput.value = today;
  bondEndDateInput.value = today;

  function updateEndDate() {
    const startDate = new Date(bondStartDateInput.value);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + parseInt(bondDurationSelect.value));
    bondEndDateInput.value = endDate.toISOString().split("T")[0];
  }
  bondStartDateInput.addEventListener("change", updateEndDate);
  bondDurationSelect.addEventListener("change", updateEndDate);
  updateEndDate();

  function updateSummary() {
    bondSummary.innerHTML = `
      <p><strong>${userNameInput.value || "Your Name"}</strong> & <strong>${partnerNameInput.value || "Partner's Name"}</strong></p>
      <p>Bond Type: <strong>${bondTypeSelect.options[bondTypeSelect.selectedIndex].text}</strong></p>
      <p>Duration: <strong>${bondStartDateInput.value}</strong> to <strong>${bondEndDateInput.value}</strong></p>
    `;
  }

  [userNameInput, partnerNameInput, bondTypeSelect, bondStartDateInput, bondEndDateInput].forEach(el => {
    el.addEventListener("input", updateSummary);
    el.addEventListener("change", updateSummary);
  });
  updateSummary();

  startBondBtn.addEventListener("click", () => {
    if (!userNameInput.value || !partnerNameInput.value) return alert("Enter both names");
    const bondData = {
      userName: userNameInput.value,
      partnerName: partnerNameInput.value,
      bondType: bondTypeSelect.value,
      startDate: bondStartDateInput.value,
      endDate: bondEndDateInput.value,
    };
    localStorage.setItem("bondData", JSON.stringify(bondData));
    alert("Bond started!");
    window.location.href = "dashboard.html";
  });
}
