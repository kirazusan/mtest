

export class WebHostEnvironment implements IWebHostEnvironment {
  private environmentName: string;
  private applicationName: string;
  private contentRootPath: string;
  private webRootPath: string;

  constructor(environmentName: string, applicationName: string, contentRootPath: string, webRootPath: string) {
    this.environmentName = environmentName;
    this.applicationName = applicationName;
    this.contentRootPath = contentRootPath;
    this.webRootPath = webRootPath;
  }

  getEnvironmentName(): string {
    return this.environmentName;
  }

  getApplicationName(): string {
    return this.applicationName;
  }

  getContentRootPath(): string {
    return this.contentRootPath;
  }

  getWebRootPath(): string {
    return this.webRootPath;
  }

  configureRequestPipeline(): void {
    // Configure the request pipeline based on the hosting environment
    if (this.environmentName === 'Development') {
      // Configure the pipeline for development environment
    } else if (this.environmentName === 'Production') {
      // Configure the pipeline for production environment
    } else {
      throw new Error(`Unsupported hosting environment: ${this.environmentName}`);
    }
  }
}

export interface IWebHostEnvironment {
  getEnvironmentName(): string;
  getApplicationName(): string;
  getContentRootPath(): string;
  getWebRootPath(): string;
}