

import axios from 'axios';
import HelloWorldComponent from '../components/HelloWorldComponent';
import logger from '../utils/logger';

class HelloWorldService {
  constructor() {
    this.helloWorldComponent = new HelloWorldComponent();
  }

  async handleRequest() {
    try {
      if (!this.helloWorldComponent) {
        throw new Error('HelloWorldComponent is not initialized');
      }

      const response = await axios.get('/GetHelloWorld');
      if (response.status !== 200) {
        throw new Error(`Invalid response status: ${response.status}`);
      }

      const message = response.data;
      if (!message || typeof message !== 'string') {
        throw new Error('Invalid response format');
      }

      const handledResponse = await this.helloWorldComponent.handleRequest(message);
      if (handledResponse instanceof Error) {
        throw handledResponse;
      }

      return handledResponse;
    } catch (error) {
      logger.error('Error handling request:', error);
      throw error;
    }
  }
}

export default HelloWorldService;