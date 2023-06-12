import { Alert, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import InputButton from "../inputs/inputButton";
import TextInput from "../inputs/textInput";
import { Formik, Form } from "formik";
// import { useHistory } from "react-router-dom";

import { BrowserRouter as useHistory } from "react-router-dom";

export default function LoginForm(props) {
  const { setIsLoggedIn, setUseDetails } = props;

  const [isError, setError] = React.useState(false);

  return (
    <Box p={2} m={2}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);

          if (
            (values.email === "admin" && values.password === "admin") ||
            (values.email === "user" && values.password === "user")
          ) {
            setError(true);
            // history.push("/home");

            setIsLoggedIn(true);
            setUseDetails(values);
          } else {
            setError(true);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form>
            <Grid container spacing={2} justifyContent="center">
              <Grid item md={6}>
                <Paper>
                  <Box p={2}>
                    <Grid container spacing={2} justifyContent="center">
                      {isError && (
                        <Alert severity="error" icon={false}>
                          Invalid User Name and Password
                        </Alert>
                      )}

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
                          name={"email"}
                          handleChange={handleChange}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <TextInput
                          fullWidth
                          label="Password"
                          variant="outlined"
                          type="password"
                          name={"password"}
                          handleChange={handleChange}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <InputButton
                          label="Login"
                          variant="contained"
                          color="primary"
                          type={"submit"}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
