import axios from "axios";
import { Bounce, toast } from "react-toastify";

function notifyFail(message = "Não foi possível efetuar login") {
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

export default async function LoginApi(email, password) {
  try {
    const response = await axios.post(
      "http://localhost:8000/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
      }
    );

    if (response.status == 200) {
      toast.success("Login efetuado com sucesso", {
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

      console.log(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
      return;
    } else {
      if (response.status == 422) {
        console.log(response.data);
      }

      notifyFail();
    }
  } catch (err) {
    console.log(err);
    notifyFail();
  }
}
