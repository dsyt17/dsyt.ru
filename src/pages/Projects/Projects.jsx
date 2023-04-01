import React from 'react';
import Project from '../../components/Project/Project';
import useDocumentTitle from '../../hooks/setDocumentTitle';
import styles from './Projects.module.scss';

const projects = [
    {
        name: 'Photos',
        tech: 'React',
        description: 'lorem lorem lorem lorem lorem lorem',
    },
    {
        name: 'Converter',
        tech: 'React',
        description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem',
    },
    {
        name: 'Users',
        tech: 'React',
        description: 'lorem lorem lorem lorem lorem loremlore mloremloremlorem loremlor',
    },
    {
        name: 'Quiz',
        tech: 'React',
        description: 'lorem lorem lorem lorem lorem lorem lorem loremlor emlore loremlo',
    },
    {
        name: 'Modal',
        tech: 'React',
        description: 'lorem lorem lorem lorem lorem lorem lorem',
    },
];

const Projects = () => {
    useDocumentTitle('Projects');

    return (
        <div className={styles.root}>
            <h1>Нищие проекты</h1>
            <div className={styles.projects}>
                {projects.map((obj, index) => (
                    <Project
                        name={obj.name}
                        tech={obj.tech}
                        description={obj.description}
                        key={index}
                    ></Project>
                ))}
            </div>
        </div>
    );
};

export default Projects;
