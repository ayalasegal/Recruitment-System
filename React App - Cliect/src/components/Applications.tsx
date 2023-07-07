import React, { useState } from "react";
import List from "./List";

import { APPLICATION_DATAGRID_COLS } from "../external/dataGridCols";
import { useEffect } from "react";
import type {} from "redux-thunk/extend-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllApplications,
  selectApplications,
} from "../features/application/applicationSlice";
import { withCandidate, withPosition } from "../HOC";
import PopOverButton from "./PopOverButton";
import { Application } from "../models/Application";
import { ApplicationsProps } from "../external/interfaces";

export const Applications: React.FC<ApplicationsProps> = ({
  candidate,
  position,
}) => {
  const dispatch = useDispatch();
  const applications = useSelector(selectApplications);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  useEffect(() => {
    dispatch(fetchAllApplications());
  }, [dispatch]);

  useEffect(() => {
    // Filter applications based on position and nomination
    let filtered = applications;
    if (position) {
      filtered = filtered.filter((application) => {
        return application.position === position;
      });
    } else if (candidate) {
      filtered = filtered.filter((application) => {
        return application.candidate === candidate;
      });
    }

    setFilteredApplications(filtered);
  }, [applications, candidate, position]);
  return (
    <>
      {position !== undefined ? (
        <PopOverButton name="The Position Details" positionId={position} />
      ) : candidate ? (
        <PopOverButton name="The Candidate Details" candidateId={candidate} />
      ) : (
        "These Are All The Applications"
      )}
      <List
        columns={APPLICATION_DATAGRID_COLS}
        rows={filteredApplications}
        type="application"
      />
    </>
  );
};
export default Applications;
export const withCandidateApplications = withCandidate(Applications);
export const withPositionApplications = withPosition(Applications);
