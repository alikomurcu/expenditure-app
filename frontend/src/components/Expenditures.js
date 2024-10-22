import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = 'https://expenditure-app-backend.onrender.com';
const Expenditures = () => {
    const [expenditures, setExpenditures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/api/expenditures`)
            .then((response) => {
                setExpenditures(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching expenditures:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Daily Expenditures</h1>
            <ul>
                {expenditures.map((exp) => (
                    <li key={exp._id}>
                        {exp.title} - ${exp.amount} on {new Date(exp.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenditures;
