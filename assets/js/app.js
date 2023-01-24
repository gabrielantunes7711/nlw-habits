const form = document.querySelector("form");
const nlwSetup = new NLWSetup(form);
const weekdayNames = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];
const currentWeekday = weekdayNames[new Date().getDay()];

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

function putWeekday() {
  const allAddedDay = document.querySelectorAll(".day div");

  console.log(allAddedDay);

  if (allAddedDay != []) {
    for (const addedDay of allAddedDay) {
      addedDay.innerHTML += `<span>${currentWeekday}</span>`;
    }
  }
}
const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {};

nlwSetup.setData(data);

nlwSetup.load();

putWeekday();
