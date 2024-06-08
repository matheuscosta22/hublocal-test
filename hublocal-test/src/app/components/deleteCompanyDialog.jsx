"use client";

import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DeleteCompanyDialog({
  company,
  handleClose,
  openDeleteDialog,
  handleDelete,
}) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openDeleteDialog && Boolean(company)}
    >
      <DialogTitle
        sx={{ backgroundColor: "#ff0000", m: 0, p: 2 }}
        id="customized-dialog-title"
      >
        Confirmar exclusão
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
        <Typography gutterBottom>
          {"A empresa " +
            company?.name +
            " será excluída. Tem certeza dessa ação?"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleDelete(company.id)}>
          Deletar
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
