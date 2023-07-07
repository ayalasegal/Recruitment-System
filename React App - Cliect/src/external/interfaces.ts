import { GridColDef } from "@mui/x-data-grid";
import { Application } from "../models/Application";
import { Candidate } from "../models/Candidate";
import { Position } from "../models/Position";

export interface RowDetails{
    object:Candidate|Position|Application,
    type:string,
    field:string
}

export interface BooleanSignProps {
    value: boolean | null;
    row: RowDetails;
  }

  export interface TestScoreProps {
    number: number | null;
    pass: number;
    row: RowDetails;
  }

  export interface RatingProps{
    number:number
    row:RowDetails
}

export interface DetailsCardProps{
    id:string
    type:string
}

export interface PopOverButtonProps{
    options?:string[],
    candidateId?:string
    positionId?:string
    name:string
}

export interface ToolTipCellProps{
    title:string
}

export interface ListProps{
    columns: GridColDef[];
    rows:Position[] | Application[]
    type:string
} 

export interface DialogProps {
    initialValues?:any
}

export interface ApplicationsProps{
    position?:string;
    candidate?:string;
}

export interface NavigateToApplicationsProps{
    positionId:string
}

export interface PositionFormData {
    _id?:string;
  name: string;
  location: string;
  date: Date | string;
  companyDescription: string;
  jobDescription: string;
  requirements: string[];
}

export interface PositionFormProps {
    initialValues?: PositionFormData;
    onClose?:()=>{}
}

export interface FormProps {
    object?: Candidate | Application | Position;
    type: string;
}

export interface WithIdProps {
    id: string;
  }
  
  export interface WithCandidateProps {
    candidate: string;
  }
  
  export interface WithPositionProps {
    position: string;
  }