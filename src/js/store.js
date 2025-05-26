import { configureStore } from "@reduxjs/toolkit";
import geoSlice from "./slices/geo";
import parametersSlice from "./slices/parameters";
import resultsSlice from "./slices/results";

export default configureStore({
	reducer: {
		parameters: parametersSlice,
		geo: geoSlice,
		results: resultsSlice,
	},
});
