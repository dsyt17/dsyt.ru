import React from 'react';
import classes from '../users.module.scss';

export const Success = ({ count }) => {
    return (
        <div className={classes.successblock}>
            <img src="/users_assets/success.svg" alt="Success" />
            <h3>Успешно!</h3>
            <p>Всем {count} пользователям отправлено приглашение.</p>
            <button onClick={() => window.location.reload()} className={classes.sendinvitebtn}>
                Назад
            </button>
        </div>
    );
};
