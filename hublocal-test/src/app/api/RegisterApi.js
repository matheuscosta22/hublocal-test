import axios from "axios";
import { Bounce, toast } from "react-toastify";

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
    const response = await axios.post(
      "http://localhost:8000/users",
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

      return;
    } else {
      notifyFail();
    }
  } catch (err) {
    if (
      err.response.status == 422 &&
      err.response?.data.error == "User alredy exists"
    ) {
      notifyFail("Email já utilizado");
    } else {
      notifyFail();
    }
  }
}
