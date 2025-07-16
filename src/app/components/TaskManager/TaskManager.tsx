import React, { Component } from 'react';
import TaskManagementService from './TaskManagementService';

type TaskType = {
  id: number;
  name: string;
  completed: boolean;
};

type State = {
  tasks: TaskType[];
  filteredTasks: TaskType[];
  selectedTask: TaskType | null;
  loading: boolean;
  error: string | null;
};

class TaskManager extends Component<{}, State> {
  taskManagementService: TaskManagementService;

  constructor(props: {}) {
    super(props);
    this.state = {
      tasks: [],
      filteredTasks: [],
      selectedTask: null,
      loading: false,
      error: null,
    };
    this.taskManagementService = new TaskManagementService();
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = (): void => {
    this.setState({ loading: true });
    this.taskManagementService.getTasks()
      .then(tasks => {
        this.setState({ tasks, filteredTasks: tasks, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  };

  refreshTasks = (): void => {
    this.fetchTasks();
  };

  filterTasks = (criteria: string): void => {
    const filteredTasks = this.state.tasks.filter(task => task.name.toLowerCase().includes(criteria.toLowerCase()));
    this.setState({ filteredTasks });
  };

  selectTask = (task: TaskType): void => {
    this.setState({ selectedTask: task });
  };

  completeSelectedTask = (): void => {
    const { selectedTask } = this.state;
    if (selectedTask) {
      this.taskManagementService.completeTask(selectedTask)
        .then(() => {
          this.refreshTasks();
        })
        .catch(error => {
          this.setState({ error: error.message });
        });
    }
  };

  render() {
    const { filteredTasks, selectedTask, loading, error } = this.state;

    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {filteredTasks.length === 0 && !loading && <p>No tasks available.</p>}
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id} onClick={() => this.selectTask(task)} className={selectedTask?.id === task.id ? 'selected' : ''}>
              {task.name} {task.completed ? '(Completed)' : ''}
            </li>
          ))}
        </ul>
        <button onClick={this.completeSelectedTask} disabled={!selectedTask}>Complete Task</button>
      </div>
    );
  }
}

export default TaskManager;