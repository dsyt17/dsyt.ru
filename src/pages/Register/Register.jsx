import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

import styles from "./Login.module.scss";

const Register = () => {
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
      email: "",
      password: "",
      login: "",
      nickname: "",
      fullName: "",
    },
    mode: "onChange",
  });

  // переадрисовываем если уже авторизирован
  if (isAuth) {
    return <Navigate to="/" />;
  }

  // выполнится только если все заполнено верно
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      alert("Something wrong!");
    }
    window.localStorage.setItem("token", data.payload.token);
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Enter full name!" })}
          className={styles.field}
          label="Full Name"
          fullWidth
        />
        <TextField
          error={Boolean(errors.nickname?.message)}
          helperText={errors.nickname?.message}
          {...register("nickname", { required: "Enter nickname name!" })}
          className={styles.field}
          label="Nickname"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Enter Email!" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.login?.message)}
          helperText={errors.login?.message}
          {...register("login", { required: "Enter login!" })}
          className={styles.field}
          label="Login"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter password!" })}
          className={styles.field}
          label="Password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
