import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function EntityForm ({ handleSubmit, entity = null }) {
  const titleProps = {};
  const descriptionProps = {};

  if (entity) {
    titleProps.defaultValue = entity.title;
    descriptionProps.defaultValue = entity.description;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
        {...titleProps}
      />
      <TextField
        multiline
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        name="description"
        autoComplete="description"
        autoFocus
        {...descriptionProps}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save
      </Button>
    </Box>
  );
}
