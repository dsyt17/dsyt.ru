import React from "react";
import useDocumentTitle from "../hooks/setDocumentTitle";

const About = () => {
  useDocumentTitle("About");
  return <h1>_=This is Igor Goncharov site=_</h1>;
};

export default About;
