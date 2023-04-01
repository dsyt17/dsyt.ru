import './App.scss';
import React from 'react';

import AppLoader from './components/AppLoader/AppLoader.component';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar/Navbar';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { initializeApp } from './redux/slices/appSlice';
import { fetchAuthMe } from './redux/slices/auth';

function App() {
    const dispatch = useAppDispatch();

    const initialized = useAppSelector(state => state.app.initialized);

    const initialApp = () => {
        const authPromise = dispatch(fetchAuthMe());
        Promise.all([authPromise]).then(() => {
            dispatch(initializeApp());
        });
    };

    React.useEffect(() => {
        initialApp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!initialized) {
        return <AppLoader />;
    }

    return (
        <div className="App">
            <Navbar />
            <AppRouter />
        </div>
    );
}

export default App;
