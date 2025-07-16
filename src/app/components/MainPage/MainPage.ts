import React, { Component } from 'react';
import Calculator from './Calculator';
import TaskManager from './TaskManager';
import FileManager from './FileManager';
import LogDebugMessage from './LogDebugMessage';
import MauiProgramService from '../services/mauiProgram.service';

class MainPage extends Component {
  constructor(handle, ownership) {
    super(handle, ownership);
    this.state = {
      isLoading: true,
      isInitialized: false,
      projectConfig: {
        targetFramework: '',
        packageReferences: [],
        buildConfigurations: []
      }
    };
    this.mauiProgramService = new MauiProgramService();
  }

  componentDidMount() {
    this.initializeApp();
    window.addEventListener('resize', this.handleConfigChanges);
    window.addEventListener('orientationchange', this.handleConfigChanges);
  }

  initializeApp = async () => {
    try {
      await this.mauiProgramService.MauiProgram();
      await this.mauiProgramService.MauiApp();
      this.fetchProjectConfig();
      this.setState({ isInitialized: true, isLoading: false });
    } catch (error) {
      console.error('Initialization error:', error);
      this.setState({ isLoading: false });
    }
  };

  fetchProjectConfig = async () => {
    try {
      const config = await this.mauiProgramService.getProjectConfig();
      this.setState({ projectConfig: config });
    } catch (error) {
      console.error('Error fetching project config:', error);
    }
  };

  handleConfigChanges = () => {
    this.fetchProjectConfig();
  };

  toTrimmedString(target, decimalFormat) {
    if (typeof target !== 'number' || typeof decimalFormat !== 'string') {
      throw new Error('Invalid input types');
    }
    const decimalParts = decimalFormat.split('.');
    if (decimalParts.length > 2 || (decimalParts.length === 2 && isNaN(decimalParts[1]))) {
      throw new Error('Invalid decimal format');
    }
    const formattedString = target.toFixed(decimalParts[1]?.length || 0);
    return formattedString.replace(/\.?0+$/, '');
  }

  render() {
    const { isLoading, projectConfig } = this.state;
    return (
      <div>
        {isLoading ? <p>Loading...</p> : (
          <>
            <Calculator />
            <TaskManager />
            <FileManager />
            <LogDebugMessage />
            <div>
              <h2>Project Configuration</h2>
              <p>Target Framework: {projectConfig.targetFramework}</p>
              <p>Package References: {projectConfig.packageReferences.join(', ')}</p>
              <p>Build Configurations: {projectConfig.buildConfigurations.join(', ')}</p>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default MainPage;