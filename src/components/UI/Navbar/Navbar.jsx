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
  auth: [
    { name: "My profile", link: "profile" },
    { name: "Exit", link: "/" },
  ],
};

const Navbar = () => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  const logoutButton = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    setActive(0);
  };

  // кринж убрать
  useEffect(() => {
    links.main.forEach((l, index) => {
      window.location.pathname.includes(l.link) && setActive(index);
      window.location.pathname.includes("newpost") && setActive(2);
      window.location.pathname.includes("users") && setActive(2);
    });
  }, [active]);

  return (
    <nav className={styles.navbar}>
      <ul>
        {links.main.map((l, index) => (
          <li className={active === index ? styles.active_link : ""}>
            <Link
              key={index}
              onClick={() => setActive(index)}
              to={`/${l.link}`}
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {isAuth ? (
          <li>
            <Link
              onClick={() => setActive(3)}
              to={`/users/${userData.nickname}`}
            >
              {userData.nickname}
            </Link>
            <Link onClick={logoutButton} to={`exit`}>
              {"Exit"}
            </Link>
          </li>
        ) : (
          links.guest.map((l, index) => (
            <li className={l.name === "Sign in" ? styles.sign_in : ""}>
              <Link key={index} onClick={() => setActive(0)} to={`/${l.link}`}>
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
