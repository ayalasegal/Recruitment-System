import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Grid from "@mui/material/Grid";
import { Box, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  createNewPosition,
  deleteExistingPosition,
  updateExistingPosition,
} from "../../features/position/positionSlice";
import { withDialog } from "../../HOC";
import dayjs from "dayjs";
import { PositionFormData, PositionFormProps } from "../../external/interfaces";

export const PositionForm: React.FC<PositionFormProps> = ({
  initialValues,
  onClose,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleDeletion = () => {
    if (initialValues) {
      dispatch(deleteExistingPosition(initialValues._id!));
      setFormValues({
        name: "",
        location: "",
        date: "",
        companyDescription: "",
        jobDescription: "",
        requirements: [],
      });
      onClose!();
    }
  };
  const [formValues, setFormValues] = useState<PositionFormData>({
    name: initialValues?.name || "",
    location: initialValues?.location || "",
    date: initialValues?.date
      ? dayjs(initialValues!.date).format("YYYY-MM-DD")
      : "",
    companyDescription: initialValues?.companyDescription || "",
    jobDescription: initialValues?.jobDescription || "",
    requirements: initialValues?.requirements || [],
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const isEditMode = !!initialValues; // Check if initialValues are present

  const handleRequirementChange = (index: number, value: string) => {
    setFormValues((prevValues: any) => {
      const requirements = [...prevValues.requirements];
      requirements[index] = value;
      return {
        ...prevValues,
        requirements,
      };
    });
  };

  const handleAddRequirement = () => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      requirements: [...prevValues.requirements, ""],
    }));
  };

  const handleRemoveRequirement = (index: number) => {
    setFormValues((prevValues: any) => {
      const requirements = [...prevValues.requirements];
      requirements.splice(index, 1);
      return {
        ...prevValues,
        requirements,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form validation
    if (
      formValues.name.trim() === "" ||
      formValues.location.trim() === "" ||
      formValues.date.toString().trim() === "" ||
      !isValidDate(formValues.date.toString())
    ) {
      // Handle form validation error, display error message, etc.
      return;
    }
    if (initialValues) {
      dispatch(
        updateExistingPosition(initialValues!._id!, {
          _id: initialValues!._id!,
          companyDescription: formValues.companyDescription,
          date: new Date(formValues.date),
          jobDescription: formValues.jobDescription,
          location: formValues.location,
          name: formValues.name,
          requirements: formValues.requirements,
        })
      );
    } else {
      dispatch(createNewPosition(formValues));
    }
    // Clear the form values after submission
    setFormValues({
      name: "",
      location: "",
      date: "",
      companyDescription: "",
      jobDescription: "",
      requirements: [],
    });
    onClose!();
  };
  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Location"
            name="location"
            value={formValues.location}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formValues.date}
            onChange={handleInputChange}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Company Description"
            name="companyDescription"
            value={formValues.companyDescription}
            onChange={handleInputChange}
            required
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Job Description"
            name="jobDescription"
            value={formValues.jobDescription}
            onChange={handleInputChange}
            required
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          {formValues.requirements.map((requirement: any, index: number) => (
            <>
              <Grid container spacing={2} alignItems="center" key={index}>
                <Grid item xs={10}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      aria-label="Remove Requirement"
                      onClick={() => handleRemoveRequirement(index)}
                      size="small"
                      sx={{ mr: 1, my: 0.5 }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      label="Requirement"
                      value={requirement}
                      onChange={(event) =>
                        handleRequirementChange(index, event.target.value)
                      }
                      required
                      fullWidth
                    />
                  </Box>
                </Grid>
              </Grid>
              <br />
            </>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddRequirement}
            size="small"
          >
            Add Requirement
          </Button>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {isEditMode ? "Update" : "Add"}
          </Button>
        </Grid>
        {isEditMode ? (
          <Grid item xs={12}>
            <Button variant="contained" color="error" onClick={handleDeletion}>
              Delete this Position And all it's Applications
            </Button>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </form>
  );
};

export default PositionForm;
export const PositionFormWithDialog = withDialog(PositionForm);
