import React from 'react';

import { useTranslation } from 'react-i18next';

import styles from './LoadingPostError.module.scss';

const LoadingPostError = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.root}>
            <img className={styles.dino} src="/users_assets/loadError.png" alt="dino" />
            <h1>{t('errors.posts.loadError')}</h1>
            <p>{t('errors.posts.workLater')}</p>
        </div>
    );
};

export default LoadingPostError;
