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

export async function GetCompanies(page = 1, limit = 10) {
  try {
    const response = await api.get(
      "/companies?page=" + page + "&limit=" + limit,
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

export async function GetCompaniesWithLocationsCount(page = 1, limit = 10) {
  try {
    const response = await api.get(
      "/companies/count-locations?page=" + page + "&limit=" + limit,
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

export async function DeleteCompany(companyId) {
  try {
    const response = await api.delete("/companies/" + companyId, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);

    if (response.status == 200) {
      toast.success("Empresa Deletada com sucesso", {
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

export async function CreateCompany(name, website, cnpj) {
  try {
    const response = await api.post(
      "/companies",
      {
        name: name,
        website: website,
        cnpj: cnpj,
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


export async function UpdateCompany(id, name, website, cnpj) {
  try {
    const response = await api.put(
      "/companies/" + id,
      {
        name: name,
        website: website,
        cnpj: cnpj,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);

    if (response.status == 200) {
      toast.success("Resgistro atualizado com sucesso", {
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