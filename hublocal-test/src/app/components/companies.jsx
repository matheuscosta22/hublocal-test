"use client";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  GetCompaniesWithLocationsCount,
  DeleteCompany,
} from "../api/CompaniesApi";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import SkeletonRows from "./skeletonRows";
import { Poppins } from "next/font/google";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import Header from "./header";
import { styled } from "@mui/material/styles";
import DeleteCompanyDialog from "./deleteCompanyDialog";
import CreateIcon from "@mui/icons-material/Create";
import PinDropIcon from '@mui/icons-material/PinDrop';
import EditCompanyDialog from "./editCompanyDialog";
import CreateCompanyDialog from "./createCompanyDialog";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Companies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyCompanies, setEmptyCompanies] = useState(0);
  const [selectedCompanyForDelete, setSelectedCompanyForDelete] =
    useState(null);
  const [selectedCompanyForEdit, setSelectedCompanyForEdit] = useState(null);
  const [openCreateCompany, setOpenCreateCompany] = useState(null);
  const [pageApi, setPageApi] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetCompaniesWithLocationsCount(pageApi ?? 1);
        console.log(response);
        if (response.status == 401) {
          router.push("/login");
        }

        if (response.data.meta.itemCount == 0) {
          setEmptyCompanies(1);
        }
        setData(response.data);
      } catch (errors) {
        setError(errors);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageApi]);

  if (error) {
    if (Object.values(error)[0]?.message) {
      toast.error(Object.values(error)[0].message, {
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

  const handleDeleteClose = () => {
    setSelectedCompanyForDelete(null);
  };

  const handleCreateClose = () => {
    setOpenCreateCompany(null);
  };

  const handleEditClose = () => {
    setSelectedCompanyForEdit(null);
  };

  const handleDelete = async (companyId) => {
    const response = await DeleteCompany(companyId);
    if (response.status == 401) {
      router.push("/login");
    }
    window.location.reload();
  };

  return (
    <>
      <ToastContainer />
      <Header title="Minhas Empresas" />
      <Container>
        {!loading && Boolean(emptyCompanies) && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <font color="black">
              <Typography
                variant="h4"
                gutterBottom
                className={poppins.className}
              >
                Nenhuma empresa cadastrada!
              </Typography>
            </font>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenCreateCompany(true)}
            >
              Cadastrar Empresa
            </Button>
            {Boolean(openCreateCompany) && (
              <CreateCompanyDialog
                handleClose={handleCreateClose}
                openCreateDialog={() => Boolean(openCreateCompany)}
              />
            )}
          </Box>
        )}
        {!Boolean(emptyCompanies) && (
          <Box
            px={4}
            pb={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Box width="100%" display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenCreateCompany(true)}
              >
                Cadastrar Empresa
              </Button>
            </Box>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "1px 4px 20px rgba(0, 0, 0, 0.39)" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Qt de Locais</TableCell>
                    <TableCell>Deletar</TableCell>
                    <TableCell>Editar</TableCell>
                    <TableCell>Locais</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && <SkeletonRows skeletonRowsLength={3} />}
                  {!loading &&
                    data.items?.map((company) => (
                      <>
                        <TableRow key={company.id}>
                          <TableCell>{company.name}</TableCell>
                          <TableCell>{company.count_locations}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                setSelectedCompanyForDelete(company)
                              }
                            >
                              <DeleteIcon sx={{ color: "#ff0000" }} />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <CreateIcon
                                onClick={() =>
                                  setSelectedCompanyForEdit(company)
                                }
                              />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <PinDropIcon
                                onClick={() =>
                                  router.push("/locations?companyId=" + company.id, )
                                }
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  <DeleteCompanyDialog
                    company={selectedCompanyForDelete}
                    handleClose={handleDeleteClose}
                    handleDelete={handleDelete}
                    openDeleteDialog={() => Boolean(selectedCompanyForDelete)}
                  />
                  {Boolean(openCreateCompany) && (
                    <CreateCompanyDialog
                      handleClose={handleCreateClose}
                      openCreateDialog={() => Boolean(openCreateCompany)}
                    />
                  )}
                  {Boolean(selectedCompanyForEdit) && (
                    <EditCompanyDialog
                      company={selectedCompanyForEdit}
                      handleClose={handleEditClose}
                      openEditDialog={() => Boolean(selectedCompanyForEdit)}
                    />
                  )}
                </TableBody>
              </Table>
              <Pagination
                count={!loading ? data?.meta?.totalPages : 1}
                variant="outlined"
                shape="rounded"
                onChange={(e, value) => setPageApi(value)}
              />
            </TableContainer>
          </Box>
        )}
      </Container>
    </>
  );
}
