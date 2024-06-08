import React from "react";
import * as yup from "yup";

export const createValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome deve ser preenchido")
    .min(2, "Nome deve ter no mínimo 6 caracteres")
    .max(255, "Nome deve ter no maximo 255 caracteres"),

    website: yup
    .string()
    .required("Website deve ser preenchido")
    .min(5, "Website deve ter no mínimo 6 caracteres")
    .max(255, "Website deve ter no maximo 255 caracteres"),

    cnpj: yup
    .string()
    .required("Cnpj deve ser preenchido")
    .length(14, "Cnpj deve ter 14 caracteres"),
});
