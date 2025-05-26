import { useRef, useEffect } from "react";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AreaSelect from "./AreaSelect";
import { useSelector } from "react-redux";

const MapComponent = ({}) => {
    const position = [47.06, 15.44]; // Graz coordinates
    const featureGroupRef = useRef();
    const mapRef = useRef();
    const geoJSONData = useSelector((state) => state.geo.geoJSON);

    useEffect(() => {
        if (!mapRef.current || !featureGroupRef.current) {
            return;
        }
        const currentFeatureGroup = featureGroupRef.current;
        currentFeatureGroup.clearLayers();
        if (geoJSONData.features.length) {
            const geoJSONLayer =
                L.geoJSON(geoJSONData).addTo(currentFeatureGroup);
            const bounds = geoJSONLayer.getBounds();
            mapRef.current.fitBounds(bounds);
        }
    }, [geoJSONData, featureGroupRef, mapRef]);

    return (
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
            <FeatureGroup ref={featureGroupRef}></FeatureGroup>
        </MapContainer>
    );
};

export default MapComponent;
