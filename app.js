const btnEl = document.querySelector(".btn");
const justNumEl = document.querySelector(".phone-number");
const sidebarEl = document.querySelector(".sidebar");
const overlayEl = document.querySelector(".overlay");

function openSidebar() {
  sidebarEl.classList.add("show");
  overlayEl.classList.add("show");
  renderPhoneNumbersList();
}

function closeSidebar() {
  sidebarEl.classList.remove("show");
  overlayEl.classList.remove("show");
}

const loadPhoneNumbers = () => {
  const storedNumbers = localStorage.getItem("phoneNumbers");
  return storedNumbers ? JSON.parse(storedNumbers) : [];
};

const savePhoneNumbers = (numbers) => {
  localStorage.setItem("phoneNumbers", JSON.stringify(numbers));
};

const renderPhoneNumbersList = () => {
  const phoneNumbers = loadPhoneNumbers();
  const listContainer = document.getElementById("phone-numbers-list");

  if (phoneNumbers.length === 0) {
    listContainer.innerHTML = "<p>No phone numbers added.</p>";
    return;
  }

  const listItems = phoneNumbers.map((number) => `<li>${number}</li>`).join("");
  listContainer.innerHTML = `<ul>${listItems}</ul>`;
};

const addPhoneNumber = () => {
  const input = document.getElementById("phone-input");
  const newNumber = input.value.trim();

  if (!newNumber.match(/^\+998 \d{2} \d{3} \d{2} \d{2}$/)) {
    alert("Please enter a valid phone number in the format: +998 XX XXX XX XX");
    return;
  }

  const phoneNumbers = loadPhoneNumbers();
  if (!phoneNumbers.includes(newNumber)) {
    phoneNumbers.push(newNumber);
    savePhoneNumbers(phoneNumbers);
    alert("Phone number added successfully!");
    renderPhoneNumbersList();
  } else {
    alert("This phone number already exists.");
  }

  input.value = "";
};

function randomTel() {
  btnEl.setAttribute("disabled", true);
  const phoneNumbers = loadPhoneNumbers();
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * phoneNumbers.length);
    justNumEl.textContent = phoneNumbers[randomIndex];
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    btnEl.removeAttribute("disabled");

    const index = phoneNumbers.indexOf(justNumEl.textContent);
    if (index > -1) phoneNumbers.splice(index, 1);
  }, 3000);
}

const toggleDarkMode = () => {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const toggleButton = document.getElementById("mode-toggle");
  if (body.classList.contains("dark-mode")) {
    toggleButton.textContent = "Light Mode";
  } else {
    toggleButton.textContent = "Dark Mode";
  }
};

const resetPhoneNumbers = () => {
  localStorage.removeItem("phoneNumbers");
  alert("All phone numbers have been reset.");
  document.getElementById("phone-number").textContent = "+998 00 000 00 00";
  renderPhoneNumbersList();
};

btnEl.addEventListener("click", randomTel);
document
  .getElementById("mode-toggle")
  .addEventListener("click", toggleDarkMode);
document
  .getElementById("reset-button")
  .addEventListener("click", resetPhoneNumbers);

document.addEventListener("DOMContentLoaded", renderPhoneNumbersList);
