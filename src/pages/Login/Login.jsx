import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchAuth, selectIsAuth } from '../../redux/slices/authSlice';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const { t } = useTranslation();

    // форма для валидации
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            // названия полей для бекэнда
            loginOrEmail: '',
            password: '',
        },
        mode: 'onChange',
    });

    useDocumentTitle('Login');

    // переадрисовываем если уже авторизирован
    if (isAuth) {
        return <Navigate to="/posts" />;
    }

    // выполнится только если все заполнено верно
    const onSubmit = async values => {
        const data = await dispatch(fetchAuth(values));
        if (!data.payload) {
            alert('Something wrong!');
        }
        window.localStorage.setItem('token', data.payload.token);
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                {t('login.title')}
            </Typography>
            {/* отправляем данные */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label={t('login.fields.login.placeholder')}
                    error={Boolean(errors.loginOrEmail?.message)}
                    helperText={errors.loginOrEmail?.message}
                    // добавляем (регистрируем) поле в react-hook-form
                    {...register('loginOrEmail', { required: t('login.fields.login.required') })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label={t('login.fields.password.placeholder')}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: t('login.fields.password.required') })}
                    fullWidth
                />
                <Button
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    {t('login.loginButton')}
                </Button>
            </form>
        </Paper>
    );
};

export default Login;
