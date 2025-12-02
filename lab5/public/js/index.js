const API_URL = 'http://localhost:3000/farms';

const farmContainer = document.getElementById('farm-container');
const sortSelect = document.getElementById('sort-select');
const sortButton = document.getElementById('sort-button');
const searchInput = document.getElementById('search-input');
const countBtn = document.getElementById('count-total-fans-btn');
const totalFanPowerSpan = document.getElementById('total-fan-power');

let allFarms = [];
let filteredFarms = [];


const fetchFarms = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Не вдалося завантажити дані ферм.');
        allFarms = await response.json();
        return allFarms;
    } catch (error) {
        console.error("Помилка при отриманні даних:", error);
        farmContainer.innerHTML = '<p>Помилка: Не вдалося підключитися до сервера API.</p>';
        return [];
    }
};

const createFarmCard = (farm) => {
    const editLink = `edit.html?id=${farm.id}`; 
    const imageUrl = farm.imageUrl || 'images/default.jpg';
    
    return `
        <div class="farm-card">
            <img src="${imageUrl}" alt="Зображення ферми ${farm.location}" class="farm-image">
            <h3>${farm.location}</h3>
            <div class="card-details">
                <p><strong>Тварини:</strong> ${farm.animalCount} гол.</p>
                <p><strong>Вентилятори:</strong> ${farm.fanPowerWatts} Вт</p>
            </div>
            <div style="margin-top: 10px;">
                <a href="${editLink}" style="background-color: #ffc107; color: #333; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; text-decoration: none;">Edit</a>
                <button class="delete-btn" data-id="${farm.id}" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Remove</button>
            </div>
        </div>
    `;
};


const renderFarms = (farmList) => {
    const farmHtml = farmList.map(createFarmCard).join('');
    farmContainer.innerHTML = farmHtml;
};


const sortFarms = (farmList, criteria) => {
    const sortedList = [...farmList];
    sortedList.sort((a, b) => {
        const [field, direction] = criteria.split('_');
        if (field === 'location') {
            const result = a.location.localeCompare(b.location, 'uk');
            return direction === 'asc' ? result : -result;
        } else {
            const valA = a[field];
            const valB = b[field];
            return direction === 'desc' ? valB - valA : valA - valB;
        }
    });
    return sortedList;
};

const applyFiltersAndSort = (farmsToProcess) => {
    const searchTerm = searchInput.value;
    const criteria = sortSelect.value;
    
    let currentFarms = searchTerm.trim() 
        ? farmsToProcess.filter(farm => 
            farm.location.toLowerCase().includes(searchTerm.toLowerCase().trim())
          )
        : farmsToProcess;

    filteredFarms = sortFarms(currentFarms, criteria);
    renderFarms(filteredFarms);
};

sortButton.addEventListener('click', () => {
    applyFiltersAndSort(allFarms);
});

searchInput.addEventListener('input', () => {
    applyFiltersAndSort(allFarms);
});


const countTotalFanPower = (farmList) => {
    const totalPower = farmList.reduce((accumulator, farm) => {
        return accumulator + farm.fanPowerWatts;
    }, 0); 
    totalFanPowerSpan.textContent = `${totalPower.toFixed(0)} Вт`;
};

// Тільки тут відбувається підрахунок при натисканні кнопки
countBtn.addEventListener('click', () => {
    countTotalFanPower(allFarms);
});


const handleDelete = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            allFarms = allFarms.filter(f => f.id !== id);
            applyFiltersAndSort(allFarms); 
            // Видалено автоматичний підрахунок після видалення:
            // countTotalFanPower(allFarms); 
            alert("Ферму успішно видалено!");
        } else {
            throw new Error('Помилка видалення на сервері.');
        }
    } catch (error) {
        console.error("Помилка видалення:", error);
        alert("Не вдалося видалити ферму.");
    }
};


document.addEventListener('DOMContentLoaded', async () => {
    const initialFarms = await fetchFarms();
    applyFiltersAndSort(initialFarms); 
    
    // Видалено автоматичний підрахунок при завантаженні:
    // countTotalFanPower(initialFarms); 
    
    farmContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const farmIdToDelete = parseInt(e.target.dataset.id);
            if (confirm('Ви впевнені, що хочете видалити цю ферму?')) {
                handleDelete(farmIdToDelete);
            }
        }
    });
});