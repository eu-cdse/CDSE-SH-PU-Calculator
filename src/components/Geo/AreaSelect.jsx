import { DrawAreaSelection } from "@bopen/leaflet-area-selection";
import { useMap } from "react-leaflet";
import "@bopen/leaflet-area-selection/dist/index.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFeature } from "../../js/slices/geo";
const AreaSelect = () => {
	const dispatch = useDispatch();
	const map = useMap();
	useEffect(() => {
		const areaSelection = new DrawAreaSelection({
			onButtonDeactivate: (polygon) => {
				dispatch(addFeature(polygon.toGeoJSON()));
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
