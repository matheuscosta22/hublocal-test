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
import { registerValidationSchema } from "../validationSchemas/registerValidationSchema";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResgisterApi from "../api/RegisterApi";

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
    ResgisterApi(data.name, data.email, data.password);
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
                      Registrar
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

    // <ThemeProvider theme={defaultTheme}>
    //   <Container component="main">
    //     <Grid container direction="row">
    //       <Grid item justifyContent="start">
    //         <div
    //           style={{ backgroundColor: "#0485FF", width: 600, height: 500 }}
    //         >
    //           <Image src="/hublocal-login-image.png" width={600} height={500} />
    //         </div>
    //       </Grid>
    //   <Grid
    //     container
    //     maxWidth={500}
    //     justifyContent="center"
    //     alignItems="center"
    //   >
    //     <Grid item xs={12} sx={{ backgroundColor: "#f0f0f0", padding: 20 }}>
    //       <Image src="/hublocal-logo.png" width={400} height={150} />
    //       <Grid container justifyContent="flex-start" spacing={2} mt={2}>
    //         <Grid item xs={4} md={8}>
    //           <TextField
    //             autoComplete="given-name"
    //             name="firstName"
    //             required
    //             fullWidth
    //             id="firstName"
    //             label="First Name"
    //             autoFocus
    //           />
    //         </Grid>
    //         <Grid item xs={4} md={8}>
    //           <TextField
    //             required
    //             fullWidth
    //             id="lastName"
    //             label="Last Name"
    //             name="lastName"
    //             autoComplete="family-name"
    //           />
    //         </Grid>
    //         <Grid item xs={4} md={8}>
    //           <TextField
    //             required
    //             fullWidth
    //             id="email"
    //             label="Email Address"
    //             name="email"
    //             autoComplete="email"
    //           />
    //         </Grid>
    //         <Grid item xs={4} md={8}>
    //           <TextField
    //             required
    //             fullWidth
    //             name="password"
    //             label="Password"
    //             type="password"
    //             id="password"
    //             autoComplete="new-password"
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={8}>
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             sx={{ borderRadius: 5, mt: 2 }}
    //           >
    //             Registrar
    //           </Button>
    //         </Grid>
    //         <Grid item xs={12} md={8}>
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             sx={{ borderRadius: 5, mt: 2 }}
    //           >
    //             Login
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </ThemeProvider>
  );
}
