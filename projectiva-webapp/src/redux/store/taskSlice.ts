import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Task {
  id: number;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    { id: 1, description: 'Tarefa 1', status: 'PENDING' },
    { id: 2, description: 'Tarefa 2', status: 'IN_PROGRESS' },
    { id: 3, description: 'Tarefa 3', status: 'COMPLETED' },
  ],
};


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
   
    addTask: (state, action: PayloadAction<{ description: string; status: Task['status'] }>) => {
      const newTask: Task = {
        id: state.tasks.length + 1,
        description: action.payload.description,
        status: action.payload.status,
      };
      state.tasks.push(newTask);
    },
   
    updateTask: (state, action: PayloadAction<{ id: number; description: string; status: Task['status'] }>) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (taskIndex >= 0) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          description: action.payload.description,
          status: action.payload.status,
        };
      }
    },
   
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});


export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
