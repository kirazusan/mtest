import React, { useState } from 'react';
import './MainPage.css';
import { deleteFile, createDirectory, deleteDirectory, listFilesInDirectory, manipulatePath, getFileInfo, logDebugMessage } from './Calculator';

const MainPage = () => {
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [createMessage, setCreateMessage] = useState(null);
  const [createError, setCreateError] = useState(null);
  const [directoryDeleteMessage, setDirectoryDeleteMessage] = useState(null);
  const [directoryDeleteError, setDirectoryDeleteError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [manipulatedPath, setManipulatedPath] = useState('');
  const [fileInfo, setFileInfo] = useState(null);
  const [logMessage, setLogMessage] = useState('');

  const handleDeleteFile = (filePath) => {
    deleteFile(filePath)
      .then(response => {
        setDeleteMessage(response.message);
        setDeleteError(null);
      })
      .catch(error => {
        setDeleteError(error.message);
        setDeleteMessage(null);
      });
  };

  const handleCreateDirectory = (directoryPath) => {
    createDirectory(directoryPath)
      .then(response => {
        setCreateMessage(response.message);
        setCreateError(null);
      })
      .catch(error => {
        setCreateError(error.message);
        setCreateMessage(null);
      });
  };

  const handleDeleteDirectory = (directoryPath) => {
    deleteDirectory(directoryPath)
      .then(response => {
        setDirectoryDeleteMessage(response.message);
        setDirectoryDeleteError(null);
      })
      .catch(error => {
        setDirectoryDeleteError(error.message);
        setDirectoryDeleteMessage(null);
      });
  };

  const handleListFiles = (directoryPath) => {
    listFilesInDirectory(directoryPath)
      .then(response => {
        setFileList(response.files);
        setErrorMessage(null);
      })
      .catch(error => {
        setErrorMessage(error.message);
        setFileList([]);
      });
  };

  const handleManipulatePath = (path, operation) => {
    manipulatePath({ path, operation })
      .then(response => {
        setManipulatedPath(response.newPath);
        setErrorMessage(null);
      })
      .catch(error => {
        setErrorMessage(error.message);
        setManipulatedPath('');
      });
  };

  const getFileInfo = async (filePath) => {
    try {
      const response = await getFileInfo(filePath);
      setFileInfo(response.info);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
      setFileInfo(null);
    }
  };

  const logDebugMessage = async (message, level) => {
    try {
      const response = await logDebugMessage({ message, level });
      setLogMessage(response.log);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
      setLogMessage('');
    }
  };

  return (
    <div>
      {deleteMessage && <div>{deleteMessage}</div>}
      {deleteError && <div>{deleteError}</div>}
      {createMessage && <div>{createMessage}</div>}
      {createError && <div>{createError}</div>}
      {directoryDeleteMessage && <div>{directoryDeleteMessage}</div>}
      {directoryDeleteError && <div>{directoryDeleteError}</div>}
      {fileList.length > 0 ? (
        <ul>
          {fileList.map(file => (
            <li key={file}>{file}</li>
          ))}
        </ul>
      ) : (
        errorMessage && <div>{errorMessage}</div>
      )}
      {manipulatedPath && <div>{manipulatedPath}</div>}
      {fileInfo && <div>{JSON.stringify(fileInfo)}</div>}
      {logMessage && <div>{logMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default MainPage;