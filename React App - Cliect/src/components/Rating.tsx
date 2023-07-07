import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { styled, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUpdatedApplication } from "../features/application/applicationSlice";
import { Application } from "../models/Application";
import { RatingProps } from "../external/interfaces";

export const RatingComponent: React.FC<RatingProps> = ({ number, row }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<number>(number);
  const theme = useTheme();
  const updateField = (field: string, value: number) => {
    const updatedRow = { ...row.object, [field]: value };
    setValue(value);
    dispatch(
      addUpdatedApplication({
        application: updatedRow as Application,
        field: row.field,
      })
    );
  };
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <CustomRating
        value={value}
        theme={theme}
        onChange={(event, newValue) => {
          updateField(row.field, newValue!);
        }}
      />
    </Box>
  );
};

const CustomRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: theme.palette.primary.main, // Use the desired color from the theme
  },
  "& .MuiRating-iconEmpty": {
    color: theme.palette.grey[400], // Use the desired color from the theme or specify a shade
  },
}));
