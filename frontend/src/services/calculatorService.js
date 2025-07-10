package services;

import { fetchData } from './apiService';

export const calculate = async (data) => {
    const result = await fetchData('/api/calculator', data);
    return result;
};