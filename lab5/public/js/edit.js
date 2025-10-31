const API_URL = 'http://localhost:3000/farms';

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('farm-form');
    const farmIdInput = document.getElementById('farm-id');
    
    const showCustomAlert = (message) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%);
            padding: 20px; background-color: #dc3545; color: white; border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); z-index: 1000; font-weight: bold;
            text-align: center;
        `;
        modal.textContent = message;
        document.body.appendChild(modal);

        setTimeout(() => {
            document.body.removeChild(modal);
        }, 3000);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const farmId = parseInt(urlParams.get('id'));

    // --- Логіка Завантаження Даних для Редагування ---
    if (farmId) {
        try {
            const response = await fetch(`${API_URL}/${farmId}`);
            if (response.status === 404) {
                alert('Помилка: Ферму з таким ID не знайдено!');
                window.location.href = 'index.html';
                return;
            }
            if (!response.ok) throw new Error('Помилка завантаження даних для редагування.');

            const farmToEdit = await response.json();

            farmIdInput.value = farmToEdit.id;
            document.getElementById('location').value = farmToEdit.location;
            document.getElementById('animalCount').value = farmToEdit.animalCount;
            document.getElementById('fanPowerWatts').value = farmToEdit.fanPowerWatts;
            document.getElementById('imageUrl').value = farmToEdit.imageUrl || ''; 

        } catch (error) {
            console.error("Помилка завантаження даних:", error);
            alert('Помилка: Не вдалося завантажити дані для редагування.');
            window.location.href = 'index.html';
        }
    } else {
        alert('Помилка: ID ферми не вказано для редагування.');
        window.location.href = 'index.html';
    }


    // --- Обробка Відправки Форми Редагування ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            showCustomAlert('Увага! Введені дані некоректні. Будь ласка, перевірте поля.');
            return;
        }

        const idToUpdate = parseInt(farmIdInput.value);

        const data = {
            location: document.getElementById('location').value,
            animalCount: parseInt(document.getElementById('animalCount').value),
            fanPowerWatts: parseInt(document.getElementById('fanPowerWatts').value),
            imageUrl: document.getElementById('imageUrl').value.trim() || 'images/default.jpg',
        };
        
        try {
            const response = await fetch(`${API_URL}/${idToUpdate}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Помилка оновлення на сервері.');

            // const updatedFarm = await response.json();

            alert(`Ферму "${data.location}" успішно оновлено!`);
            window.location.href = 'index.html';

        } catch (error) {
            console.error("Помилка оновлення:", error);
            showCustomAlert('Помилка: Не вдалося оновити ферму. Перевірте консоль.');
        }
    });
});