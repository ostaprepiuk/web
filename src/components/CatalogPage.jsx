import React, { useState, useMemo } from 'react';
import FarmList from './FarmList.js';
import FARMS from '../data/FarmData.js';

const CatalogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [filterLocation, setFilterLocation] = useState('');

    const uniqueLocations = useMemo(() => {
        const locations = FARMS.map(farm => farm.location.split(',')[0].trim());
        return ['Всі регіони', ...new Set(locations)];
    }, []);

    const filteredAndSortedFarms = useMemo(() => {
        let filtered = FARMS;

        if (searchTerm) {
            filtered = filtered.filter(farm =>
                farm.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterLocation && filterLocation !== 'Всі регіони') {
            filtered = filtered.filter(farm =>
                farm.location.includes(filterLocation)
            );
        }

        return filtered.sort((a, b) => {
            const priceA = (a.animalCount * 100 + a.fanPowerWatts * 0.5);
            const priceB = (b.animalCount * 100 + b.fanPowerWatts * 0.5);

            switch (sortBy) {
                case 'price':
                    return priceA - priceB;
                case 'animals':
                    return a.animalCount - b.animalCount;
                case 'power':
                    return a.fanPowerWatts - b.fanPowerWatts;
                case 'id':
                default:
                    return a.id - b.id;
            }
        });
    }, [searchTerm, sortBy, filterLocation]);

    return (
        <>
            <h2 style={{ padding: '20px', color: '#007bff' }}>Каталог: Перелік усіх доступних ферм на продаж</h2>
            
            <div className="filter-panel">
                <input
                    type="text"
                    placeholder="Пошук за регіоном..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <select 
                    value={filterLocation} 
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="filter-select"
                >
                    {uniqueLocations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>

                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="id">Сортувати за: За замовчуванням</option>
                    <option value="price">Сортувати за: Ціною (зростання)</option>
                    <option value="animals">Сортувати за: Тваринами</option>
                    <option value="power">Сортувати за: Потужністю</option>
                </select>
            </div>

            <FarmList farms={filteredAndSortedFarms} />
        </>
    );
};

export default CatalogPage;