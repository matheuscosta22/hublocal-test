"use client";

import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createValidationSchema } from "../validationSchemas/createCompanyValidationSchema";
import { UpdateCompany } from "../api/CompaniesApi";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function EditCompanyDialog({
  company,
  handleClose,
  openEditDialog,
}) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: company?.name,
      website: company?.website,
      cnpj: company?.cnpj,
    },
    resolver: yupResolver(createValidationSchema),
  });
  const router = useRouter();

  useEffect(() => {
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

  const onSubmit = async (data) => {
    const response = await UpdateCompany(
      company.id,
      data.name,
      data.website,
      data.cnpj
    );
    if (response.status == 401) {
      router.push("/login");
    }
    window.location.reload();
  };

  return (
    <>
      <ToastContainer />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openEditDialog && Boolean(company)}
      >
        <DialogTitle
          sx={{ backgroundColor: "#0385FD", m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          Editar empresa
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
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
                  render={({ field: { value, onChange } }) => (
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
                      value={value}
                      onChange={onChange}
                      margin="dense"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="website"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...register("website")}
                      name="website"
                      required
                      fullWidth
                      type="text"
                      id="website"
                      label="Website"
                      autoFocus
                      value={value}
                      onChange={onChange}
                      margin="dense"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="cnpj"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...register("cnpj")}
                      name="cnpj"
                      required
                      fullWidth
                      type="text"
                      id="cnpj"
                      label="Cnpj"
                      autoFocus
                      value={value}
                      onChange={onChange}
                      margin="dense"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
              <Button variant="contained" type="submit">
                Salvar
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
