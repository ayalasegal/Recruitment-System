import React from "react";
import { PositionForm } from "./PositionForm";
import { CandidateForm } from "./CandidateForm";
import { ApplicationForm } from "./ApplicationForm";
import {
  FormProps,
  PositionFormData,
  PositionFormProps,
} from "../../external/interfaces";

const Form: React.FC<FormProps> = ({ object, type }) => {
  let ComponentToRender: React.FC<PositionFormProps> | undefined;
  switch (type) {
    case "position":
      ComponentToRender = PositionForm;
      break;
    case "candidate":
      ComponentToRender = CandidateForm;
      break;
    default:
      ComponentToRender = ApplicationForm;
      break;
  }
  return (
    <>
      {object ? console.log("yess", object) : console.log("no", object)}
      {object ? (
        <ComponentToRender
          initialValues={object as unknown as PositionFormData}
        />
      ) : (
        <ComponentToRender />
      )}
    </>
  );
};

export default Form;
