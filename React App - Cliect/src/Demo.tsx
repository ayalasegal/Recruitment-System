import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pagination, TextField } from '@mui/material';
import { DataGrid, GridFooterContainer, useGridApiContext } from '@mui/x-data-grid';
import { useState } from 'react';

export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}
export const CustomFooter = () => {
  const gridApi = useGridApiContext();
  const [rowCount, setRowCount] = useState(gridApi.current?.getRowsCount() || 0);

  const handleRowCountChange = (event:any) => {
    const newRowCount = parseInt(event.target.value, 10);
    console.log(newRowCount)
    newRowCount <= 100&&setRowCount(newRowCount);
    newRowCount <= 100&&gridApi.current?.setPageSize(newRowCount);
  };

  return (
    <GridFooterContainer>
      <PaginationC />
      <TextField
        type="number"
        label="Rows per page"
        value={rowCount}
        onChange={handleRowCountChange}
        style={{ marginLeft: 'auto' }}
      />
    </GridFooterContainer>
  );
};

export default function CustomPaginationGrid() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age', width: 100 },
  ];

  const rows = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Michael Johnson', age: 40 },
    { id: 4, name: 'Emily Davis', age: 28 },
    { id: 5, name: 'Robert Wilson', age: 35 },
    { id: 6, name: 'Sarah Anderson', age: 32 },
    { id: 7, name: 'David Thompson', age: 45 },
    { id: 8, name: 'Jessica Brown', age: 27 },
    { id: 9, name: 'Daniel Martinez', age: 33 },
    { id: 10, name: 'Sophia Taylor', age: 29 },
  ];

  return (
    <DataGrid
      slots={{
        footer: CustomFooter,
        columnSortedDescendingIcon: SortedDescendingIcon,
        columnSortedAscendingIcon: SortedAscendingIcon,
      }}
      
      disableColumnMenu
      columns={columns}
      rows={rows}
      sx={{
        '.MuiDataGrid-iconButtonContainer': {
            visibility: 'visible',
          },
          '.MuiDataGrid-sortIcon': {
            opacity: 'inherit !important',
          },
      }}
      // Additional configuration options for the DataGrid
    />
  );
}

export const IconArrow = () => {
  return (
    <div
      style={{
        borderRadius: '300px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0',
        width: '42px',
        height: '42px',
      }}
    >
      {<ArrowBackIosOutlinedIcon />}
    </div>
  );
}

export const PaginationC = () => {
  return (
    <>
      <Pagination
        count={10}
        color="primary"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Aligns pagination to the left
        }}
      />
    </>
  );
}
