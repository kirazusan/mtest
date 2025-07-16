import { Injectable } from '@angular/core';
import { promises as fs } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {
  async createFile(fileName: string, content: string): Promise<string> {
    if (!fileName || /[<>:"/\\|?*]/.test(fileName)) {
      throw new Error('Invalid file name');
    }
    const directoryPath = fileName.substring(0, fileName.lastIndexOf('/'));
    if (!directoryPath || !(await this.checkFileExists(directoryPath))) {
      throw new Error('Directory does not exist');
    }
    try {
      await fs.writeFile(fileName, content);
      return 'File created successfully';
    } catch (error) {
      throw new Error('Error creating file: ' + error.message);
    }
  }

  async deleteFile(filePath: string): Promise<string> {
    if (!filePath) {
      throw new Error('File path cannot be empty');
    }
    try {
      await fs.unlink(filePath);
      return 'File deleted successfully';
    } catch (error) {
      throw new Error('Error deleting file: ' + error.message);
    }
  }

  async copyFile(sourcePath: string, destinationPath: string): Promise<string> {
    if (!sourcePath || !destinationPath) {
      throw new Error('Source and destination paths cannot be empty');
    }
    try {
      await fs.copyFile(sourcePath, destinationPath);
      return 'File copied successfully';
    } catch (error) {
      throw new Error('Error copying file: ' + error.message);
    }
  }

  async moveFile(sourcePath: string, destinationPath: string): Promise<string> {
    if (!sourcePath || !destinationPath) {
      throw new Error('Source and destination paths cannot be empty');
    }
    try {
      await fs.rename(sourcePath, destinationPath);
      return 'File moved successfully';
    } catch (error) {
      throw new Error('Error moving file: ' + error.message);
    }
  }

  async readFile(filePath: string): Promise<string> {
    if (!filePath) {
      throw new Error('File path cannot be empty');
    }
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      throw new Error('Error reading file: ' + error.message);
    }
  }

  async writeFile(filePath: string, content: string): Promise<string> {
    if (!filePath) {
      throw new Error('File path cannot be empty');
    }
    try {
      await fs.writeFile(filePath, content);
      return 'File written successfully';
    } catch (error) {
      throw new Error('Error writing file: ' + error.message);
    }
  }

  async createDirectory(directoryPath: string): Promise<string> {
    if (!directoryPath) {
      throw new Error('Directory path cannot be empty');
    }
    const parentDirectory = directoryPath.substring(0, directoryPath.lastIndexOf('/'));
    if (!parentDirectory || !(await this.checkFileExists(parentDirectory))) {
      throw new Error('Parent directory does not exist');
    }
    try {
      await fs.mkdir(directoryPath);
      return 'Directory created successfully';
    } catch (error) {
      throw new Error('Error creating directory: ' + error.message);
    }
  }

  async deleteDirectory(directoryPath: string): Promise<string> {
    if (!directoryPath) {
      throw new Error('Directory path cannot be empty');
    }
    const files = await this.getDirectoryContents(directoryPath);
    if (files.length > 0) {
      throw new Error('Directory is not empty');
    }
    try {
      await fs.rmdir(directoryPath);
      return 'Directory deleted successfully';
    } catch (error) {
      throw new Error('Error deleting directory: ' + error.message);
    }
  }

  async listFilesInDirectory(directoryPath: string): Promise<string[]> {
    if (!directoryPath) {
      throw new Error('Directory path cannot be empty');
    }
    if (!(await this.checkFileExists(directoryPath))) {
      throw new Error('Directory does not exist');
    }
    try {
      const files = await fs.readdir(directoryPath);
      return files;
    } catch (error) {
      throw new Error('Error listing files in directory: ' + error.message);
    }
  }

  async getFileAttributes(filePath: string): Promise<object> {
    if (!filePath) {
      throw new Error('File path cannot be empty');
    }
    try {
      const stats = await fs.stat(filePath);
      return {
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        size: stats.size,
        birthtime: stats.birthtime,
        mtime: stats.mtime,
        atime: stats.atime
      };
    } catch (error) {
      throw new Error('Error getting file attributes: ' + error.message);
    }
  }

  async getFileMetadata(filePath: string): Promise<object> {
    if (!filePath) {
      throw new Error('File path cannot be empty');
    }
    try {
      const stats = await fs.stat(filePath);
      return {
        creationTime: stats.birthtime,
        lastAccessTime: stats.atime,
        lastWriteTime: stats.mtime
      };
    } catch (error) {
      throw new Error('Error getting file metadata: ' + error.message);
    }
  }

  combinePaths(paths: string[]): string {
    if (!Array.isArray(paths) || paths.length === 0) {
      throw new Error('Invalid paths array');
    }
    return paths.join('/');
  }

  async checkFileExists(filePath: string): Promise<boolean> {
    if (!filePath) {
      throw new Error('File path cannot be empty');
    }
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async getDirectoryContents(directoryPath: string): Promise<string[]> {
    if (!directoryPath) {
      throw new Error('Directory path cannot be empty');
    }
    if (!(await this.checkFileExists(directoryPath))) {
      throw new Error('Directory does not exist');
    }
    try {
      const files = await fs.readdir(directoryPath);
      return files;
    } catch (error) {
      throw new Error('Error getting directory contents: ' + error.message);
    }
  }
}