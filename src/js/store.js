import { configureStore } from "@reduxjs/toolkit";
import parametersSlice from "./features/parameters";
import geoSlice from "./features/geo";
import resultsSlice from "./features/results";

export default configureStore({
    reducer: {
        parameters: parametersSlice,
        geo: geoSlice,
        results: resultsSlice,
    },
});
