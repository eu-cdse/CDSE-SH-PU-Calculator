import { useEffect, useRef } from "react";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import AreaSelect from "./AreaSelect";
import DeleteButton from "./DeleteButton";
import { removeFeature } from "../../js/slices/geo";

const MapComponent = () => {
    const dispatch = useDispatch();
    const position = [47.06, 15.44]; // Graz coordinates
    const featureGroupRef = useRef();
    const mapRef = useRef();
    const deleting = useSelector((state) => state.geo.deleting);
    const geoJSONData = useSelector((state) => state.geo.geoJSON);
    useEffect(() => {
        if (!mapRef.current || !featureGroupRef.current) {
            return;
        }
        const currentFeatureGroup = featureGroupRef.current;
        currentFeatureGroup.clearLayers();
        if (geoJSONData.features.length) {
            geoJSONData.features.forEach((feature) => {
                const layer = L.geoJson(feature);
                layer.on("click", (ev) => {
                    if (deleting) {
                        dispatch(
                            removeFeature(ev.layer.feature.properties.name),
                        );
                    }
                });
                layer.addTo(currentFeatureGroup);
            });
            const geoJSONLayer = L.geoJSON(geoJSONData);
            const bounds = geoJSONLayer.getBounds();
            mapRef.current.fitBounds(bounds);
        }
    }, [geoJSONData, deleting]);

    return (
        <div className={deleting ? "deleting" : ""}>
            <MapContainer
                ref={mapRef}
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <AreaSelect />
                <DeleteButton />
                <FeatureGroup ref={featureGroupRef} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
