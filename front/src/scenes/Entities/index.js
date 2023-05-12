import React from "react";
import Layout from "@root/components/Layout";
import entitiesApi from "@root/store/entities";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { hide, clear, isShown } from "@root/store/display";
import { useSelector, useDispatch } from "react-redux";

export default function Entities() {
  const dispatch = useDispatch();
  const entities = entitiesApi.endpoints.list.useQuery();
  const navigate = useNavigate();

  const [deleteEntity, { isLoading: isDeleting }] =
    entitiesApi.endpoints.delete.useMutation();

  const createNav = (nav) => () => {
    navigate(nav);
  };

  const createDeleteHandler = (entityId) => (event) => {
    event.preventDefault();
    deleteEntity(entityId);
  };

  const hideEntity = (entityId) => (event) => {
    event.preventDefault();
    console.log(entityId);
    dispatch(hide(entityId));
  };

  const showEntities = () => (event) => {
    event.preventDefault();
    dispatch(clear());
  };
  const isEntityShown = useSelector(isShown);

  const getRowStyles = (show) => {
    const res = {
      "&:last-child td, &:last-child th": { border: 0 },
    };
    if (!show) {
      res["&"] = {
        display: "none",
      };
    }
    return res;
  };

  const comp = entities.isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <IconButton onClick={showEntities()}>
        <VisibilityIcon />
      </IconButton>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entities.data.map((row) => (
            <TableRow key={row.id} sx={getRowStyles(isEntityShown(row.id))}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <IconButton onClick={createNav(`/entities/${row.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={createDeleteHandler(row.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={hideEntity(row.id)}>
                  <VisibilityOffIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );

  return <Layout>{comp}</Layout>;
}
