

package frontend.services;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://example.com/api',
});

const get = async (endpoint, data) => {
  if (!endpoint) {
    throw new Error('Endpoint is required');
  }
  try {
    const response = await api.get(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching data from ${endpoint}: ${error.message}`);
  }
};

const post = async (endpoint, data) => {
  if (!endpoint || !data) {
    throw new Error('Endpoint and data are required');
  }
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error posting data to ${endpoint}: ${error.message}`);
  }
};

const put = async (endpoint, data) => {
  if (!endpoint || !data) {
    throw new Error('Endpoint and data are required');
  }
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error putting data to ${endpoint}: ${error.message}`);
  }
};

const deleteData = async (endpoint, data) => {
  if (!endpoint) {
    throw new Error('Endpoint is required');
  }
  try {
    const response = await api.delete(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting data from ${endpoint}: ${error.message}`);
  }
};

export { get, post, put, deleteData };