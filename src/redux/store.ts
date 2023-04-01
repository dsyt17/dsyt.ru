import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './slices/appSlice';
import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';
import { getUserReducer } from './slices/user';

const store = configureStore({
    reducer: {
        app: appReducer,
        posts: postsReducer,
        auth: authReducer,
        user: getUserReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
