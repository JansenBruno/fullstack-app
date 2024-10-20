import { configureStore } from '@reduxjs/toolkit';
import squadReducer from './store/squadSlice';
import authReducer from './store/authSlice';
import userReducer from './store/userSlice';
import taskReducer from './store/taskSlice';

const store = configureStore({
  reducer: {
    squads: squadReducer,
    auth: authReducer,
    users: userReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
