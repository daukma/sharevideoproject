import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ILoadingReducer {
  status: boolean;
}
const initialState: ILoadingReducer = {
  status: true,
};
export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.status = true;
    },
    finishLoading: (state) => {
      state.status = false;
    },
  },
});

export const {startLoading,finishLoading} = LoadingSlice.actions;
export const SelectLoading = (state: RootState) => state.loading.status;

export default LoadingSlice.reducer;