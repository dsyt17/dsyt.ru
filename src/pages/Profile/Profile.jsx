import React from 'react';
import { fetchUser } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.scss';
import VerifiedIcon from '@mui/icons-material/Verified';
import { getDate } from '../../utils/dateTime';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Profile = () => {
    const dispatch = useDispatch();
    const myData = useSelector(state => state.auth);
    const userData = useSelector(state => state.user);
    const isMyDataLoading = myData.status === 'loading';
    const isUserDataLoading = userData.status === 'loading';
    const nickname = useParams();

    const getData = () => {
        if (myData.data?.nickname === nickname.id) {
            return;
        } else {
            dispatch(fetchUser(nickname.id));
        }
    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    useDocumentTitle(nickname.id);

    return isMyDataLoading ? (
        // add skeleton
        <div></div>
    ) : myData.data && myData.data.nickname === nickname.id ? (
        <div className={styles.root}>
            <img
                className={styles.avatar}
                src={myData.data.avatarUrl ? myData.data.avatarUrl : '/users_assets/no_avatar.jpg'}
                alt={'avavatr'}
            ></img>

            <h1>
                <div className={styles.userName}>{myData.data.nickname}</div>
                {myData.data.verifed && <VerifiedIcon style={{ marginLeft: 5 }} color="primary" />}
            </h1>

            <div>Email: {myData.data.email}</div>
            <div>Full name: {myData.data.fullName}</div>
            <div>Login: {myData.data.login}</div>
            <div>Register: {getDate(myData.data.createdAt)}</div>
        </div>
    ) : isUserDataLoading ? (
        <div></div>
    ) : (
        <div className={styles.root}>
            <img
                className={styles.avatar}
                src={
                    userData.data.avatarUrl
                        ? userData.data.avatarUrl
                        : '/users_assets/no_avatar.jpg'
                }
                alt={'avavatr'}
            ></img>

            <h1>
                <div className={styles.userName}>{userData.data.nickname}</div>
                {userData.data.verifed && (
                    <VerifiedIcon style={{ marginLeft: 5 }} color="primary" />
                )}
            </h1>
            <div>Full name: {userData.data.fullName}</div>
            <div>Register: {getDate(userData.data.createdAt)}</div>
        </div>
    );
};

export default Profile;
