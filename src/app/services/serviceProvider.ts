import { calculatorService, configChangesService, fileManagementService, loggingService, taskManagementService, httpClientService, mauiProgramService } from './index';

export const registerServices = () => {
  app.service('calculatorService', calculatorService);
  app.service('configChangesService', configChangesService);
  app.service('fileManagementService', fileManagementService);
  app.service('loggingService', loggingService);
  app.service('taskManagementService', taskManagementService);
  app.service('httpClientService', httpClientService);
  app.service('mauiProgramService', mauiProgramService);
};