import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <h1>🏡 Каталог Ферм на Продаж</h1>
            <nav className="navigation">
                <Link to="/">Головна</Link> {}
                <Link to="/catalog">Каталог</Link> {}
                <Link to="/about">Про нас</Link>
                <Link to="/cart">Обране</Link>
            </nav>
        </header>
    );
};

export default Header;