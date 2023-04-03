import ErrorComponent from '../components/Errors/ErrorComponent/ErrorComponent';
import About from '../pages/About/About.component';
import AddPost from '../pages/AddPost/AddPost';
import FullPost from '../pages/FullPost/FullPost';
import Login from '../pages/Login/Login';
import Posts from '../pages/Posts/Posts';
import Profile from '../pages/Profile/Profile';
import Converter from '../pages/Projects/Converter/Converter';
import Modal from '../pages/Projects/Modal/Modal';
import Photos from '../pages/Projects/Photos/Photos';
import Projects from '../pages/Projects/Projects.component';
import Quiz from '../pages/Projects/Quiz/Quiz';
import Users from '../pages/Projects/Users/Users.js';
import Register from '../pages/Register/Register';

type RoutesType = {
    path: string;
    element: React.ReactNode;
};

export const routes: Array<RoutesType> = [
    { path: '/about', element: <About /> },
    { path: '/projects', element: <Projects /> },
    { path: '/login', element: <Login /> },
    { path: '/posts', element: <Posts /> },
    { path: '/newpost', element: <AddPost /> },
    { path: '/posts/:id/edit', element: <AddPost /> },
    { path: '/register', element: <Register /> },
    { path: '/posts/:id', element: <FullPost /> },
    { path: '/users/:id', element: <Profile /> },
    { path: '/projects/photos', element: <Photos /> },
    { path: '/projects/converter', element: <Converter /> },
    { path: '/projects/users', element: <Users /> },
    { path: '/projects/quiz', element: <Quiz /> },
    { path: '/projects/modal', element: <Modal /> },
    { path: '/*', element: <ErrorComponent /> },
    { path: '/', element: <Posts /> },
    // { path: "/*", element: <Navigate to="/about" replace /> },
];
