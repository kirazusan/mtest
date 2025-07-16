import { Injectable } from '@angular/core';
import { MauiProgramService } from './mauiProgram.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigChangesService {
  constructor(private mauiProgramService: MauiProgramService) {}

  handleConfigChange(changeType: string): boolean {
    try {
      switch (changeType) {
        case 'screenSize':
          // Update relevant state or UI elements for screen size
          break;
        case 'orientation':
          // Adjust layout or components for orientation
          break;
        case 'uiMode':
          // Switch between day and night mode styles
          break;
        case 'screenLayout':
          // Manage layout adjustments
          break;
        case 'smallestScreenSize':
        case 'density':
          // Implement necessary adjustments to UI or components
          break;
        default:
          return false;
      }
      return true;
    } catch (error) {
      console.error('Error handling config change:', error);
      return false;
    }
  }

  updateProjectConfiguration(newConfig: { targetFramework?: string; packageReferences?: string[]; buildConfigurations?: string[]; }): void {
    try {
      this.mauiProgramService.updateConfiguration(newConfig);
    } catch (error) {
      console.error('Error updating project configuration:', error);
    }
  }
}