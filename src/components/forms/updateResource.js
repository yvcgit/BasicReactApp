import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import InputButton from "../inputs/inputButton";
import SelectField from "../inputs/selectField";
import TextInput from "../inputs/textInput";
import axios from "axios";

export default function UpdateResource() {
  const [Resources, setResources] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://172.17.160.1:2023/getAllResources")
      .then((response) => {
        setResources(response.data || []);
      })
      .catch((error) => console.log(error));
  }, [""]);

  [
    {
        "id": 0,
        "resourceId": "vy57431",
        "resourceName": "Venkata"
    },
    {
        "id": 0,
        "resourceId": "nmn",
        "resourceName": "mnbhj"
    }
]

  return (
    <Box p={2} m={2}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6}>
          <Paper>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography variant="h6" align="center">
                    Update Resource
                  </Typography>
                </Grid>

                <Grid item md={12}>
                  
                </Grid>

                <Grid item md={12}>
                  <TextInput
                    fullWidth
                    label="Resource Name"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item md={12}>
                  <InputButton
                    label="Update Resource"
                    variant="contained"
                    color="primary"
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
