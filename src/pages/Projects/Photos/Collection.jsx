import React from 'react';
import classes from './photos.module.scss';

export function Collection({ name, images }) {
    return (
        <div className={classes.collection}>
            <img className={classes.collection__big} src={images[0]} alt="Item" />
            <div className={classes.collection__bottom}>
                <img className={classes.collection__mini} src={images[1]} alt="Item" />
                <img className={classes.collection__mini} src={images[2]} alt="Item" />
                <img className={classes.collection__mini} src={images[3]} alt="Item" />
            </div>
            <h4>{name}</h4>
        </div>
    );
}
