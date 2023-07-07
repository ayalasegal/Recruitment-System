import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Chip, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDispatch } from "react-redux";
import { addUpdatedApplication } from "../features/application/applicationSlice";
import { Application } from "../models/Application";
import { TestScoreProps } from "../external/interfaces";

const TestScore: React.FC<TestScoreProps> = ({ number, pass, row }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [editedNumber, setEditedNumber] = useState<number | null>(number);

  const updateField = (field: string, value: number | null) => {
    const updatedRow = { ...row.object, [field]: value };
    setEditedNumber(value);
    dispatch(
      addUpdatedApplication({
        application: updatedRow as Application,
        field: row.field,
      })
    );
  };

  const handleIncrease = () => {
    if (typeof editedNumber === "number" && editedNumber < 100) {
      const newValue = editedNumber + 1;
      updateField(row.field, newValue);
    } else if (editedNumber === null) {
      updateField(row.field, 0);
    }
  };

  const handleDecrease = () => {
    if (typeof editedNumber === "number" && editedNumber > 0) {
      const newValue = editedNumber - 1;
      updateField(row.field, newValue);
    } else if (editedNumber === 0) {
      updateField(row.field, null);
    }
  };

  const textColor =
    editedNumber === undefined ||
    (typeof editedNumber === "number" && editedNumber < pass)
      ? theme.palette.error.main
      : theme.palette.primary.light;
  const contrastColor =
    editedNumber === undefined ||
    (typeof editedNumber === "number" && editedNumber < pass)
      ? theme.palette.error.contrastText
      : theme.palette.primary.contrastText;

  return (
    <>
      {editedNumber === null ? (
        <Chip
          label="-"
          style={{
            color: theme.palette.info.contrastText,
            backgroundColor: theme.palette.info.light,
          }}
        />
      ) : (
        <Chip
          label={editedNumber.toString()}
          style={{ color: contrastColor, backgroundColor: textColor }}
        />
      )}
      <IconButton
        size="small"
        onClick={handleIncrease}
        disabled={editedNumber !== null && editedNumber >= 100}
      >
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={handleDecrease}
        disabled={ editedNumber === null}
      >
        <ArrowDownwardIcon />
      </IconButton>
    </>
  );
};

export default TestScore;
