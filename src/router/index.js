import About from "../pages/About";
import Posts from "../pages/Posts/Posts";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import AddPost from "../pages/AddPost/AddPost";
import FullPost from "../pages/FullPost/FullPost";
import Projects from "../pages/Projects";
import Photos from "../pages/Projects/Photos/Photos";
import Converter from "../pages/Projects/Converter/Converter";
import Users from "../pages/Projects/Users/Users.js";
import Quiz from "../pages/Projects/Quiz/Quiz";
import Modal from "../pages/Projects/Modal/Modal";
import { Navigate } from "react-router-dom";

export const routes = [
  { path: "/about", element: <About /> },
  { path: "/projects", element: <Projects /> },
  { path: "/login", element: <Login /> },
  { path: "/posts", element: <Posts /> },
  { path: "/newpost", element: <AddPost /> },
  { path: "/posts/:id/edit", element: <AddPost /> },
  { path: "/register", element: <Register /> },
  { path: "/posts/:id", element: <FullPost /> },
  { path: "/users/:id", element: <Profile /> },
  { path: "/projects/photos", element: <Photos /> },
  { path: "/projects/converter", element: <Converter /> },
  { path: "/projects/users", element: <Users /> },
  { path: "/projects/quiz", element: <Quiz /> },
  { path: "/projects/modal", element: <Modal /> },
  { path: "/*", element: <Navigate to="/about" replace /> },
];
