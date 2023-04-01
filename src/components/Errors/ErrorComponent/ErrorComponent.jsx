import React from 'react';
import styles from './ErrorComponent.module.scss';

const ErrorComponent = () => {
    const params = window.location.pathname;
    return (
        <div className={styles.root}>
            <h1>404</h1>
            <p>
                Nothing to find on <i>{params}</i>
            </p>
        </div>
    );
};

export default ErrorComponent;
