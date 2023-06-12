import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import InputButton from "../inputs/inputButton";
import TextInput from "../inputs/textInput";
import axios from "axios";

export default function AddProject() {
  const [project, setProjectName] = React.useState("");

  const addProject = async (projectName) => {
    await axios
      .post("http://172.17.160.1:2023/saveProject", {
        projectName: project,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setProjectName("");
  };

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
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
