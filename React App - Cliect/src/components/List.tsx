import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { saveAllChanges } from '../features/application/applicationSlice';
import { ListProps } from "../external/interfaces";

const List: React.FC<ListProps> = ({ columns, rows,type }) => {
  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    dispatch(saveAllChanges());
  };


  return (
    <>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          autoHeight
          pageSizeOptions={[3, 2, 5]}
          // columns={columns.map(column => ({
          //   ...column,
          //   renderCell: (params: GridCellParams) =>
          //     // column.renderCell(params, handleCellValueChange),
          // }))}
          columns={columns}
          getRowId={(row) => row._id}
          sx={{
            p: 4,
            fontSize: 16,
            fontFamily: "Belanosima, sans-serif",
            font: "center",
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "info.main",
            },
          }}
        />
      </div>
      {type === 'application'?<Button variant="contained" color="primary" onClick={handleSaveChanges}>
        {"Save Changes"}
      </Button>:''}
    </>
  );
};

export default List;
