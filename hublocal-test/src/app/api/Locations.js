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

export async function GetLocations(companyId, page = 1, limit = 10) {
  try {
    const response = await api.get(
      "/company-locations/" + companyId + "?page=" + page + "&limit=" + limit,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function DeleteLocation(locationId) {
  try {
    const response = await api.delete("/locations/" + locationId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);

    if (response.status == 200) {
      toast.success("Local Deletado com sucesso", {
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
      notifyFail("Não foi possível deletar o registro");
    }

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function CreateLocation(
  name,
  zip_code,
  street,
  number,
  district,
  city,
  state,
  company_id
) {
  try {
    const response = await api.post(
      "/locations",
      {
        name: name,
        zip_code: zip_code,
        street: street,
        number: number,
        district: district,
        city: city,
        state: state,
        company_id: company_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);

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
    notifyFail();
    return err;
  }
}

export async function UpdateLocation(
    id,
    name,
    zip_code,
    street,
    number,
    district,
    city,
    state,
    company_id
  ) {
    try {
      const response = await api.put(
        "/locations/" + id,
        {
          name: name,
          zip_code: zip_code,
          street: street,
          number: number,
          district: district,
          city: city,
          state: state,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
  
      if (response.status == 200) {
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
      notifyFail();
      return err;
    }
  }
