import React from "react";
import * as yup from "yup";

function validateEmail(email) {
  const rgx =
    // First section of email(before @) rejects [^´`<>{}()[\]\\,;:'~"+*?!|/%#^\s@"$&!=@\u00C0-\u00FF]+@
    // Second section of email(after @ before .com) rejects [^´`<>{}()[\]\\.,;:'"+?!|/%#^\s@"$&!=@\u00C0-\u00FF]+
    // Third section of email(after .) rejects \.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2,}
    // Fourth section of email(after .com || not required) rejects (\.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2})?
    /^[^´`<>{}()[\]\\,;:'~"+*?!|/%#^\s@"$&!=@\u00C0-\u00FF]+@[^´`<>{}()[\]\\.,;:'"+?!|/%#^\s@"$&!=@\u00C0-\u00FF]+\.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2,}(\.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2,})?(\.[^´`<>{}()[\]\\.,;:'`"+?!|/%#^\s@"$&!=@\u00C0-\u00FF1-9]{2})?$/;
  return rgx.test(email);
}

yup.addMethod(yup.string, "verifyEmail", function fn(errorMessage) {
  return this.test(`email-validation`, errorMessage, function fn2(value) {
    const { path, createError } = this;

    return validateEmail(value) || createError({ path, message: errorMessage });
  });
});

yup.addMethod(yup.string, "passwordConfirm", function fn(errorMessage) {
  return this.test(`password-confirm`, errorMessage, function fn2(value) {
    const { path, createError } = this;

    return validateEmail(value) || createError({ path, message: errorMessage });
  });
});

export const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome deve ser preenchido")
    .min(6, "Nome deve ter no mínimo 6 caracteres")
    .max(255, "Nome deve ter no maximo 255 caracteres"),

  email: yup
    .string()
    .required("Email deve ser preenchido")
    .email()
    .verifyEmail(),

  password: yup
    .string()
    .required("Senha deve ser preenchido")
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(50, "Senha deve ter no maximo 255 caracteres"),

  password_confirm: yup
    .string()
    .required("Confirmar Senha deve ser preenchido")
    .min(6, "Confirmar Senha deve ter no mínimo 6 caracteres")
    .max(50, "Confirmar Senha deve ter no maximo 255 caracteres")
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
});
