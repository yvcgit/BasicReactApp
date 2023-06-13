import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import InputButton from "../inputs/inputButton";
import TextInput from "../inputs/textInput";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export default function AddProject() {
  const [project, setProjectName] = React.useState("");
  const [Projects, setProjects] = React.useState([]);

  const addProject = async (projectName) => {
    if(project){
    await axios
      .post("http://172.17.160.1:2023/saveProject", {
        projectName: project,
      })
      .then(function (response) {
        console.log(response);
        getProjects();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    setProjectName("");
  };

  const getProjects = () => {
    axios
      .get("http://172.17.160.1:2023/getAllProjects")
      .then((response) => {
        setProjects(response.data || []);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProjects();
  }, [""]);

  // const columns = [
  //   {
  //     field: "id",
  //     headerName: "ID",
  //     flex: 1,
  //   },
  //   {
  //     field: "projectName",
  //     headerName: "project Name",
  //     flex: 1,
  //   },
  // ];

  return (
    <Box p={2} m={2}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6}>
          <Paper>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography variant="h6" align="center">
                    Add Project
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    label="Project Name"
                    value={project}
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                    required
                  />
                </Grid>
                <Grid item md={12}>
                  <Button
                    onClick={() => {
                      addProject(project);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Add Project
                  </Button>
                </Grid>
                {/* <Grid item md={12}>
                  <Box m={2}>
                    <DataGrid
                      rows={Projects || []}
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
                </Grid> */}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
