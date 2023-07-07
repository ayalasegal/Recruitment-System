import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  fetchAllApplications,
  selectApplications,
} from "../features/application/applicationSlice";
import { NavigateToApplicationsProps } from "../external/interfaces";

export const NavigateToApplicationsButton: React.FC<
  NavigateToApplicationsProps
> = ({ positionId }) => {
  const applications = useSelector(selectApplications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllApplications());
  }, [dispatch]);
  const handleClick = () => {
    if (applications.filter((a) => a.position === positionId).length > 0)
      navigate(`/position/${positionId}/applications`);
  };
  return (
    <>
      <Button onClick={handleClick}>
        {applications.filter((a) => a.position === positionId).length}{" "}
        Applications
      </Button>
    </>
  );
};
