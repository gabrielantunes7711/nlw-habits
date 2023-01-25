const form = document.querySelector("form");
const nlwSetup = new NLWSetup(form);
const weekdayNames = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const button = document.querySelector("header button");

button.addEventListener("click", add);
form.addEventListener("change", save);

function add() {
  const today = new Date().toLocaleDateString("pt-br").slice("0,5");
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

function putWeekday() {
  const allAddedDay = document.querySelectorAll(".day div");

  if (allAddedDay != []) {
    for (const addedDay of allAddedDay) {
      const getDay = addedDay.innerText.slice(0, 2);
      const getMonth = addedDay.innerText.slice(3);
      const date = `${getMonth}/${getDay}`;
      const currentWeekday = getDayOfWeek(date);

      addedDay.innerHTML += `<span>${currentWeekday}</span>`;
    }
  }
}

const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {};

nlwSetup.setData(data);

nlwSetup.load();

putWeekday();
