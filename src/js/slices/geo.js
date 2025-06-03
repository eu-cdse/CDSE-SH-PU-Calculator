import { createSlice } from "@reduxjs/toolkit";

export const geoSlice = createSlice({
    name: "geo",
    initialState: {
        area: 0,
        geoJSON: { type: "FeatureCollection", features: [] },
        deleting: false,
    },
    reducers: {
        setArea: (state, action) => {
            state.area = action.payload;
        },
        setGeoJSON: (state, action) => {
            state.geoJSON = action.payload;
        },
        clearGeoJSON: (state) => {
            state.geoJSON = { type: "FeatureCollection", features: [] };
        },
        addFeature: (state, action) => {
            state.geoJSON.features = state.geoJSON.features.concat(
                action.payload,
            );
        },
        removeFeature: (state, action) => {
            state.geoJSON.features = state.geoJSON.features.filter(
                (feature) => feature.properties.name !== action.payload,
            );
        },
        toggleDeleting: (state) => {
            state.deleting = !state.deleting;
        },
    },
});
export const {
    setArea,
    addFeature,
    setGeoJSON,
    clearGeoJSON,
    toggleDeleting,
    removeFeature,
} = geoSlice.actions;

export default geoSlice.reducer;
