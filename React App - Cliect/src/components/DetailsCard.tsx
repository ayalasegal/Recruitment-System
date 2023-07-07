import React, { useEffect, useState } from "react";
import { getCandidateById } from "../api/candidateApi";
import { getPositionById } from "../api/positionApi";
import { Candidate } from "../models/Candidate";
import { withId } from "../HOC";
import { Position } from "../models/Position";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import PopOverButton from "./PopOverButton";
import { DetailsCardProps } from "../external/interfaces";

export const DetailsCard: React.FC<DetailsCardProps> = ({ id, type }) => {
  const theme = useTheme();
  const [candidate, setCandidate] = useState<Candidate>();
  const [position, setPosition] = useState<Position>();

  const fetch = async () => {
    try {
      if (type === "candidate") {
        const fetchedCandidate = await getCandidateById(id);
        setCandidate(fetchedCandidate);
      } else {
        const fetchedPosition = await getPositionById(id);
        setPosition(fetchedPosition);
      }
    } catch (error) {
      console.log(`Error fetching ${type}:`, error);
    }
  };
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidate, position]);

  if (!candidate && !position) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        border: `5px solid ${theme.palette.primary.main}`,
        display: "inline-block",
        margin: "1rem",
      }}
    >
      <CardContent
        style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
      >
        {type === "candidate" ? (
          <>
            <Typography variant="h3" component="div">
              {candidate!.firstName + " " + candidate!.lastName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <div>{candidate!.emailAddress}</div>
              {candidate!.phoneNumber}
            </Typography>

            <Typography
              sx={{ fontSize: 10 }}
              color="text.secondary"
              gutterBottom
            >
              {"id : " + candidate!._id}
            </Typography>
          </>
        ) : (
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Typography variant="h3" component="div">
              {"Position: " + position?.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <div>{position?.jobDescription}</div>
              {"Company: " + position?.companyDescription}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"Location: " + position?.location}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"Date fullfilled: " + position?.date}
            </Typography>
            <PopOverButton
              name="Requirments"
              options={position?.requirements}
            />
            <Typography
              sx={{ fontSize: 10 }}
              color="text.secondary"
              gutterBottom
            >
              {"id : " + position!._id}
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default withId(DetailsCard);
