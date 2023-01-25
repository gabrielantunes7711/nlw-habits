const form = document.querySelector("form");
const nlwSetup = new NLWSetup(form);
const addDay = document.querySelector("header button");

addDay.addEventListener("click", add);
form.addEventListener("change", save);

function add() {
  const today = new Date().toLocaleDateString("pt-br");
  const dayExists = nlwSetup.dayExists(today);

  if (dayExists) {
    alert("Dia já incluso");
    return;
  }

  nlwSetup.addDay(today);
  alert("Adicionado com sucesso");

  putWeekday();
}

function save() {
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data));
}

function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][
        dayOfWeek
      ];
}

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {};

nlwSetup.setData(data);

nlwSetup.load();

putWeekday();

// Includes Weekday on Date
function putWeekday() {
  const allAddedDays = document.querySelectorAll(".day div");

  if (allAddedDays != []) {
    for (const addedDay of allAddedDays) {
      const getDay = addedDay.innerText.slice(0, 2);
      const getMonth = addedDay.innerText.slice(3);
      const date = `${getMonth}/${getDay}/2023`;
      const currentWeekday = getDayOfWeek(date);

      addedDay.innerHTML += `<span>${currentWeekday}</span>`;
    }
  }
}

// Toggle Select
function toggleSelect(button) {
  button.addEventListener("click", () => {
    const containerOptions = button.nextElementSibling;
    let containerOptionsHeight = 0;

    for (const children of containerOptions.children) {
      containerOptionsHeight += children.offsetHeight;

      children.addEventListener("click", () => {
        containerOptions.classList.remove("open");
        containerOptions.style.height = null;
      });
    }

    containerOptions.classList.toggle("open");

    if (containerOptions.classList.contains("open")) {
      containerOptions.style.height = `${containerOptionsHeight}px`;
    } else {
      containerOptions.style.height = null;
    }
  });
}

// Toggle Month Select
const selectMonthBtn = document.getElementById("selectMonth");
toggleSelect(selectMonthBtn);

// Filter Month
const allMonths = document.querySelectorAll(".container-month span");

for (const month of allMonths) {
  month.addEventListener("click", () => {
    const allAddedDays = document.querySelectorAll(".day");
    monthValue = month.dataset.monthValue;

    for (const day of allAddedDays) {
      if (day.firstElementChild.innerText.includes(monthValue)) {
        day.style.display = "flex";
      } else {
        day.style.display = "none";
      }
    }
  });
}
