import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
	name: "results",
	initialState: {
		PUs: 0,
		computeClicked: false,
		resetClicked: false,
	},
	reducers: {
		setPUs: (state, action) => {
			state.PUs = action.payload;
		},
		setResetClicked: (state, action) => {
			state.resetClicked = action.payload;
		},
		setComputeClicked: (state, action) => {
			state.computeClicked = action.payload;
		},
	},
});
export const { setPUs, setResetClicked, setComputeClicked } =
	resultsSlice.actions;

export default resultsSlice.reducer;
