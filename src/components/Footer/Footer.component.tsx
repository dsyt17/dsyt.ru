import React from 'react';

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
    return (
        <div className={styles.wrapper}>
            {links.map(item => (
                <a href={item.link} target="_blank" rel="noreferrer">
                    {item.label}
                </a>
            ))}
        </div>
    );
};

export default Footer;
