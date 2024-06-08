import React from "react";
import * as yup from "yup";

export const createValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome deve ser preenchido")
    .min(2, "Nome deve ter no mínimo 6 caracteres")
    .max(255, "Nome deve ter no maximo 255 caracteres"),

  zip_code: yup
    .string()
    .required("CEP deve ser preenchido")
    .min(6, "CEP deve ter no mínimo 6 caracteres")
    .max(255, "CEP deve ter no maximo 255 caracteres"),

  street: yup
    .string()
    .required("Rua deve ser preenchido")
    .min(2, "Rua deve ter no mínimo 2 caracteres")
    .max(255, "Rua deve ter no maximo 255 caracteres"),

  number: yup
    .string()
    .required("Numero deve ser preenchido")
    .min(1, "Numero deve ter no mínimo 2 caracteres")
    .max(10, "Numero deve ter no maximo 255 caracteres"),

  district: yup
    .string()
    .required("Bairro deve ser preenchido")
    .min(5, "Bairro deve ter no mínimo 5 caracteres")
    .max(255, "Bairro deve ter no maximo 255 caracteres"),

  city: yup
    .string()
    .required("Cidade deve ser preenchido")
    .min(5, "Cidade deve ter no mínimo 5 caracteres")
    .max(255, "Cidade deve ter no maximo 255 caracteres"),

  state: yup
    .string()
    .required("Estado deve ser preenchido")
    .min(2, "Estado deve ter no mínimo 2 caracteres")
    .max(255, "Estado deve ter no maximo 255 caracteres"),

    company_id: yup
    .number()
    .required("Company Id deve ser preenchido"),
});


export const editValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome deve ser preenchido")
    .min(2, "Nome deve ter no mínimo 6 caracteres")
    .max(255, "Nome deve ter no maximo 255 caracteres"),

  zip_code: yup
    .string()
    .required("CEP deve ser preenchido")
    .min(6, "CEP deve ter no mínimo 6 caracteres")
    .max(255, "CEP deve ter no maximo 255 caracteres"),

  street: yup
    .string()
    .required("Rua deve ser preenchido")
    .min(2, "Rua deve ter no mínimo 2 caracteres")
    .max(255, "Rua deve ter no maximo 255 caracteres"),

  number: yup
    .string()
    .required("Numero deve ser preenchido")
    .min(1, "Numero deve ter no mínimo 2 caracteres")
    .max(10, "Numero deve ter no maximo 255 caracteres"),

  district: yup
    .string()
    .required("Bairro deve ser preenchido")
    .min(5, "Bairro deve ter no mínimo 5 caracteres")
    .max(255, "Bairro deve ter no maximo 255 caracteres"),

  city: yup
    .string()
    .required("Cidade deve ser preenchido")
    .min(5, "Cidade deve ter no mínimo 5 caracteres")
    .max(255, "Cidade deve ter no maximo 255 caracteres"),

  state: yup
    .string()
    .required("Estado deve ser preenchido")
    .min(2, "Estado deve ter no mínimo 2 caracteres")
    .max(255, "Estado deve ter no maximo 255 caracteres"),
});
