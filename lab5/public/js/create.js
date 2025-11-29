const API_URL = 'http://localhost:3000/farms';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('farm-form');
    
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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            showCustomAlert('Увага! Введені дані некоректні. Будь ласка, перевірте поля.');
            return;
        }

        const data = {
            location: document.getElementById('location').value,
            animalCount: parseInt(document.getElementById('animalCount').value),
            fanPowerWatts: parseInt(document.getElementById('fanPowerWatts').value),
            imageUrl: document.getElementById('imageUrl').value.trim(),
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Помилка створення на сервері.');

            // const newFarm = await response.json(); // Отримання створеного об'єкта не обов'язкове

            alert(`Нову ферму "${data.location}" успішно створено!`);
            window.location.href = 'index.html';

        } catch (error) {
            console.error("Помилка створення:", error);
            showCustomAlert('Помилка: Не вдалося створити ферму. Перевірте консоль.');
        }
    });
});