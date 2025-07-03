package frontend.components;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalculationHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const getHistory = async () => {
        try {
            const response = await axios.get('/api/history');
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getHistory();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Operand 1</th>
                    <th>Operator</th>
                    <th>Operand 2</th>
                    <th>Result</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {history.map((entry) => (
                    <tr key={entry.id}>
                        <td>{entry.operand1}</td>
                        <td>{entry.operator}</td>
                        <td>{entry.operand2}</td>
                        <td>{entry.result}</td>
                        <td>{new Date(entry.timestamp).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CalculationHistory;