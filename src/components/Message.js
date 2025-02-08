import React from "react";
import { Alert } from "@mui/material";

function Message({ severity = "info", children }) {
  return <Alert severity={severity}>{children}</Alert>;
}

export default Message;
