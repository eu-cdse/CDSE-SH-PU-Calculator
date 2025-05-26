import { createSlice } from "@reduxjs/toolkit";

export const geoSlice = createSlice({
    name: "geo",
    initialState: {
        area: 0,
        geoJSON: { type: "FeatureCollection", features: [] },
    },
    reducers: {
        setArea: (state, action) => {
            state.area = action.payload;
        },
        setGeoJSON: (state, action) => {
            state.geoJSON = action.payload;
        },
        clearGeoJSON: (state, action) => {
            state.geoJSON = { type: "FeatureCollection", features: [] };
        },
        addFeature: (state, action) => {
            state.geoJSON.features = state.geoJSON.features.concat(
                action.payload,
            );
        },
    },
});
export const { setArea, addFeature, setGeoJSON, clearGeoJSON } =
    geoSlice.actions;

export default geoSlice.reducer;
