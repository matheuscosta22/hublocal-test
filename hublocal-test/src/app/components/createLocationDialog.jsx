"use client";

import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createValidationSchema } from "../validationSchemas/createLocationValidationSchema";
import { CreateCompany } from "../api/CompaniesApi";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CreateLocation } from "../api/Locations";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CreateLocationDialog({
  companyId,
  handleClose,
  openCreateDialog,
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
      name: "",
      zip_code: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      company_id: companyId,
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
    const response = await CreateLocation(
      data.name,
      data.zip_code,
      data.street,
      data.number,
      data.district,
      data.city,
      data.state,
      data.company_id
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
        open={openCreateDialog}
      >
        <DialogTitle
          sx={{ backgroundColor: "#0385FD", m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          Criar Local
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
                  name="zip_code"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...register("zip_code")}
                      name="zip_code"
                      required
                      fullWidth
                      type="text"
                      id="zip_code"
                      label="CEP"
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
                  name="street"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...register("street")}
                      name="street"
                      required
                      fullWidth
                      type="text"
                      id="street"
                      label="Rua"
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
                  name="number"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...register("number")}
                      name="number"
                      required
                      fullWidth
                      type="text"
                      id="number"
                      label="Number"
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
                  name="district"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...register("district")}
                      name="district"
                      required
                      fullWidth
                      type="text"
                      id="district"
                      label="Bairro"
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
                  name="city"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...register("city")}
                      name="city"
                      required
                      fullWidth
                      type="text"
                      id="city"
                      label="Cidade"
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
                  name="state"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      {...register("state")}
                      name="state"
                      required
                      fullWidth
                      type="text"
                      id="state"
                      label="Estado"
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
