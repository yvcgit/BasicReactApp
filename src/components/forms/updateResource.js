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
import { async } from "q";

export default function UpdateResource() {
  const [Resources, setResources] = React.useState([]);
  const [ResourcesUpdated, setResourcesUpdated] = React.useState({
    id: "",
    resourceName: "",
  });

  const getAllResources =  () => {
    axios
      .get("http://172.17.160.1:2023/getAllResources")
      .then((response) => {
        setResources(response.data || []);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllResources();
  }, [""]);

  const updateResource = async () => {
    await axios
      .post("http://172.17.160.1:2023/updateResource", {
        ...ResourcesUpdated,
      })
      .then(function (response) {
        console.log(response);
        getAllResources();
      })
      .catch(function (error) {
        console.log(error);
      });

    setResourcesUpdated({
      id: "",
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
                    Update Resource
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
                      value={ResourcesUpdated.id}
                      onChange={(e) => {
                        setResourcesUpdated({
                          ...ResourcesUpdated,
                          id: e.target.value,
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
                  <TextField
                    fullWidth
                    label="Resource Name"
                    value={ResourcesUpdated.resourceName}
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                      setResourcesUpdated({
                        ...ResourcesUpdated,
                        resourceName: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item md={12}>
                  <Button
                    onClick={() => {
                      updateResource();
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Update Resource
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
