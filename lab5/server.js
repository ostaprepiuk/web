const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const API_PREFIX = '/farms';

// --- НАЛАШТУВАННЯ MIDDLEWARE ---

// Дозволяє запити від клієнтської частини (наприклад, з index.html)
app.use(cors()); 
// Дозволяє серверу читати JSON, надісланий у тілі PUT/POST запитів
app.use(bodyParser.json()); 
// Обслуговує статичні файли (index.html, index.js, CSS) з папки 'public'
// ВАЖЛИВО: Ваш клієнтський код повинен бути у папці 'public'
app.use(express.static('public')); 


// --- ІМІТАЦІЯ БАЗИ ДАНИХ (Дані в пам'яті) ---
// Структура відповідає вашому класу Farm + ID
let farms = [
    { id: 1, location: "Львівська обл., с. Велике", animalCount: 500, fanPowerWatts: 3500, imageUrl: "images/farm1.jpg" },
    { id: 2, location: "Київська обл., м. Бровари", animalCount: 1200, fanPowerWatts: 8000, imageUrl: "images/farm2.jpg" },
    { id: 3, location: "Одеська обл., м. Ізмаїл", animalCount: 300, fanPowerWatts: 2000, imageUrl: "images/farm3.jpg" },
    { id: 4, location: "Закарпатська обл., м. Ужгород", animalCount: 275, fanPowerWatts: 1765, imageUrl: "images/farm4.jpg" },
];
let nextId = farms.length > 0 ? Math.max(...farms.map(f => f.id)) + 1 : 1;


// --- CRUD ЕНДПОІНТИ ---

// 1. READ (GET /farms) - Отримати список усіх ферм
app.get(API_PREFIX, (req, res) => {
    // В ідеалі, тут би додавалася логіка сортування та фільтрації,
    // але для базового CRUD повертаємо весь список
    res.json(farms);
});

// 2. READ (GET /farms/:id) - Отримати одну ферму за ID
app.get(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const farm = farms.find(f => f.id === id);
    if (farm) {
        res.json(farm);
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});

// 3. CREATE (POST /farms) - Створити нову ферму
app.post(API_PREFIX, (req, res) => {
    const newFarmData = req.body;
    
    // Перевірка наявності необхідних полів
    if (!newFarmData.location || !newFarmData.animalCount || !newFarmData.fanPowerWatts) {
        return res.status(400).send({ message: "Необхідні поля відсутні." });
    }

    const newFarm = {
        id: nextId++,
        location: newFarmData.location,
        animalCount: parseInt(newFarmData.animalCount),
        fanPowerWatts: parseInt(newFarmData.fanPowerWatts),
        imageUrl: newFarmData.imageUrl || 'images/default.jpg'
    };

    farms.push(newFarm);
    // Відповідаємо статусом 201 (Created) та створеним об'єктом
    res.status(201).json(newFarm); 
});

// 4. UPDATE (PUT /farms/:id) - Оновити існуючу ферму
app.put(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const farmIndex = farms.findIndex(f => f.id === id);

    if (farmIndex !== -1) {
        // Оновлюємо об'єкт, зберігаючи старі значення, якщо нові не передані
        farms[farmIndex] = {
            ...farms[farmIndex], 
            ...updatedData,
            id: id, 
            animalCount: parseInt(updatedData.animalCount),
            fanPowerWatts: parseInt(updatedData.fanPowerWatts),
        };
        res.json(farms[farmIndex]); 
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});

// 5. DELETE (DELETE /farms/:id) - Видалити ферму
app.delete(`${API_PREFIX}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = farms.length;
    
    // Фільтруємо масив, залишаючи лише ті ферми, ID яких не збігається з потрібним
    farms = farms.filter(f => f.id !== id);

    if (farms.length < initialLength) {
        // Статус 204 (No Content) означає успішне видалення без тіла відповіді
        res.status(204).send(); 
    } else {
        res.status(404).send({ message: `Ферму з ID ${id} не знайдено.` });
    }
});


// --- ЗАПУСК СЕРВЕРА ---

app.listen(PORT, () => {
    console.log(`Сервер Node.js API запущено на порті ${PORT}.`);
    console.log(`Додаток доступний за адресою: http://localhost:${PORT}/index.html`);
});