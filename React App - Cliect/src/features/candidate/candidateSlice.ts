import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Candidate } from '../../models/Candidate';
import { RootState } from '../../store';
import { fetchCandidates, createCandidate, updateCandidate, deleteCandidate } from '../../api/candidateApi';

interface CandidateState {
  candidates: Candidate[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  candidates: [],
  isLoading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    fetchCandidatesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchCandidatesSuccess(state, action: PayloadAction<Candidate[]>) {
      state.candidates = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchCandidatesFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCandidateStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createCandidateSuccess(state, action: PayloadAction<Candidate>) {
      state.candidates.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    createCandidateFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCandidateStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateCandidateSuccess(state, action: PayloadAction<Candidate>) {
      const updatedCandidate = action.payload;
      const index = state.candidates.findIndex(candidate => candidate._id === updatedCandidate._id);
      if (index !== -1) {
        state.candidates[index] = updatedCandidate;
      }
      state.isLoading = false;
      state.error = null;
    },
    updateCandidateFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCandidateStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    deleteCandidateSuccess(state, action: PayloadAction<string>) {
      const candidateId = action.payload;
      state.candidates = state.candidates.filter(candidate => candidate._id !== candidateId);
      state.isLoading = false;
      state.error = null;
    },
    deleteCandidateFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCandidatesStart,
  fetchCandidatesSuccess,
  fetchCandidatesFailure,
  createCandidateStart,
  createCandidateSuccess,
  createCandidateFailure,
  updateCandidateStart,
  updateCandidateSuccess,
  updateCandidateFailure,
  deleteCandidateStart,
  deleteCandidateSuccess,
  deleteCandidateFailure,
} = candidateSlice.actions;

export const selectCandidates = (state: RootState) => state.candidate.candidates;
export const selectCandidatesLoading = (state: RootState) => state.candidate.isLoading;
export const selectCandidatesError = (state: RootState) => state.candidate.error;

export default candidateSlice.reducer;

export const fetchAllCandidates = () => async (dispatch: any) => {
  try {
    dispatch(fetchCandidatesStart());
    const candidates = await fetchCandidates();
    dispatch(fetchCandidatesSuccess(candidates));
  } catch (error:any) {
    dispatch(fetchCandidatesFailure(error.message));
  }
};

export const createNewCandidate = (candidateData: any) => async (dispatch: any) => {
  try {
    dispatch(createCandidateStart());
    const newCandidate = await createCandidate(candidateData);
    dispatch(createCandidateSuccess(newCandidate));
  } catch (error:any) {
    dispatch(createCandidateFailure(error.message));
  }
};

export const updateExistingCandidate = (candidateId: string, candidateData: any) => async (dispatch: any) => {
  try {
    dispatch(updateCandidateStart());
    const updatedCandidate = await updateCandidate(candidateId, candidateData);
    dispatch(updateCandidateSuccess(updatedCandidate));
  } catch (error:any) {
    dispatch(updateCandidateFailure(error.message));
  }
};

export const deleteExistingCandidate = (candidateId: string) => async (dispatch: any) => {
  try {
    dispatch(deleteCandidateStart());
    await deleteCandidate(candidateId);
    dispatch(deleteCandidateSuccess(candidateId));
  } catch (error:any) {
    dispatch(deleteCandidateFailure(error.message));
  }
};
