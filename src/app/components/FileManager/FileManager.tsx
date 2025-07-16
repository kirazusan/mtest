import React, { useEffect, useState } from 'react';
import { FileManagementService } from './FileManagementService';

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null);
  const [sourceFilePath, setSourceFilePath] = useState('');
  const [destinationFilePath, setDestinationFilePath] = useState('');
  const [copyErrorMessage, setCopyErrorMessage] = useState(null);
  const [moveErrorMessage, setMoveErrorMessage] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [writeErrorMessage, setWriteErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [directoryPath, setDirectoryPath] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileAttributes, setFileAttributes] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [paths, setPaths] = useState([]);
  const [combinedPath, setCombinedPath] = useState(null);
  const [fileExists, setFileExists] = useState(null);
  const [directoryContents, setDirectoryContents] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await FileManagementService.listFiles();
      setFiles(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createFile = async (fileName) => {
    setLoading(true);
    try {
      await FileManagementService.createFile(fileName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (fileId) => {
    setLoading(true);
    try {
      await FileManagementService.deleteFile(fileId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectFile = (file) => {
    setSelectedFile(file);
  };

  const handleCreateFile = async () => {
    try {
      await createFile(fileName);
      setFileName('');
      setContent('');
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDeleteFile = async () => {
    try {
      await deleteFile(filePath);
      setFilePath('');
      setDeleteErrorMessage(null);
    } catch (err) {
      setDeleteErrorMessage(err.message);
    }
  };

  const handleCopyFile = async () => {
    try {
      await FileManagementService.copyFile(sourceFilePath, destinationFilePath);
      setSourceFilePath('');
      setDestinationFilePath('');
      setCopyErrorMessage(null);
    } catch (err) {
      setCopyErrorMessage(err.message);
    }
  };

  const handleMoveFile = async () => {
    try {
      await FileManagementService.moveFile(sourceFilePath, destinationFilePath);
      setSourceFilePath('');
      setDestinationFilePath('');
      setMoveErrorMessage(null);
    } catch (err) {
      setMoveErrorMessage(err.message);
    }
  };

  const handleReadFile = async () => {
    try {
      const content = await FileManagementService.readFile(filePath);
      setFileContent(content);
      setWriteErrorMessage(null);
    } catch (err) {
      setWriteErrorMessage(err.message);
    }
  };

  const handleWriteFile = async () => {
    try {
      const message = await FileManagementService.writeFile(filePath, content);
      setSuccessMessage(message);
      setWriteErrorMessage(null);
    } catch (err) {
      setWriteErrorMessage(err.message);
    }
  };

  const handleCreateDirectory = async () => {
    try {
      const message = await FileManagementService.createDirectory(directoryPath);
      setSuccessMessage(message);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDeleteDirectory = async () => {
    try {
      const message = await FileManagementService.deleteDirectory(directoryPath);
      setSuccessMessage(message);
    } catch (err) {
      setDeleteErrorMessage(err.message);
    }
  };

  const handleListFiles = async () => {
    try {
      const files = await FileManagementService.listFilesInDirectory(directoryPath);
      setFileList(files);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleGetFileAttributes = async () => {
    try {
      const attributes = await FileManagementService.getFileAttributes(filePath);
      setFileAttributes(attributes);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleGetFileMetadata = async () => {
    try {
      const metadata = await FileManagementService.getFileMetadata(filePath);
      setFileMetadata(metadata);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleCombinePaths = async () => {
    try {
      const combined = await FileManagementService.combinePaths(paths);
      setCombinedPath(combined);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleCheckFileExists = async () => {
    try {
      const exists = await FileManagementService.checkFileExists(filePath);
      setFileExists(exists);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleGetDirectoryContents = async () => {
    try {
      const contents = await FileManagementService.getDirectoryContents(directoryPath);
      setDirectoryContents(contents);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <h1>File Manager</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="File Name" />
      <button onClick={handleCreateFile}>Create File</button>
      <input value={filePath} onChange={(e) => setFilePath(e.target.value)} placeholder="File Path" />
      <button onClick={handleDeleteFile}>Delete File</button>
      <input value={sourceFilePath} onChange={(e) => setSourceFilePath(e.target.value)} placeholder="Source File Path" />
      <input value={destinationFilePath} onChange={(e) => setDestinationFilePath(e.target.value)} placeholder="Destination File Path" />
      <button onClick={handleCopyFile}>Copy File</button>
      <button onClick={handleMoveFile}>Move File</button>
      <button onClick={handleReadFile}>Read File</button>
      <button onClick={handleWriteFile}>Write File</button>
      <input value={directoryPath} onChange={(e) => setDirectoryPath(e.target.value)} placeholder="Directory Path" />
      <button onClick={handleCreateDirectory}>Create Directory</button>
      <button onClick={handleDeleteDirectory}>Delete Directory</button>
      <button onClick={handleListFiles}>List Files</button>
      <button onClick={handleGetFileAttributes}>Get File Attributes</button>
      <button onClick={handleGetFileMetadata}>Get File Metadata</button>
      <button onClick={handleCombinePaths}>Combine Paths</button>
      <button onClick={handleCheckFileExists}>Check File Exists</button>
      <button onClick={handleGetDirectoryContents}>Get Directory Contents</button>
      {errorMessage && <p>{errorMessage}</p>}
      {deleteErrorMessage && <p>{deleteErrorMessage}</p>}
      {copyErrorMessage && <p>{copyErrorMessage}</p>}
      {moveErrorMessage && <p>{moveErrorMessage}</p>}
      {writeErrorMessage && <p>{writeErrorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <ul>
        {files.map((file) => (
          <li key={file.id} onClick={() => selectFile(file)} className={selectedFile === file ? 'selected' : ''}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileManager;