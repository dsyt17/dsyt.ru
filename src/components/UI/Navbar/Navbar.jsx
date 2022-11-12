import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navbar.module.scss";

const links = {
  main: [
    { name: "About", link: "about" },
    { name: "My projects", link: "projects" },
    { name: "Posts", link: "posts" },
  ],
  guest: [
    { name: "Sign in", link: "login" },
    { name: "Sign up", link: "register" },
  ],
};

const Navbar = () => {
  const [active, setActive] = useState(2);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  const logoutButton = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    setActive(2);
  };

  // кринж убрать
  useEffect(() => {
    links.main.forEach((l, index) => {
      window.location.pathname.includes(l.link) && setActive(index);
      window.location.pathname.includes("newpost") && setActive(2);
      window.location.pathname.includes("users") && setActive(3);
    });
  }, [active]);

  return (
    <nav className={styles.navbar}>
      <ul>
        {links.main.map((l, index) => (
          <li
            key={index}
            className={active === index ? styles.active_link : undefined}
          >
            <Link onClick={() => setActive(index)} to={`/${l.link}`}>
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {isAuth ? (
          <>
            <li className={active === 3 ? styles.active_link : undefined}>
              <Link
                onClick={() => setActive(99)}
                to={`/users/${userData.nickname}`}
              >
                {userData.nickname}
              </Link>
            </li>
            <li>
              <Link onClick={logoutButton} to={`/posts`}>
                Log Out
              </Link>
            </li>
          </>
        ) : (
          links.guest.map((l, index) => (
            <li key={index}>
              <Link onClick={() => setActive(99)} to={`/${l.link}`}>
                {l.name}
              </Link>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
