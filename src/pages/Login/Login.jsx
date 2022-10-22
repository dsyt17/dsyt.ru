import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  // форма для валидации
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      // названия полей для бекэнда
      loginOrEmail: "",
      password: "",
    },
    mode: "onChange",
  });

  // переадрисовываем если уже авторизирован
  if (isAuth) {
    return <Navigate to="/" />;
  }

  // выполнится только если все заполнено верно
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      alert("Something wrong!");
    }
    window.localStorage.setItem("token", data.payload.token);
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      {/* отправляем данные */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail or login"
          error={Boolean(errors.loginOrEmail?.message)}
          helperText={errors.loginOrEmail?.message}
          // добавляем (регистрируем) поле в react-hook-form
          {...register("loginOrEmail", { required: "Enter E-Mail or login!" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter password!" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
