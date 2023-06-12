import React from "react";
import TextField from "@mui/material/TextField";

export default function TextInput(props) {
  const { label, variant, value, name, type } = props;

  return (
    <div>
      <TextField
        label={label}
        value={value}
        variant={variant}
        name={name}
        type={type || 'text'}
      />
    </div>
  );
}
