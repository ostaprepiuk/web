import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    return (
        <div className="content-wrap" style={{ padding: '40px', textAlign: 'center' }}>
            <h2>🛒 Ваш Кошик</h2>
            <div style={{ margin: '50px 0', padding: '30px', border: '1px solid #ffc107', borderRadius: '8px', backgroundColor: '#fff3cd', color: '#856404' }}>
                <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                    Кошик порожній
                </p>
                <p style={{ fontSize: '1.1em' }}>
                    Поверніться до <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>списку ферм</Link>, щоб додати товари.
                </p>
            </div>
        </div>
    );
};

export default Cart;