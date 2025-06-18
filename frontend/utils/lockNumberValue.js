

import { validateInputField, updateDatabase } from './utils';

export function lockNumberValue(currentNumberValue) {
    if (typeof currentNumberValue !== 'number' || isNaN(currentNumberValue)) {
        throw new Error('Invalid currentNumberValue');
    }

    const inputField = document.getElementById('number-input');
    if (!inputField) {
        throw new Error('Input field not found');
    }

    inputField.disabled = true;
    inputField.value = currentNumberValue;

    updateDatabase(currentNumberValue)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to update database: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
}

function updateDatabase(numberValue) {
    const url = '/api/lock-number-value';
    const data = { numberValue };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    return fetch(url, options);
}