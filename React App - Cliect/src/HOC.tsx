import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/material";
import {
  ApplicationsProps,
  DialogProps,
  WithIdProps,
} from "./external/interfaces";

// HOC to render Component in Dialog
export const withDialog = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P & DialogProps) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isEditMode = !props.initialValues; // Check if initialValues are present
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Button variant="contained" color="info" onClick={handleOpen}>
          {!isEditMode ? "Edit this Position" : "Add New Position"}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          sx={{
            borderRadius: theme.shape.borderRadius,
            border: `2px solid ${theme.palette.primary.main}`,
          }}
          PaperProps={{
            style: { borderRadius: 2, borderColor: "blueviolet" },
          }}
          scroll="body"
        >
          <DialogTitle color={theme.palette.primary.dark}>
            {!isEditMode ? "Edit Position" : "Add New Position"}
          </DialogTitle>
          <br />
          <DialogContent>
            <WrappedComponent {...props} onClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
};

export const withId = <P extends WithIdProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: Omit<P, "id" | "type">) => {
    const { id } = useParams<{ id: string }>();
    const componentProps = { ...props, id };
    return <WrappedComponent {...(componentProps as P)} />;
  };
};

export const withCandidate = <P extends ApplicationsProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: Omit<P, "candidate" | "type">) => {
    const { candidate } = useParams<{ candidate: string }>();
    const componentProps = { ...props, candidate };
    return <WrappedComponent {...(componentProps as P)} />;
  };
};

export const withPosition = <P extends ApplicationsProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: Omit<P, "position">) => {
    // Updated props type
    const { position } = useParams<{ position: string }>();
    const componentProps = { ...props, position };
    return <WrappedComponent {...(componentProps as P)} />;
  };
};
