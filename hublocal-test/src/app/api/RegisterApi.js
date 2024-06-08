"use client";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import api from "./Api";

function notifyFail(message = "Não foi possível efetuar o registro") {
  toast.error(message, {
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

export default async function ResgisterApi(name, email, password) {
  try {
    const response = await api.post(
      "/users",
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status == 201) {
      toast.success("Resgistro efetuado com sucesso", {
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
    } else {
      notifyFail();
    }
    return response;
  } catch (err) {
    if (err.status == 422 && err?.data.error == "User alredy exists") {
      notifyFail("Email já utilizado");
    } else {
      notifyFail();
    }
    return err;
  }
}
