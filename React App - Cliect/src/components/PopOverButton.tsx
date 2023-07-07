import { Button, Popover, Typography } from "@mui/material";
import React from "react";
import {DetailsCard} from "./DetailsCard";
import { PopOverButtonProps } from "../external/interfaces";

const PopOverButton: React.FC<PopOverButtonProps> = ({ options,candidateId, name ,positionId}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if((!options) || (Array.isArray(options)&&options.length >0))
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderOptions = ():JSX.Element[] | null => {
    if (Array.isArray(options)) {
      // If options is an array of strings
      return options.map((option) => (
        <Typography key={option} sx={{ p: 2 }}>
          {option}
        </Typography>
      ));
    } 

    return null; // Handle other cases or return a default value
  };

  return (
    <>
      <Button onClick={handleClick}>
        {options ? options.length+" "+name : name}
      </Button>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
 {options ? (
          renderOptions()
        ) :positionId? (
          <DetailsCard id={positionId!} type="position"/>
          ):
          <DetailsCard id={candidateId!} type="candidate"/>
        }      </Popover>
    </>
  );
};

export default PopOverButton;
