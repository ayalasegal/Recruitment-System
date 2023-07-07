import React from "react";
import { useEffect } from "react";
import type {} from "redux-thunk/extend-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCandidates,
  selectCandidates,
} from "../features/candidate/candidateSlice";
import { DetailsCard } from "./DetailsCard";
import { withPosition } from "../HOC";
export interface CandidateProps {
  position?: string;
}
export const Candidates: React.FC<CandidateProps> = ({ position }) => {
  const dispatch = useDispatch();
  const candidates = useSelector(selectCandidates);
  const getCandidates = (): JSX.Element[] => {
    return candidates.map((candidate) => (
      <DetailsCard id={candidate._id} key={candidate._id} type="candidate" />
    ));
  };

  useEffect(() => {
    dispatch(fetchAllCandidates());
  }, [dispatch]);

  return <>{getCandidates()}</>;
};
export const withPositionCandidate = withPosition(Candidates);
