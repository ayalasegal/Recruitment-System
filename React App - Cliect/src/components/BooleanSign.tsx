import React, { useState } from "react";
import { Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUpdatedApplication } from "../features/application/applicationSlice";
import { Application } from "../models/Application";
import { BooleanSignProps } from "../external/interfaces";

const BooleanSign: React.FC<BooleanSignProps> = ({ value, row }) => {
  const dispatch = useDispatch();
  const [currentValue, setCurrentValue] = useState<boolean | null>(value);
  const updateField = (field: string, value: boolean | null) => {
    const updatedRow = { ...row.object, [field]: value };
    setCurrentValue(value);
    dispatch(
      addUpdatedApplication({
        application: updatedRow as Application,
        field: row.field,
      })
    );
  };

  const handleClick = () => {
    if ( currentValue === null) {
      setCurrentValue(true);
      updateField(row.field, true);
    } else if (currentValue) {
      setCurrentValue(false);
      updateField(row.field, false);
    } else {
      setCurrentValue(null);
      updateField(row.field, null);
    }
  };

  return (
    <>
      {currentValue === null ? (
        <Chip label="-" color="info" onClick={handleClick} />
      ) : !currentValue ? (
        <Chip label="X" color="error" onClick={handleClick} />
      ) : (
        <Chip label="V" color="primary" onClick={handleClick} />
      )}
    </>
  );
};

export default BooleanSign;
