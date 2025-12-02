import React from 'react';
import FarmCard from './FarmCard.js';

const FarmList = ({ farms }) => {
    return (
        <main className="farm-grid">
            {farms.map(farm => (
                <FarmCard key={farm.id} farm={farm} />
            ))}
        </main>
    );
};

export default FarmList;