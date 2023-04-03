import React from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './Project.module.scss';

type ProjectPropsType = {
    name: string;
    tech: string;
    description: string;
};

const Project: React.FC<ProjectPropsType> = ({ name, tech, description }) => {
    const router = useNavigate();

    return (
        <div className={styles.root} onClick={() => router(`/projects/${name.toLowerCase()}`)}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.title}>{name}</div>
                    <div className={styles.tech}>{tech}</div>
                </div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
};

export default Project;
