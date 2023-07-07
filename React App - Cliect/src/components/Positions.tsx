import React from "react";
import List from "./List";
import { POSITION_DATAGRID_COLS } from "../external/dataGridCols";
import { useEffect } from "react";
import type {} from "redux-thunk/extend-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPositions,
  selectPositions,
} from "../features/position/positionSlice";
import { PositionFormWithDialog } from "./forms/PositionForm";
import { Position } from "../models/Position";
const Positions = () => {
  const dispatch = useDispatch();
  const positions = useSelector(selectPositions);
  useEffect(() => {
    dispatch(fetchAllPositions());
  }, [dispatch]);
  return (
    <>
      <List
        columns={POSITION_DATAGRID_COLS}
        rows={positions as Position[]}
        type="position"
      />
      <PositionFormWithDialog />
    </>
  );
};

export default Positions;
