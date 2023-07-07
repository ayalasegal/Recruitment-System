import {  useTheme } from "@mui/material"
import React from "react"
export interface EmptySignProps {
    onClick?: () => void;
  }
  
  const EmptySign: React.FC<EmptySignProps> = ({ onClick }) => {
    const theme = useTheme();

    return (
 <div style={{color:theme.palette.info.main}}>-</div>)
}
export default EmptySign