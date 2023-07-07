import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Position } from '../../models/Position';
import { RootState } from '../../store';
import { createPosition,deletePosition,fetchPositionById,fetchPositions,updatePosition } from '../../api/positionApi';

interface PositionState {
  positions: Position[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PositionState = {
  positions: [],
  isLoading: false,
  error: null,
};

const positionSlice = createSlice({
  name: 'Position',
  initialState,
  reducers: {
    fetchPositionsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPositionsSuccess(state, action: PayloadAction<Position[]>) {
      state.positions = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchPositionsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPositionStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createPositionSuccess(state, action: PayloadAction<Position>) {
      state.positions.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    createPositionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updatePositionStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updatePositionSuccess(state, action: PayloadAction<Position>) {
      const updatedPosition = action.payload;
      const index = state.positions.findIndex(position => position._id === updatedPosition._id);
      if (index !== -1) {
        state.positions[index] = updatedPosition;
      }
      state.isLoading = false;
      state.error = null;
    },
    updatePositionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    deletePositionStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    deletePositionSuccess(state, action: PayloadAction<string>) {
      const positionId = action.payload;
      state.positions = state.positions.filter(position => position._id !== positionId);
      state.isLoading = false;
      state.error = null;
    },
    deletePositionFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPositionsStart,
  fetchPositionsSuccess,
  fetchPositionsFailure,
  createPositionStart,
  createPositionSuccess,
  createPositionFailure,
  updatePositionStart,
  updatePositionSuccess,
  updatePositionFailure,
  deletePositionStart,
  deletePositionSuccess,
  deletePositionFailure,
} = positionSlice.actions;

export const selectPositions = (state: RootState) => state.position.positions;
export const selectPositionsLoading = (state: RootState) => state.position.isLoading;
export const selectPositionsError = (state: RootState) => state.position.error;

export default positionSlice.reducer;

export const fetchAllPositions = () => async (dispatch: any) => {
  try {
    dispatch(fetchPositionsStart());
    const positions = await fetchPositions();
    dispatch(fetchPositionsSuccess(positions));
  } catch (error:any) {
    dispatch(fetchPositionsFailure(error.message));
  }
};

export const createNewPosition = (positionData: any) => async (dispatch: any) => {
  try {
    dispatch(createPositionStart());
    const newPosition = await createPosition(positionData);
    dispatch(createPositionSuccess(newPosition));
  } catch (error:any) {
    dispatch(createPositionFailure(error.message));
  }
};

export const updateExistingPosition = (positionId: string, positionData: Position) => async (dispatch: any) => {
  try {
    dispatch(updatePositionStart());
    const updatedPosition = await updatePosition(positionId, positionData);
    dispatch(updatePositionSuccess(updatedPosition));
  } catch (error:any) {
    dispatch(updatePositionFailure(error.message));
  }
};

export const deleteExistingPosition = (positionId: string) => async (dispatch: any) => {
  try {
    dispatch(deletePositionStart());
    await deletePosition(positionId);
    dispatch(deletePositionSuccess(positionId));
  } catch (error:any) {
    dispatch(deletePositionFailure(error.message));
  }
};
