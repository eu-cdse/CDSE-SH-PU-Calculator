import AreaBox from "./components/Geo/AreaBox.jsx";
import GeoJSONAreaCalculator from "./components/Geo/GeoJSONAreaCalculator.jsx";
import MapComponent from "./components/Geo/MapComponent.jsx";
import Header from "./components/Header.jsx";
import Parameters from "./components/Parameters.jsx";
import PUBox from "./components/Results.jsx";

const App = () => {
    return (
        <div className="App">
            <Header />
            <div className="grid justify-center">
                <div className="grid gap-4 p-4 lg:px-4 max-lg:grid-rows-2 lg:grid-cols-2 2xl:max-w-420">
                    <div className="flex flex-col gap-4">
                        <GeoJSONAreaCalculator />
                        <AreaBox />
                        <Parameters />
                        <PUBox />
                    </div>
                    <MapComponent />
                </div>
            </div>
        </div>
    );
};

export default App;
