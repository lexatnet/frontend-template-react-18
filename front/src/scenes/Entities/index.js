import React, { useEffect } from "react";
import Layout from "@root/components/Layout";
import entitiesApi from "@root/store/entities";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Entities() {
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

  console.log(entities);
  //   useEffect(() => {
  //   }, []);

  //   const { data, error } = postApi.endpoints.getPost.useQuery(id)
  //   return error ? (
  //     <>there was an error</>
  //   ) : !data ? (
  //     <>loading</>
  //   ) : (
  //     <h1>{data.name}</h1>
  //   )
  const comp = entities.isLoading ? (
    <CircularProgress />
  ) : (
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
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return <Layout>{comp}</Layout>;
}
