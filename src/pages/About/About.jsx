import React from "react";
import useDocumentTitle from "../../hooks/setDocumentTitle";
import styles from "./About.module.scss";

const About = () => {
  useDocumentTitle("About");
  return <h1 className={styles.root}>_=This is Igor Goncharov site=_</h1>;
};

export default About;
