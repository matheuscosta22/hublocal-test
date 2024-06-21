"use client";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import "../styles/createCompany.css";
import Header from "./header";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CreateCompany } from "../api/CompaniesApi";
import { createValidationSchema } from "../validationSchemas/createCompanyValidationSchema";
import "react-toastify/dist/ReactToastify.css";

export default function CreateCompanies() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      website: "",
      cnpj: "",
    },
    resolver: yupResolver(createValidationSchema),
  });
  const router = useRouter();

  React.useEffect(() => {
    if (Object.values(errors)[0]?.message) {
      notifyError();
    }
  }, [Object.values(errors)[0]?.message]);

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const onSubmit = async (data) => {
    const response = await CreateCompany(data.name, data.website, data.cnpj);
    if (response.status == 401) {
      router.push("/login");
    }
    reset();
  };

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

  return (
    <>
      <ToastContainer />
      <Header title="Criar Empresa" />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid item xs={12} sm={8} md={6}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <Controller
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...register("website")}
                      required
                      fullWidth
                      type="text"
                      id="website"
                      label="Website"
                      name="website"
                      autoComplete="website"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...register("cnpj")}
                      required
                      fullWidth
                      name="cnpj"
                      label="Cnpj"
                      type="cnpj"
                      id="cnpj"
                      autoComplete="cnpj"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
