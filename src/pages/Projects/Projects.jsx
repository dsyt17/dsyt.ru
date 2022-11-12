import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Projects.module.scss";

const projects = [
  { name: "Photos" },
  { name: "Converter" },
  { name: "Users" },
  { name: "Quiz" },
  { name: "Modal" },
];

const Projects = () => {
  const router = useNavigate();

  return (
    <div className={styles.projects}>
      <h1>This is my projects!</h1>
      <ul className={styles.ul_projects}>
        {projects.map((obj, index) => (
          <li
            key={index}
            className={styles.projects_links_btns}
            onClick={() => router(`/projects/${obj.name.toLowerCase()}`)}
          >
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
