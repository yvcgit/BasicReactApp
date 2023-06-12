import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import InputButton from "../inputs/inputButton";
import TextInput from "../inputs/textInput";

export default function LoginForm() {
  return (
    <Box p={2} m={2} >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6}>
          <Paper>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Typography variant="h6" align="center">
                    Login
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <TextInput
                    fullWidth
                    label="User Name"
                    variant="outlined"
                    type="text"
                  />
                </Grid>
                <Grid item md={12}>
                  <TextInput
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                  />
                </Grid>
                <Grid item md={12}>
                  <InputButton
                    label="Login"
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
