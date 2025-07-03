package frontend.components;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CalculatorHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('/api/calculator/history');
                setHistory(response.data);
            } catch (err) {
                setError('Failed to fetch history');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) {
        return <div role="alert">Loading...</div>;
    }

    if (error) {
        return <div role="alert">{error}</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Number 1</th>
                    <th>Number 2</th>
                    <th>Operator</th>
                    <th>Result</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {history.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.number1}</td>
                        <td>{entry.number2}</td>
                        <td>{entry.operator}</td>
                        <td>{entry.result}</td>
                        <td>{entry.timestamp}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

CalculatorHistory.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            number1: PropTypes.number.isRequired,
            number2: PropTypes.number.isRequired,
            operator: PropTypes.string.isRequired,
            result: PropTypes.number.isRequired,
            timestamp: PropTypes.string.isRequired,
        })
    ),
};

export default CalculatorHistory;