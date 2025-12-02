// Клас ферми
class Farm {
  constructor(location, animals, power) {
    this.id = Date.now() + Math.random(); // Унікальний ID
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
  new Farm("Одеса", 30, 2000),
  new Farm("Івано-Франківськ", 12, 750),
  new Farm("Вінниця", 24, 1150),
  new Farm("Запоріжжя", 34, 1900),
  new Farm("Дніпро", 28, 1350),
  new Farm("Миколаїв", 21, 1100),
  new Farm("Чернігів", 19, 1050),
  new Farm("Житомир", 13, 875),
  new Farm("Чернівці", 16, 950)
];

const tableBody = document.querySelector("#tableBody");
const searchInput = document.querySelector("#searchInput");
const totalPower = document.querySelector("#totalPower");

// Елементи модального вікна
const farmModal = document.querySelector("#farmModal");
const closeBtn = document.querySelector(".close-btn");
const showCreateBtn = document.querySelector("#showCreateBtn");
const farmForm = document.querySelector("#farmForm");
const modalTitle = document.querySelector("#modalTitle");

// Поля форми
const farmIdInput = document.querySelector("#farmId");
const locationInput = document.querySelector("#location");
const animalsInput = document.querySelector("#animals");
const powerInput = document.querySelector("#power");


// --------------------------------------------------------------------
// ФУНКЦІЇ ВІДОБРАЖЕННЯ ТАБЛИЦІ
// --------------------------------------------------------------------

// Функція показу таблиці (оновлена для кнопки редагування)
function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach(farm => {
    tableBody.insertAdjacentHTML("beforeend", `
      <tr data-id="${farm.id}">
        <td>${farm.location}</td>
        <td>${farm.animals}</td>
        <td>${farm.power}</td>
        <td><button class="edit-btn" data-id="${farm.id}">Редагувати</button></td>
      </tr>
    `);
  });
}

renderTable(farms);

// --------------------------------------------------------------------
// ФУНКЦІОНАЛ CRUD (СТВОРЕННЯ/РЕДАГУВАННЯ)
// --------------------------------------------------------------------

// Відкриття модального вікна в режимі СТВОРЕННЯ
showCreateBtn.addEventListener("click", () => {
  modalTitle.textContent = "Додати нову ферму";
  farmIdInput.value = ""; // Очищаємо ID для створення
  farmForm.reset();
  farmModal.style.display = "block";
});

// Відкриття модального вікна в режимі РЕДАГУВАННЯ
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = Number(e.target.dataset.id);
        const farmToEdit = farms.find(f => f.id === id);
        
        if (farmToEdit) {
            modalTitle.textContent = `Редагувати ферму: ${farmToEdit.location}`;
            farmIdInput.value = farmToEdit.id;
            locationInput.value = farmToEdit.location;
            animalsInput.value = farmToEdit.animals;
            powerInput.value = farmToEdit.power;
            farmModal.style.display = "block";
        }
    }
});

// Закриття модального вікна
closeBtn.onclick = function() {
  farmModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == farmModal) {
    farmModal.style.display = "none";
  }
}

// --------------------------------------------------------------------
// ВАЛІДАЦІЯ ТА ЗБЕРЕЖЕННЯ
// --------------------------------------------------------------------

farmForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // 1. Перевірка HTML-валідації (наприклад, required, pattern, min/max)
  if (!farmForm.checkValidity()) {
     // Цей блок спрацює, якщо браузерна валідація не пройде.
     // Тут можна додати custom повідомлення, але браузер покаже його сам.
     // Ми використовуємо alert() як додатковий спосіб (згідно з вимогою)
     
     // Оскільки форма невалідна, просто викликаємо alert і виходимо
     alert("Помилка вводу: Будь ласка, перевірте правильність заповнення всіх полів (використовуйте кирилицю, введіть числові значення в межах).");
     return;
  }
  
  // 2. Збір даних
  const id = farmIdInput.value ? Number(farmIdInput.value) : null;
  const newLocation = locationInput.value.trim();
  const newAnimals = Number(animalsInput.value);
  const newPower = Number(powerInput.value);
  
  // 3. Додаткова JavaScript-валідація (за бажанням, тут - перевірка на кратність 10)
  if (newPower % 10 !== 0) {
      alert("Помилка: Потужність вентиляторів має бути кратною 10.");
      return;
  }

  // 4. Логіка СТВОРЕННЯ або РЕДАГУВАННЯ
  if (id) {
    // РЕЖИМ РЕДАГУВАННЯ
    const index = farms.findIndex(f => f.id === id);
    if (index !== -1) {
      farms[index].location = newLocation;
      farms[index].animals = newAnimals;
      farms[index].power = newPower;
      alert(`Ферму "${newLocation}" успішно оновлено!`);
    }
  } else {
    // РЕЖИМ СТВОРЕННЯ
    const newFarm = new Farm(newLocation, newAnimals, newPower);
    farms.push(newFarm);
    alert(`Ферму "${newLocation}" успішно додано!`);
  }

  // 5. Оновлення інтерфейсу та закриття модального вікна
  renderTable(farms);
  farmModal.style.display = "none";
});

// --------------------------------------------------------------------
// ІСНУЮЧИЙ ФУНКЦІОНАЛ (ПОШУК, СОРТУВАННЯ, РАХУНОК)
// --------------------------------------------------------------------

// Пошук
document.querySelector("#searchBtn").addEventListener("click", () => {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = farms.filter(f => f.location.toLowerCase().includes(term));
  renderTable(filtered);
});

// Сортування
document.querySelector("#sortBtn").addEventListener("click", () => {
  const sortBy = document.querySelector("#sortSelect").value;
  // Копіюємо масив для сортування, щоб не змінити вихідний порядок, якщо він потрібен
  const sortedFarms = [...farms]; 
  sortedFarms.sort((a, b) => {
    if (typeof a[sortBy] === "string") {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return a[sortBy] - b[sortBy];
  });
  renderTable(sortedFarms); // Відображаємо відсортований список
});

// Рахуємо загальну потужність
document.querySelector("#countBtn").addEventListener("click", () => {
  const total = farms.reduce((sum, f) => sum + f.power, 0);
  totalPower.textContent = `Загальна потужність вентиляторів: ${total} Вт`;
});