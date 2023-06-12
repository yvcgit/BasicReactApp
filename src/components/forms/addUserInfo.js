import { Button, Grid, Paper, Typography } from "@mui/material";
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

export default function AddUserInfo() {
  const [Projects, setProjects] = React.useState([]);
  const [Resources, setResources] = React.useState([]);
  const [ProjectsMapped, setProjectsMapped] = React.useState([]);

  const [ProjectsUpdated, setProjectsUpdated] = React.useState({
    resourceId: "",
    projectId: "",
  });

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
    await axios
      .post("http://172.17.160.1:2023/saveResourceMapped", {
        ...ProjectsUpdated,
      })
      .then(function (response) {
        console.log(response);
        getProjectsMapped();
      })
      .catch(function (error) {
        console.log(error);
      });

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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "projectName",
      headerName: "project Name",
      flex: 1,
    },
  ];

  return (
    <Box p={2} m={2}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6}>
          <Paper>
            <Box p={2}>
              <Grid container spacing={2}>
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

                <Grid item md={12}>
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
