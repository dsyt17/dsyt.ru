import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { getUserReducer } from './slices/user';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        user: getUserReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
