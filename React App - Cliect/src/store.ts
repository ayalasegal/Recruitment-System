import { combineReducers } from "@reduxjs/toolkit";
import positionReducer from "./features/position/positionSlice";
import candidateReducer from "./features/candidate/candidateSlice";
import applicationReducer from "./features/application/applicationSlice";

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const rootReducer = combineReducers({
  position: positionReducer,
  candidate: candidateReducer,
  application: applicationReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
