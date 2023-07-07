
import { Tooltip } from "@mui/material";
import { ToolTipCellProps } from "../external/interfaces";

export const ToolTipCell:React.FC<ToolTipCellProps>=({title})=>{
    return (
           <Tooltip title={title} arrow placement="bottom">
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {title}             
            </div>
          </Tooltip>
    )
}