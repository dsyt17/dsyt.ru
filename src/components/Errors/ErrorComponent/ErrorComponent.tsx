import React from 'react';

import { useTranslation } from 'react-i18next';

import styles from './ErrorComponent.module.scss';

const ErrorComponent = () => {
    const params = window.location.pathname;
    const { t } = useTranslation();

    return (
        <div className={styles.root}>
            <h1>404</h1>
            <p>
                {t('errors.404.nothingToFind')} <i>{params}</i>
            </p>
        </div>
    );
};

export default ErrorComponent;
