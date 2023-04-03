import React from 'react';

import styles from './About.module.scss';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const About = () => {
    useDocumentTitle('About');
    return <h1 className={styles.root}>Пока тут пусто...</h1>;
};

export default About;
