import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import InputButton from "../inputs/inputButton";
import SelectField from "../inputs/selectField";
import TextInput from "../inputs/textInput";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function UpdateProject() {
  const [Projects, setProjects] = React.useState([]);
  const [ProjectsUpdated, setProjectsUpdated] = React.useState({
    id: "",
    ProjectName: "",
  });

  useEffect(() => {
    axios
      .get("http://172.17.160.1:2023/getAllProjects")
      .then((response) => {
        setProjects(response.data || []);
      })
      .catch((error) => console.log(error));
  }, [""]);

  const updateProject = async () => {
    await axios
      .post("http://172.17.160.1:2023/updateProject", {
        ...ProjectsUpdated,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setProjectsUpdated({
      id: "",
      ProjectName: "",
    });
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
                    Update Project
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {"Select Project"}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={ProjectsUpdated.id}
                      onChange={(e) => {
                        setProjectsUpdated({
                          ...ProjectsUpdated,
                          id: e.target.value,
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
                  <TextField
                    fullWidth
                    label="Project Name"
                    value={ProjectsUpdated.ProjectName}
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                      setProjectsUpdated({
                        ...ProjectsUpdated,
                        ProjectName: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Button
                    onClick={() => {
                      updateProject();
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Update Project
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
