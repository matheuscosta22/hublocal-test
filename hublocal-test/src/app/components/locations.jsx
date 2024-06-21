"use client";

import {
  Box,
  Button,
  Container,
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
import Header from "./header";
import { Poppins } from "next/font/google";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateCompanyDialog from "./createCompanyDialog";
import { useEffect, useState } from "react";
import SkeletonRows from "./skeletonRows";
import DeleteCompanyDialog from "./deleteCompanyDialog";
import EditCompanyDialog from "./editCompanyDialog";
import { DeleteLocation, GetLocations } from "../api/Locations";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import DeleteLocationDialog from "./deleteLocationDialog";
import CreateLocationDialog from "./createLocationDialog";
import EditLocationDialog from "./editLocationDialog";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Locations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyLocations, setEmptyLocations] = useState(0);
  const [selectedLocationForDelete, setSelectedLocationForDelete] =
    useState(null);
  const [selectedLocationForEdit, setSelectedLocationForEdit] = useState(null);
  const [openLocationCompany, setOpenCreateLocation] = useState(null);
  const [pageApi, setPageApi] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  if (!Boolean(companyId)) {
    router.push("/companies");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetLocations(companyId, pageApi ?? 1);
        console.log(response);
        if (response.status == 401) {
          router.push("/login");
        }

        if (response.data.meta.itemCount == 0) {
          setEmptyLocations(1);
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
    setSelectedLocationForDelete(null);
  };

  const handleCreateClose = () => {
    setOpenCreateLocation(null);
  };

  const handleEditClose = () => {
    setSelectedLocationForEdit(null);
  };

  const handleDelete = async (locationId) => {
    const response = await DeleteLocation(locationId);
    if (response.status == 401) {
      router.push("/login");
    }
    window.location.reload();
  };

  return (
    <>
      <Header title={"Locais"} />
      <Box
        onClick={() => router.push("/companies")}
        sx={{
          flexGrow: 1,
          flexDirection: "row",
          display: "flex",
          maxWidth: "50px",
        }}
      >
        <IconButton>
          <ArrowBackIcon
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              color: "#000000",
              mr: 2,
            }}
          />
        </IconButton>
        <font color="black">
          <Typography
            className={poppins.className}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Minhas Empresas
          </Typography>
        </font>
      </Box>
      <Container>
        {!loading && Boolean(emptyLocations) && (
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
                Nenhum Local cadastrado!
              </Typography>
            </font>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenCreateLocation(true)}
            >
              Cadastrar Local
            </Button>
            {Boolean(openLocationCompany) && (
              <CreateLocationDialog
                companyId={companyId}
                handleClose={handleCreateClose}
                openCreateDialog={() => Boolean(openLocationCompany)}
              />
            )}
          </Box>
        )}
        {!Boolean(emptyLocations) && (
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
                onClick={() => setOpenCreateLocation(true)}
              >
                Cadastrar Local
              </Button>
            </Box>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "1px 4px 20px rgba(0, 0, 0, 0.39)" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Local</TableCell>
                    <TableCell>Deletar</TableCell>
                    <TableCell>Editar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && <SkeletonRows skeletonRowsLength={3} />}
                  {!loading &&
                    data.items?.map((location) => (
                      <>
                        <TableRow key={location.id}>
                          <TableCell>{location.name}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                setSelectedLocationForDelete(location)
                              }
                            >
                              <DeleteIcon sx={{ color: "#ff0000" }} />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <CreateIcon
                                onClick={() =>
                                  setSelectedLocationForEdit(location)
                                }
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  {Boolean(selectedLocationForDelete) && (
                    <DeleteLocationDialog
                      location={selectedLocationForDelete}
                      handleClose={handleDeleteClose}
                      handleDelete={handleDelete}
                      openDeleteDialog={() =>
                        Boolean(selectedLocationForDelete)
                      }
                    />
                  )}
                  {Boolean(openLocationCompany) && (
                    <CreateLocationDialog
                      companyId={companyId}
                      handleClose={handleCreateClose}
                      openCreateDialog={() => Boolean(openLocationCompany)}
                    />
                  )}
                  {Boolean(selectedLocationForEdit) && (
                    <EditLocationDialog
                      location={selectedLocationForEdit}
                      handleClose={handleEditClose}
                      openEditDialog={() => Boolean(selectedLocationForEdit)}
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
