import { DrawAreaSelection } from "@bopen/leaflet-area-selection";
import { useMap } from "react-leaflet";
import "@bopen/leaflet-area-selection/dist/index.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeature } from "../../js/slices/geo";
import { v4 as uuid } from "uuid";
const AreaSelect = () => {
    const dispatch = useDispatch();
    const map = useMap();
    useEffect(() => {
        const areaSelection = new DrawAreaSelection({
            onButtonDeactivate: (polygon) => {
                if (!polygon) return;
                const feature = polygon.toGeoJSON();
                const featureWithId = {
                    ...feature,
                    properties: { ...feature.properties, name: uuid() },
                };
                dispatch(addFeature(featureWithId));
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
