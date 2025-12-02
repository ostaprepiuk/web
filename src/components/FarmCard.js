// src/components/FarmCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const FarmCard = ({ farm }) => {
    const imageUrl = farm.imageUrl || 'images/default.jpg';
    const sellingPrice = (farm.animalCount * 100 + farm.fanPowerWatts * 0.5).toFixed(0); 

    return (
        <div className="farm-card">
            <img 
                src={imageUrl} 
                alt={`Ферма на продаж: ${farm.location}`} 
                className="farm-image" 
            />
            <div className="card-content">
                <h3>Актив: Ферма в {farm.location.split(',')[0]}</h3>
                <p><strong>Кількість тварин:</strong> {farm.animalCount} од.</p>
                <p><strong>Потужність обладнання:</strong> {farm.fanPowerWatts} Вт</p>
                <div className="price-tag">
                    Загальна Ціна: <span>{sellingPrice} $</span>
                </div>
            </div>
            
            <div className="card-actions">
                <Link to={`/farm/${farm.id}`} className="details-btn">
                    Деталі / Зв'язатися
                </Link>
            </div>
        </div>
    );
};

export default FarmCard;