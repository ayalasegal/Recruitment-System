import { GridCellParams, GridColDef} from "@mui/x-data-grid";
import PopOverButton from "../components/PopOverButton";
import TestScore from "../components/TestScore";
import BooleanSign from "../components/BooleanSign";
import { COGNITIVE_TEST_PASS, PERSONALITY_TEST_PASS, TOTAL_SCORE } from "./constant";
import {RatingComponent} from "../components/Rating";
import { NavigateToApplicationsButton } from "../components/NavigateToApplications";
import { PositionFormWithDialog } from "../components/forms/PositionForm";
import { ToolTipCell } from "../components/ToolTipCell";

export const POSITION_DATAGRID_COLS:GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.9,
      renderCell: (params: GridCellParams<any, string, string, any>) => {
        return (
          <ToolTipCell title={params.value!}/>
        );
      }      ,align: 'center' 

    } ,
    { field: 'location', headerName: 'Location', flex:0.7, renderCell: (params: GridCellParams<any, string, string, any>) => {
      return (
        <ToolTipCell title={params.value!}/>
        );
    }      ,align: 'center' 
  },
    { field: 'date', headerName: 'Date',  type: 'date',    editable: true, flex:0.7,    valueGetter: (params:any) => {
        return new Date(params.value);
      }},
    { field: 'companyDescription', headerName: 'Company Description', flex:1,
    renderCell: (params: GridCellParams<any, string, string, any>) => {
      return (
        <ToolTipCell title={params.value!}/>
      );
    }      ,align: 'center' 
  },
    { field: 'jobDescription', headerName: 'Job Description', flex:1.5      ,align: 'center' ,

    renderCell: (params: GridCellParams<any, string, string, any>) => {
      return (
        <ToolTipCell title={params.value!}/>
      );
  }},
    { field: 'requirements', headerName: 'Requirements', flex:0.8,     renderCell: (params: GridCellParams<string[],any,string[]>) => {
      return (
        <PopOverButton options={params.value} name={params.field}/>
      );
    }
  },
  { field: '_id', headerName: 'Applications', flex:0.7,     renderCell: (params: GridCellParams<any,any,string>) => {

    return (
      <NavigateToApplicationsButton positionId={params.value}/>
    );
  }
},

{ field:'none',headerName: 'Edit', flex:1,     renderCell: (params: GridCellParams<any,any,string>) => {

  return (
   <PositionFormWithDialog initialValues={params.row}/>
  );
}
}
  ];
  export const APPLICATION_DATAGRID_COLS:GridColDef[] = [
    {
      field: 'candidate',
      headerName: 'Candidate',
      flex: 0.5,
      renderCell: (params: GridCellParams<any, string>) => (
        <PopOverButton candidateId={params.value!} name="Details"  />
      )
      ,align: 'center' 
     , headerAlign:'center'
    },
    {
      field: 'cognitiveTestScore',
      headerAlign:'center',

      headerName: 'CognitiveScore',
      flex: 0.7,
      renderCell: (params: GridCellParams<any,number|null>) => (
        <>{
        }
        <TestScore number={params.value!} pass={COGNITIVE_TEST_PASS} row={{object:params.row,type:'application',field:params.field}} />
        </>
      ),
      align: 'center'       

    },
    {
      field: 'personalityTestScore',
      headerName: 'PersonalityScore',
      flex: 0.7,
      renderCell: (params: GridCellParams<any,number|null>) => (
        <TestScore number={params.value!} pass={PERSONALITY_TEST_PASS} row={{object:params.row,type:'application',field:params.field}}/>
      )        ,align:'center'
      , headerAlign:'center'

    },
    {
      field: 'hasInterview',
      headerName: 'Interview',
      flex: 0.4,
      renderCell: (params: GridCellParams<any,boolean|null>) => (
        <BooleanSign value={params.value!}  row={{object:params.row,type:'application',field:params.field}}/>
      )      ,align:'center'
      , headerAlign:'center'

    },
    {
      field: 'hasReliabilityTest',
      headerName: 'ReliabilityTest',
      flex: 0.7,
      renderCell: (params: GridCellParams<any,boolean|null>) => (
        <BooleanSign value={params.value!}  row={{object:params.row,type:'application',field:params.field}}/>
      )      ,align:'center'
      , headerAlign:'center'

    },
    {
      field: 'hasTaskPassed',
      headerName: 'Task',
      flex: 0.3,
      renderCell: (params: GridCellParams<any,boolean|null>) => (
        <BooleanSign value={params.value!}  row={{object:params.row,type:'application',field:params.field}}/>
      )      ,align:'center'
      , headerAlign:'center'

    },
    {
      field: 'hasJobOffer',
      headerName: 'JobOffer',
      flex: 0.5,
      renderCell: (params: GridCellParams<any,boolean|null>) => (
        <BooleanSign value={params.value!}  row={{object:params.row,type:'application',field:params.field}}/>
      )      ,align:'center'
      , headerAlign:'center'

    },
    {
      field: 'isEmployed',
      headerName: 'Employed',
      flex: 0.5,
      renderCell: (params: GridCellParams<any,boolean|null>) => (
        <BooleanSign value={params.value!}  row={{object:params.row,type:'application',field:params.field}}/>
      )      ,align:'center'
      , headerAlign:'center'

    },
    {
      field: 'totalScore',
      headerAlign:'center',
      headerName: 'TotalScore',
      flex: 0.7,
      renderCell: (params: GridCellParams<any,number|null>) => (
        <TestScore number={params.value!} pass={TOTAL_SCORE} row={{object:params.row,type:'application',field:params.field}}/>
      ),
      align: 'center'       
    },
    {
      field: 'rating',
      headerAlign:'center',
      headerName: 'Rating',
      flex: 0.7,
      renderCell: (params: GridCellParams<any,number>) => (
        <RatingComponent number={params.value!} row={{object:params.row,type:'application',field:params.field}} />
      ),
      align: 'center'  
    }

  ];





