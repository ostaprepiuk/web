// src/components/HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    // Стан для керування видимістю розширеного контенту
    const [isContentVisible, setIsContentVisible] = useState(false);

    // Функція-обробник, яка перемикає стан
    const handleToggleContent = () => {
        setIsContentVisible(prev => !prev);
    };
    
    // Стилі для центрованої області контенту
    const mainContentStyle = { padding: '40px', textAlign: 'center', maxWidth: '800px', margin: 'auto' };

    return (
        <div className="content-wrap">
            <div style={mainContentStyle}>
                <h2>Ласкаво просимо до Каталогу Ферм на Продаж!</h2>
                <p style={{ margin: '30px auto', fontSize: '1.2em' }}>
                    Ми пропонуємо вам унікальні пропозиції діючих фермерських активів 
                    та земельних ділянок в Україні. Кожна пропозиція містить детальні 
                    характеристики активу та його потенціал.
                </p>
                
                {/* Блок із зображенням */}
                <div style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <img 
                        src="/images/farm1.jpg" 
                        alt="Фермерський пейзаж" 
                        style={{ borderRadius: '8px', maxWidth: '100%', height: 'auto', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
                    />
                </div>
                
                {/* Кнопка-перемикач */}
                <button onClick={handleToggleContent} className="view-more-btn-toggle">
                    {/* Текст кнопки змінюється залежно від стану */}
                    {isContentVisible ? 'Згорнути інформацію' : 'Переглянути більше інформації'}
                </button>
            </div>

            {/* Динамічний блок "Продовження сторінки" */}
            <div 
                // Клас 'content-visible' додається при isContentVisible = true для розкриття
                className={`extended-content-section ${isContentVisible ? 'content-visible' : ''}`}
                style={{ padding: '40px 20px', backgroundColor: '#e9ecef', margin: '0 auto', width: '100%', borderRadius: '0' }}
            >
                
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    {/* Контент відображається лише тоді, коли блок розкритий */}
                    {isContentVisible && (
                        <>
                            <h3 style={{ color: '#007bff' }}>Наші переваги та особливості</h3>
                            <p style={{ fontSize: '1.1em', marginBottom: '30px' }}>
                                Дізнайтеся більше про те, як ми гарантуємо якість та прозорість угод. 
                                Ми забезпечуємо повну юридичну підтримку та оцінку активів.
                            </p>
                            
                            <Link to="/catalog" className="view-more-btn">
                                Перейти до повного Каталогу
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;