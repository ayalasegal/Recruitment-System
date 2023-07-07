import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Application } from '../../models/Application';
import { RootState } from '../../store';
import { fetchApplications, createApplication, updateApplication, deleteApplication } from '../../api/applicationApi';
interface ApplicationState {
  applications: Application[];
  isLoading: boolean;
  updatedApplications:Application[]
  error: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  updatedApplications:[],
  isLoading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: 'Application',
  initialState,
  reducers: {
    fetchApplicationsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchApplicationsSuccess(state, action: PayloadAction<Application[]>) {
      state.applications = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchApplicationsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addUpdatedApplication (state, action: PayloadAction<{application: Application, field:string}>){
      const { payload } = action;
      const existingIndex = state.updatedApplications.findIndex((a: Application) => a._id === payload.application._id);
      console.log(existingIndex)
      if (existingIndex !== -1) {
        const existingApplication = state.updatedApplications[existingIndex];
        const updatedField: keyof Application = action.payload.field as keyof Application;
        console.log(updatedField,"here")
        const updatedApplication = {
          ...existingApplication,
          [updatedField]: payload.application[updatedField],
        };
    
        state.updatedApplications[existingIndex] = updatedApplication;
      } else {
        state.updatedApplications.push(payload.application);
      }
    },
    
   
    createApplicationStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createApplicationSuccess(state, action: PayloadAction<Application>) {
      state.applications.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    createApplicationFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateApplicationStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateApplicationSuccess(state, action: PayloadAction<Application>) {
      const updatedApplication = action.payload;
      const index = state.applications.findIndex((application) => application._id === updatedApplication._id);
      if (index !== -1) {
        state.applications[index] = updatedApplication;
        state.updatedApplications.push(updatedApplication); // Add the updated application to the updatedApplications array
      }
      state.isLoading = false;
      state.error = null;
    }
,    
    updateApplicationFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteApplicationStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    deleteApplicationSuccess(state, action: PayloadAction<string>) {
      const applicationId = action.payload;
      state.applications = state.applications.filter(Application => Application._id !== applicationId);
      state.isLoading = false;
      state.error = null;
    },
    deleteApplicationFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearUpdatedApplications(state) {
      state.updatedApplications = [];
    },
    saveAllChangesSuccess(state){
      fetchAllApplications()
      state.updatedApplications=[]
    }
  },
});

export const {
  fetchApplicationsStart,
  fetchApplicationsSuccess,
  fetchApplicationsFailure,
  createApplicationStart,
  createApplicationSuccess,
  createApplicationFailure,
  updateApplicationStart,
  updateApplicationSuccess,
  updateApplicationFailure,
  deleteApplicationStart,
  deleteApplicationSuccess,
  deleteApplicationFailure,
  clearUpdatedApplications,
  addUpdatedApplication,
  saveAllChangesSuccess
} = applicationSlice.actions;

export const selectApplications = (state: RootState) => state.application.applications;
export const selectApplicationsLoading = (state: RootState) => state.application.isLoading;
export const selectApplicationsError = (state: RootState) => state.application.error;

export default applicationSlice.reducer;

export const fetchAllApplications = () => async (dispatch: any) => {
  try {
    dispatch(fetchApplicationsStart());
    const applications = await fetchApplications();
    dispatch(fetchApplicationsSuccess(applications));
  } catch (error:any) {
    dispatch(fetchApplicationsFailure(error.message));
  }
};

export const createNewApplication = (applicationData: any) => async (dispatch: any) => {
  try {
    dispatch(createApplicationStart());
    console.log(applicationData)
    const newApplication = await createApplication(applicationData);
    dispatch(createApplicationSuccess(newApplication));
  } catch (error:any) {
    dispatch(createApplicationFailure(error.message));
  }
};

export const updateExistingApplication = (applicationId: string, applicationData: any) => async (dispatch: any) => {
  try {
    dispatch(updateApplicationStart());
    const updatedApplication = await updateApplication(applicationId, applicationData);
    dispatch(updateApplicationSuccess(updatedApplication));
  } catch (error:any) {
    dispatch(updateApplicationFailure(error.message));
  }
};

export const deleteExistingApplication = (applicationId: string) => async (dispatch: any) => {
  try {
    dispatch(deleteApplicationStart());
    await deleteApplication(applicationId);
    dispatch(deleteApplicationSuccess(applicationId));
  } catch (error:any) {
    dispatch(deleteApplicationFailure(error.message));
  }
};

export const saveAllChanges = () => async (dispatch: any, getState: any) => {
  try {
    const { updatedApplications } = getState().application;
    
    // Loop through the updated applications and send API requests to update each one
    for (const application of updatedApplications) {
      const { _id, ...updatedData } = application; // Extract the updated data for the application
      // Send API request to update the application
      await updateExistingApplication(_id, updatedData)(dispatch);
    }
    console.log("end of saving")

    // Clear the updatedApplications array after saving all the changes
    dispatch(clearUpdatedApplications());
    dispatch(saveAllChangesSuccess(updatedApplications))
  } catch (error: any) {
    // Handle error
  }
};
