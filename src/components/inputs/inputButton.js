import { Button } from "@mui/material";
import React from "react";

export default function InputButton(props) {
  const { label, variant, color } = props;

  return (
    <div>
      <Button variant={variant} color={color}>
        {label}
      </Button>
    </div>
  );
}
