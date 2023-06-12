import { Button } from "@mui/material";
import React from "react";

export default function InputButton(props) {
  const { label, variant, color, type } = props;

  return (
    <div>
      <Button size='small' variant={variant} color={color} type={type}>
        {label}
      </Button>
    </div>
  );
}
