import { DrawAreaSelection } from "@bopen/leaflet-area-selection";
import { useMap } from "react-leaflet";
import "@bopen/leaflet-area-selection/dist/index.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setArea, setGeoJSON } from "../../js/slices/geo";
import { computeArea } from "../../js/functions/geoCalculations";
const AreaSelect = () => {
    const dispatch = useDispatch();
    const map = useMap();
    useEffect(() => {
        const areaSelection = new DrawAreaSelection({
            onPolygonReady: (polygon, areaSelection) => {
                if (!polygon) return;
                const feature = polygon.toGeoJSON();
                const newTotalArea = computeArea(feature);
                dispatch(setArea(newTotalArea));
                dispatch(
                    setGeoJSON({
                        type: "FeatureCollection",
                        features: [feature],
                    }),
                );
                areaSelection.deactivate();
            },
        });
        map.addControl(areaSelection);
        return () => {
            map.removeControl(areaSelection);
        };
    }, [map, dispatch]);
    return null;
};
export default AreaSelect;
