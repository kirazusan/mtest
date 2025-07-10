package main-page.component;

import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/apiService';

const MainPageComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchData('/api/data');
            setData(result);
        };
        loadData();
    }, []);

    return <div>{JSON.stringify(data)}</div>;
};

export default MainPageComponent;