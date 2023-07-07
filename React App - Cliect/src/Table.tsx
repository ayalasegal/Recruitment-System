import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SxProps, Theme } from "@mui/material"
export interface ListProps<T>{
    columns: GridColDef[];
    rows:Array<T>,
    sx?:SxProps<Theme> 
} 
const List= <T extends object>({ columns, rows,sx }:ListProps<T>) => {
  return (
    <>
        <DataGrid
          rows={rows}
          autoHeight
          pageSizeOptions={[3, 2, 5]}
          columns={columns}
          getRowId={(row) => row._id}
          sx={sx}
        />
    </>
  );
};

export default List;
