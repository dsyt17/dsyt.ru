import './App.scss';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar/Navbar';
import React from 'react';
import { fetchAuthMe } from './redux/slices/auth';
import { useAppDispatch } from './hooks/useAppDispatch';
import { Dispatch } from 'redux';

function App() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

    return (
        <div className="App">
            <Navbar />
            <AppRouter />
        </div>
    );
}

export default App;
