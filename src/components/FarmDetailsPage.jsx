import React from 'react';
import { useParams, Link } from 'react-router-dom';
import FARMS from '../data/FarmData.js'; 

const handleBuyNow = (farmName) => {
    alert(`🎉 Вітаємо! Ви імітували покупку ферми "${farmName}"! Дякуємо!`);
};

const FarmDetailsPage = () => {
    const { id } = useParams();
    const farm = FARMS.find(f => f.id === parseInt(id));

    if (!farm) {
        return (
            <div className="content-wrap" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>404 - Ферму не знайдено</h2>
                <p>Поверніться до <Link to="/catalog">Каталогу</Link>.</p>
            </div>
        );
    }

    const sellingPrice = (farm.animalCount * 100 + farm.fanPowerWatts * 0.5).toFixed(0); 
    const imageUrl = farm.imageUrl || '/images/default.jpg'; 

    return (
        <div className="content-wrap" style={{ padding: '40px', maxWidth: '900px', margin: 'auto' }}>
            <h2 style={{ color: '#007bff' }}>Деталі активу: {farm.location}</h2>
            
            <div className="farm-details-container">
                <img 
                    src={imageUrl} 
                    alt={`Ферма ${farm.location}`} 
                    className="details-image"
                />
                
                <div className="details-content">
                    <p><strong>ID пропозиції:</strong> {farm.id}</p>
                    <p><strong>Місцезнаходження:</strong> {farm.location}</p>
                    <p><strong>Кількість тварин:</strong> {farm.animalCount} гол.</p>
                    <p><strong>Потужність обладнання:</strong> {farm.fanPowerWatts} Вт</p>
                    
                    <div className="details-description">
                        <h3>Міні-опис:</h3>
                        <p>{farm.description}</p>
                    </div>

                    <div className="details-price-tag">
                        Загальна Ціна: <span>{sellingPrice} $</span>
                    </div>

                    <button 
                        className="buy-now-btn"
                        onClick={() => handleBuyNow(farm.location)} 
                    >
                        КУПИТИ ЗАРАЗ
                    </button>

                    <Link to="/catalog" className="back-btn">← Повернутися до каталогу</Link>
                </div>
            </div>
        </div>
    );
};

export default FarmDetailsPage;