import React from 'react';
// import { convertObjectToToListProps } from './external/functions';
import ApiUsage from './components/ApiUsage';
import {Applications} from './components/Applications';
import { useTheme } from '@mui/material';
import Positions from './components/Positions';
import Form from './components/forms/Form'
import store from './store';
import { Position } from './models/Position';
import CustomPaginationGrid from './Demo';
import CustomColumnMenu from './Demo2';
function App() {
  const theme = useTheme()
  return (<>
  {/* <h1 style={{color:theme.palette.primary.main}}>All Positions</h1> */}
  <h1>{"Welcome to the Recruitment-System"}</h1>
  {/* <h2>Open Positions</h2> */}
  {/* <ApiUsage/> */}
  {/* <Positions/> */}
    {/* <Form type='position'/> */}
<CustomPaginationGrid/>
{/* <CustomColumnMenu/> */}
  </>
  )
}



export default App;
