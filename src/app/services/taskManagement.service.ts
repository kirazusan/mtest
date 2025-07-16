import { Injectable } from '@angular/core';

export interface TaskType {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskData {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  tasks: TaskType[] = [];
  currentTask: TaskType | null = null;

  createTask(taskData: TaskData): void {
    const newTask: TaskType = {
      id: this.generateId(),
      title: taskData.title,
      completed: false
    };
    this.tasks.push(newTask);
  }

  completeTask(taskId: string): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
    }
  }

  getTasks(): Promise<TaskType[]> {
    return Promise.resolve(this.tasks);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}