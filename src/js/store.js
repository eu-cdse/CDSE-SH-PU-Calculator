import { configureStore } from "@reduxjs/toolkit";
import parametersSlice from "./slices/parameters";
import geoSlice from "./slices/geo";
import resultsSlice from "./slices/results";

export default configureStore({
    reducer: {
        parameters: parametersSlice,
        geo: geoSlice,
        results: resultsSlice,
    },
});
