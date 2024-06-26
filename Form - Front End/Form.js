function calculateAndDisplayTotalCost() {
  let totalDays = 0;
  let totalCost = 0;

  const personDetails = document.querySelectorAll(".personDetails");
  personDetails.forEach((details) => {
    const checkInValue = details.querySelector('input[name="CheckIn"]').value;
    const checkOutValue = details.querySelector('input[name="CheckOut"]').value;
    const transportValue = details.querySelector(
      'select[name="Transport"]'
    ).value;

    if (checkInValue && checkOutValue) {
      const checkIn = new Date(checkInValue);
      const checkOut = new Date(checkOutValue);

      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      totalDays += diffDays;

      if (transportValue === "Yes") {
        totalCost += diffDays * (250 + 150);
      } else {
        totalCost += diffDays * 250;
      }
    }
  });

  const totalCostDisplay = document.getElementById("totalCostDisplay");
  const totalCostInput = document.getElementById("totalCostInput");
  if (totalCostDisplay && totalCostInput) {
    totalCostDisplay.textContent = `Total Cost: ${totalCost}`;
    totalCostDisplay.style.color = "rgb(0, 221, 41)";
    totalCostDisplay.style.textAlign = "center";
    totalCostDisplay.style.fontSize = "1.5rem";
    totalCostInput.value = totalCost;
    totalCostInput.style.color = "rgb(0, 221, 41)";
  }
}

document
  .getElementById("addPersonButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.getElementById("accommodationForm");
    const personDetails = form.querySelector(".personDetails");
    const clonedDetails = personDetails.cloneNode(true);
    clonedDetails
      .querySelectorAll("input, select")
      .forEach((input) => (input.value = ""));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Person";
    removeButton.className = "removePerson";
    removeButton.addEventListener("click", function () {
      clonedDetails.parentNode.removeChild(clonedDetails);
      removeButton.parentNode.removeChild(removeButton);
      calculateAndDisplayTotalCost();
    });

    clonedDetails.insertBefore(removeButton, clonedDetails.querySelector("hr"));
    form.insertBefore(clonedDetails, document.getElementById("buttonBox"));

    const dateInputs = clonedDetails.querySelectorAll('input[type="date"]');
    dateInputs.forEach((input) => {
      input.addEventListener("change", calculateAndDisplayTotalCost);
    });

    const transportSelect = clonedDetails.querySelector(
      'select[name="Transport"]'
    );
    transportSelect.addEventListener("change", calculateAndDisplayTotalCost);

    calculateAndDisplayTotalCost();
  });

const dateInputs = document.querySelectorAll('input[type="date"]');
dateInputs.forEach((input) => {
  input.addEventListener("change", calculateAndDisplayTotalCost);
});

const transportSelects = document.querySelectorAll('select[name="Transport"]');
transportSelects.forEach((select) => {
  select.addEventListener("change", calculateAndDisplayTotalCost);
});

document
  .getElementById("accommodationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    form
      .querySelectorAll('input[type="hidden"]')
      .forEach((input) => input.remove());

    const personDetails = form.querySelectorAll(".personDetails");
    personDetails.forEach((details, index) => {
      const name = details.querySelector('input[name="Name"]').value;
      const workshopID = details.querySelector(
        'input[name="WorkshopID"]'
      ).value;
      const gender = details.querySelector('select[name="Gender"]').value;
      const phone = details.querySelector('input[name="Ph"]').value;
      const checkIn = details.querySelector('input[name="CheckIn"]').value;
      const checkOut = details.querySelector('input[name="CheckOut"]').value;
      const transport = details.querySelector('select[name="Transport"]').value;

      const nameInput = document.createElement("input");
      nameInput.type = "hidden";
      nameInput.name = `Name_${index}`;
      nameInput.value = name;
      form.appendChild(nameInput);

      const workshopIDInput = document.createElement("input");
      workshopIDInput.type = "hidden";
      workshopIDInput.name = `WorkshopID_${index}`;
      workshopIDInput.value = workshopID;
      form.appendChild(workshopIDInput);

      const genderInput = document.createElement("input");
      genderInput.type = "hidden";
      genderInput.name = `Gender_${index}`;
      genderInput.value = gender;
      form.appendChild(genderInput);

      const phoneInput = document.createElement("input");
      phoneInput.type = "hidden";
      phoneInput.name = `Ph_${index}`;
      phoneInput.value = phone;
      form.appendChild(phoneInput);

      const checkInInput = document.createElement("input");
      checkInInput.type = "hidden";
      checkInInput.name = `CheckIn_${index}`;
      checkInInput.value = checkIn;
      form.appendChild(checkInInput);

      const checkOutInput = document.createElement("input");
      checkOutInput.type = "hidden";
      checkOutInput.name = `CheckOut_${index}`;
      checkOutInput.value = checkOut;
      form.appendChild(checkOutInput);

      const transportInput = document.createElement("input");
      transportInput.type = "hidden";
      transportInput.name = `Transport_${index}`;
      transportInput.value = transport;
      form.appendChild(transportInput);
    });

    const totalCostInput = document.createElement("input");
    totalCostInput.type = "hidden";
    totalCostInput.name = "TotalCost";
    totalCostInput.value = document
      .getElementById("totalCostDisplay")
      .textContent.replace("Total Cost: ", "");
    form.appendChild(totalCostInput);

    form.submit();
  });

document.addEventListener("DOMContentLoaded", (event) => {
  const checkInInput = document.querySelector('input[name="CheckIn"]');
  const checkOutInput = document.querySelector('input[name="CheckOut"]');

  checkOutInput.min = checkInInput.value; // Initial minimum set to check-in date

  checkInInput.addEventListener("change", () => {
    const checkInDate = new Date(checkInInput.value);
    const nextDayYear = checkInDate.getFullYear();
    const nextDayMonth = checkInDate.getMonth() + 1; // Month is zero-indexed
    const nextDayDate = checkInDate.getDate() + 1;

    const nextDayISO = `${nextDayYear}-${nextDayMonth
      .toString()
      .padStart(2, "0")}-${nextDayDate.toString().padStart(2, "0")}`;
    checkOutInput.min = nextDayISO;
  });
});
