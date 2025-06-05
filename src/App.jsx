import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AreaBox from "./components/Geo/AreaBox.jsx";
import GeoJSONAreaCalculator from "./components/Geo/GeoJSONAreaCalculator.jsx";
import MapComponent from "./components/Geo/MapComponent.jsx";
import HeaderLogo from "./components/Header.jsx";
import Parameters from "./components/Parameters.jsx";
import PUBox from "./components/Results.jsx";

const App = () => {
    return (
        <div className="App">
            <div id="code-editor-modal" />
            <div className="flex items-center justify-between lg:flex-row flex-co p-4 lg:x-4 bg-blue-500">
                <HeaderLogo />
            </div>

            <div className="grid gap-4 p-4 lg:px-4 grid-cols-2">
                <div className="flex flex-col gap-4">
                    <GeoJSONAreaCalculator />
                    <AreaBox />
                    <Parameters />
                    <PUBox />
                </div>
                <MapComponent />
            </div>
        </div>
    );
};

export default App;
