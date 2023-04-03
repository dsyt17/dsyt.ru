import React from 'react';

import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';

type Links = {
    link: string;
    label: string;
};

const links: Array<Links> = [
    { link: 'https://vk.com/dsyt17', label: 'Vk' },
    { link: 'https://t.me/dsyt17', label: 'Telegram' },
    { link: 'https://github.com/dsyt17', label: 'GitHub' },
];

const Footer = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className={styles.wrapper}>
            {links.map(item => (
                <a key={item.label} href={item.link} target="_blank" rel="noreferrer">
                    {item.label}
                </a>
            ))}
            <div onClick={() => changeLanguage('ru')}>Ru</div>
            <div onClick={() => changeLanguage('en')}>En</div>
        </div>
    );
};

export default Footer;
