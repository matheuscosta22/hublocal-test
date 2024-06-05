"use client";
import * as React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Image from "next/image";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import "../styles/register.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginValidationSchema } from "../validationSchemas/loginValidationSchema ";
import LoginApi from "../api/LoginApi";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Login() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  React.useEffect(() => {
    if (Object.values(errors)[0]?.message) {
      notifyError();
    }
  }, [Object.values(errors)[0]?.message]);

  function notifyError() {
    if (Object.values(errors)[0]?.message) {
      toast.error(Object.values(errors)[0].message, {
        position: "top-right",
        autoClose: 50000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  const onSubmit = (data) => {
    LoginApi(data.email, data.password);
  };

  return (
    <div>
      <ToastContainer />

      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <Grid container direction="row">
            <Grid
              container
              item
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Box sx={{ float: "left", position: "absolute", left: "0px" }}>
                <img
                  style={{ backgroundColor: "#0485FF", marginBottom: "-5px" }}
                  className="registerImage"
                  src="/hublocal-login-image.png"
                  alt="Image"
                />
                <Box
                  sx={{
                    height: "280px",
                    width: "800px",
                    backgroundColor: "#00CC99",
                  }}
                >
                  <center>
                    <font className="textSignUp" color="white">
                      <Typography className={poppins.className} variant="h3">
                        Junte-se a vários <br />
                        clientes satisfeitos.
                      </Typography>
                      <Typography className={poppins.className} variant="body1">
                        Cliente Hublocal ganha mais relevância, autoridade e
                        <br />
                        visibilidade. Mais de 7.000 marcas confiam na nossa
                        <br />
                        plataforma. Seja uma delas!
                      </Typography>
                    </font>
                  </center>
                </Box>
              </Box>
            </Grid>
            <Grid container item>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  direction: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 3,
                  float: "right",
                  position: "absolute",
                  right: "0px",
                }}
              >
                <img className="logo" src="/hublocal-logo.png" alt="Image" />
                <Grid container item spacing={2}>
                  <Grid item xs={7}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...register("email")}
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          autoComplete="email"
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...register("password")}
                          required
                          fullWidth
                          name="password"
                          label="Senha"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Button
                      type="submit"
                      color="success"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                    >
                      Logar
                    </Button>
                    <Button
                      href="/register"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                    >
                      Registrar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}
