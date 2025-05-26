import { createSlice } from "@reduxjs/toolkit";

export const parametersSlice = createSlice({
	name: "parameters",
	initialState: {
		resolution: 10,
		resolutionClass: 1,
		mosaicking: "SIMPLE",
		inputBands: 3,
		dataType: "8bit",
		inputSamples: 1,
	},
	reducers: {
		setResolution: (state, action) => {
			state.resolution = action.payload;
		},
		setResolutionClass: (state, action) => {
			state.resolutionClass = action.payload;
		},
		setMosaicking: (state, action) => {
			state.mosaicking = action.payload;
		},
		setInputBands: (state, action) => {
			state.inputBands = action.payload;
		},
		setDataType: (state, action) => {
			state.dataType = action.payload;
		},
		setInputSamples: (state, action) => {
			state.inputSamples = action.payload;
		},
		reset: (state) => {
			state.resolution = 10;
			state.resolutionClass = 1;
			state.mosaicking = "SIMPLE";
			state.inputBands = 3;
			state.dataType = "8bit";
			state.inputSamples = 1;
		},
	},
});
export const {
	setResolution,
	setResolutionClass,
	setMosaicking,
	setInputBands,
	setDataType,
	setInputSamples,
	reset,
} = parametersSlice.actions;

export default parametersSlice.reducer;
