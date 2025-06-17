

import fetch from 'isomorphic-unfetch';

/**
 * HelloWorldService is a React service that makes an HTTP GET request to the backend API to fetch the 'Hello World!' message.
 */
class HelloWorldService {
  /**
   * Makes an HTTP GET request to the backend API to fetch the 'Hello World!' message.
   * @returns {Promise<string>} A promise that resolves with the 'Hello World!' message.
   */
  async getHelloWorldMessage() {
    try {
      const response = await fetch('/api/hello-world');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data || !data.message) {
        throw new Error('Invalid response data');
      }
      return data.message;
    } catch (error) {
      console.error('Error fetching hello world message:', error);
      throw error;
    }
  }
}

export default HelloWorldService;