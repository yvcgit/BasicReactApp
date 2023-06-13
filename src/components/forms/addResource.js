import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import InputButton from "../inputs/inputButton";
import TextInput from "../inputs/textInput";
import axios from "axios";

export default function AddResource() {
  const [Resource, setResourceName] = React.useState({
    resourceId: "",
    resourceName: "",
  });

  const addResource = async (ResourceName) => {
    if(Resource.resourceId && Resource.resourceName){
    await axios
      .post("http://172.17.160.1:2023/saveResource", {
        ...Resource,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    setResourceName({
      resourceId: "",
      resourceName: "",
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
                    Add Resource
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    label="Resource ID"
                    value={Resource.resourceId}
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                      setResourceName({
                        ...Resource,
                        resourceId: e.target.value,
                      });
                    }}
                    required
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    required
                    fullWidth
                    label="Resource Name"
                    value={Resource.resourceName}
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                      setResourceName({
                        ...Resource,
                        resourceName: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Button
                    onClick={() => {
                      addResource();
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Add Resource
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
