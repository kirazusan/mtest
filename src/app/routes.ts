import { Route } from 'react-router-dom'; 
import { TaskManager } from './components/TaskManager/TaskManager'; 
import { Calculator } from './components/Calculator/Calculator'; 
import { MainPage } from './components/MainPage/MainPage'; 
import { LogDebugMessage } from './components/LogDebugMessage/LogDebugMessage'; 
import { FileManager } from './components/FileManager/FileManager'; 

export const routes = [ 
  { path: '/task-manager', component: TaskManager }, 
  { path: '/calculator', component: Calculator }, 
  { path: '/main-page', component: MainPage }, 
  { path: '/log-debug-message', component: LogDebugMessage }, 
  { path: '/file-manager', component: FileManager } 
];