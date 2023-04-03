import React, { useEffect, useState } from 'react';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [active, setActive] = useState(2);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(state => state.auth.data);

    const { t } = useTranslation();

    const links = {
        main: [
            { name: t('navbar.about'), link: 'about' },
            { name: t('navbar.myProjects'), link: 'projects' },
            { name: t('navbar.posts'), link: 'posts' },
        ],
        guest: [
            { name: t('navbar.signIn'), link: 'login' },
            { name: t('navbar.signUp'), link: 'register' },
        ],
    };

    const logoutButton = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        setActive(2);
    };

    // кринж убрать
    useEffect(() => {
        links.main.forEach((l, index) => {
            window.location.pathname.includes(l.link) && setActive(index);
            window.location.pathname.includes('newpost') && setActive(2);
            window.location.pathname.includes('users') && setActive(3);
        });
    }, [active]);

    const navigate = useNavigate();

    const navToggle = () => {
        const navBar = document.querySelector('#primary_nav');
        const navToggle = document.querySelector('#navToggle');
        const visability = navBar.getAttribute('data-visible');

        if (visability === 'false') {
            navBar.setAttribute('data-visible', true);
            navToggle.setAttribute('aria-expanded', true);
        } else {
            navBar.setAttribute('data-visible', false);
            navToggle.setAttribute('aria-expanded', false);
        }
    };

    return (
        <>
            <button
                className={styles.mobile_nav_toggle}
                id="navToggle"
                aria-controls="primary-nav"
                aria-expanded="false"
                onClick={navToggle}
            >
                <span className={styles.sr_only}></span>
            </button>
            <nav className={styles.navbar} data-visible="false" id="primary_nav">
                <ul>
                    {links.main.map((l, index) => (
                        <li
                            key={index}
                            className={active === index ? styles.active_link : undefined}
                            onClick={() => {
                                setActive(index);
                                navigate(`/${l.link}`);
                                navToggle();
                            }}
                        >
                            {l.name}
                        </li>
                    ))}
                </ul>
                <ul>
                    {isAuth ? (
                        <>
                            <li
                                className={active === 3 ? styles.active_link : undefined}
                                onClick={() => {
                                    setActive(99);
                                    navigate(`/users/${userData.nickname}`);
                                    navToggle();
                                }}
                            >
                                {userData.nickname}
                            </li>
                            <li
                                onClick={() => {
                                    logoutButton();
                                    navigate(`/posts`);
                                    navToggle();
                                }}
                            >
                                {t('navbar.logOut')}
                            </li>
                        </>
                    ) : (
                        links.guest.map((l, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setActive(99);
                                    navigate(`/${l.link}`);
                                    navToggle();
                                }}
                            >
                                {l.name}
                            </li>
                        ))
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Navbar;
