import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';
import classes from '../../users.module.scss';

export const Users = ({
    items,
    isLoading,
    onChangeSearchValue,
    searchValue,
    onClickInvite,
    invites,
    onClickSendInvites,
    count,
}) => {
    return (
        <>
            <div className={classes.search}>
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    type="text"
                    placeholder="Найти пользователя..."
                />
            </div>
            {isLoading ? (
                <div className={classes.skeletonlist}>
                    <Skeleton />
                </div>
            ) : (
                <ul className={classes.userslist}>
                    {items
                        .filter(user => {
                            const fullName = (user.first_name + user.last_name).toLowerCase();
                            return (
                                fullName.includes(searchValue.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchValue.toLowerCase())
                            );
                        })
                        .map((user, index) => (
                            <User
                                isInvited={invites.includes(user.id)}
                                key={index}
                                user={user}
                                onClickInvite={onClickInvite}
                            />
                        ))}
                </ul>
            )}
            {invites.length > 0 ? (
                <button onClick={onClickSendInvites} className={classes.sendinvitebtn}>
                    Отправить приглашение
                </button>
            ) : (
                <button
                    onClick={onClickSendInvites}
                    disabled={true}
                    className={classes.sendinvitebtndisabled}
                >
                    Выберите пользователя
                </button>
            )}
        </>
    );
};
