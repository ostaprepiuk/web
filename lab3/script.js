// Клас ферми
class Farm {
  constructor(location, animals, power) {
    this.location = location;
    this.animals = animals;
    this.power = power;
  }
}

// Дані
let farms = [
  new Farm("Львів", 25, 1200),
  new Farm("Тернопіль", 15, 900),
  new Farm("Київ", 40, 2500),
  new Farm("Харків", 20, 1600),
  new Farm("Одеса", 30, 2000)
];

const tableBody = document.querySelector("#tableBody");
const searchInput = document.querySelector("#searchInput");
const totalPower = document.querySelector("#totalPower");

// Функція показу таблиці
function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach(farm => {
    tableBody.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${farm.location}</td>
        <td>${farm.animals}</td>
        <td>${farm.power}</td>
      </tr>
    `);
  });
}

renderTable(farms);

// Пошук
document.querySelector("#searchBtn").addEventListener("click", () => {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = farms.filter(f => f.location.toLowerCase().includes(term));
  renderTable(filtered);
});

// Сортування
document.querySelector("#sortBtn").addEventListener("click", () => {
  const sortBy = document.querySelector("#sortSelect").value;
  farms.sort((a, b) => {
    if (typeof a[sortBy] === "string") {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return a[sortBy] - b[sortBy];
  });
  renderTable(farms);
});

// Рахуємо загальну потужність
document.querySelector("#countBtn").addEventListener("click", () => {
  const total = farms.reduce((sum, f) => sum + f.power, 0);
  totalPower.textContent = `Загальна потужність вентиляторів: ${total} Вт`;
});
