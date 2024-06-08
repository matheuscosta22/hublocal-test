"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { Poppins } from "next/font/google";
import "../styles/register.css";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../validationSchemas/registerValidationSchema";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResgisterApi from "../api/RegisterApi";
import { useRouter } from "next/navigation";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Register() {
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
    resolver: yupResolver(registerValidationSchema),
  });

  const router = useRouter();
  const [redirect, setRedirect] = React.useState(0);

  React.useEffect(() => {
    if (Object.values(errors)[0]?.message) {
      notifyError();
    }
  }, [Object.values(errors)[0]?.message]);

  React.useEffect(() => {
    if (redirect == true) {
      router.push("/login");
    }
  }, [redirect]);

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

  const onSubmit = async (data) => {
    const response = await ResgisterApi(data.name, data.email, data.password);
    if (response.status == 401) {
      setRedirect(1);
    }
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
                  right: "-350px",
                }}
              >
                <img className="logo" src="/hublocal-logo.png" alt="Image" />
                <Grid container item spacing={2}>
                  <Grid item xs={7}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...register("name")}
                          autoComplete="given-name"
                          name="name"
                          required
                          fullWidth
                          type="text"
                          id="name"
                          label="Nome"
                          autoFocus
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...register("email")}
                          required
                          fullWidth
                          type="text"
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
                    <Controller
                      name="password_confirm"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...register("password_confirm")}
                          required
                          fullWidth
                          name="passwordConfirm"
                          label="Confirme a Senha"
                          type="password"
                          id="passwordConfirm"
                          autoComplete="new-password"
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                    >
                      Salvar
                    </Button>

                    <Button
                      href="/login"
                      color="success"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                    >
                      Logar
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
