import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="projects">
      <h1>This is my projects!</h1>
      <ul className="ul_projects">
        {projects.map((obj, index) => (
          <li
            key={index}
            className="projects_links_btns"
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
