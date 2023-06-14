import {
  Alert,
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import InputButton from "../inputs/inputButton";
import SelectField from "../inputs/selectField";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddUserInfo({ operator }) {
  const [Projects, setProjects] = React.useState([]);
  const [Resources, setResources] = React.useState([]);
  const [ProjectsMapped, setProjectsMapped] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [ProjectsUpdated, setProjectsUpdated] = React.useState({
    resourceId: "",
    projectId: "",
  });

  const Actions = (props) => {
    console.log(props);
    return (
      <IconButton
        onClick={() => {
          axios
            .delete(
              `http://172.17.160.1:2023/deleteResourceMappedById/${props.row.id}`
            )
            .then((response) => {
              console.log(response.data);
              getProjectsMapped();
            })
            .catch((error) => console.log(error));
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    );
  };

  useEffect(() => {
    axios
      .get("http://172.17.160.1:2023/getAllProjects")
      .then((response) => {
        setProjects(response.data || []);
      })
      .catch((error) => console.log(error));
  }, [""]);

  useEffect(() => {
    axios
      .get("http://172.17.160.1:2023/getAllResources")
      .then((response) => {
        setResources(response.data || []);
      })
      .catch((error) => console.log(error));
  }, [""]);

  const updateProject = async () => {
    if (ProjectsUpdated.resourceId && ProjectsUpdated.projectId) {
      await axios
        .post("http://172.17.160.1:2023/saveResourceMapped", {
          ...ProjectsUpdated,
        })
        .then(function (response) {
          console.log(response);
          getProjectsMapped();
          setMessage(response.data);
          setOpen(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setProjectsUpdated({
      resourceId: "",
      projectId: "",
    });
  };

  const getProjectsMapped = () => {
    axios
      .get("http://172.17.160.1:2023/getAllResourceMapped")
      .then((response) => {
        console.log(response.data);
        setProjectsMapped(response.data || []);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProjectsMapped();
  }, [""]);

  const columns =
    operator === "user"
      ? [
          {
            field: "id",
            headerName: "ID",
            flex: 1,
          },
          {
            field: "resourceName",
            headerName: "Resource Name",
            flex: 1,
          },
          {
            field: "projectName",
            headerName: "project Name",
            flex: 1,
          },
        ]
      : [
          {
            field: "id",
            headerName: "ID",
            flex: 1,
          },
          {
            field: "resourceName",
            headerName: "Resource Name",
            flex: 1,
          },
          {
            field: "projectName",
            headerName: "project Name",
            flex: 1,
          },
          {
            field: "Actions",
            headerName: "Actions",
            renderCell: Actions,
            flex: 1,
          },
        ];

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Box p={2} m={2}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6}>
          <Paper>
            <Box p={2}>
              <Grid container spacing={2}>
                {operator === "user" && (
                  <>
                    <Grid item md={12}>
                      <Typography variant="h6" align="center">
                        Add Project to User
                      </Typography>
                    </Grid>
                    <Grid item md={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {"Select Resource"}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={ProjectsUpdated.resourceId}
                          onChange={(e) => {
                            setProjectsUpdated({
                              ...ProjectsUpdated,
                              resourceId: e.target.value,
                            });
                          }}
                          label="Age"
                        >
                          {Resources.map((item, index) => {
                            return (
                              <MenuItem value={item.id}>
                                {item.resourceName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {"Select Project"}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={ProjectsUpdated.projectId}
                          onChange={(e) => {
                            setProjectsUpdated({
                              ...ProjectsUpdated,
                              projectId: e.target.value,
                            });
                          }}
                          label="Age"
                        >
                          {Projects.map((item, index) => {
                            return (
                              <MenuItem value={item.id}>
                                {item.projectName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      <Button
                        onClick={() => {
                          updateProject();
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Add Project to User
                      </Button>
                    </Grid>
                  </>
                )}
                <Grid item md={12}>
                {operator === "admin" && (
                  <Typography variant="h6" align="center">
                    View Resource Mapped Info
                  </Typography>
                )}
                  <Box m={2}>
                    <DataGrid
                      rows={ProjectsMapped || []}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      disableRowSelectionOnClick
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
