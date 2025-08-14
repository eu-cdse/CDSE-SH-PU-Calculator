import { useDispatch, useSelector } from "react-redux";
import { calculateAutoDimensions } from "../js/functions/geoCalculations";
import { totalPuContribution } from "../js/functions/puContributors";
import {
    reset,
    setDataType,
    setInputBands,
    setInputSamples,
    setMosaicking,
    setResolution,
    setResolutionClass,
} from "../js/slices/parameters";
import {
    setComputeClicked,
    setPUs,
    setResetClicked,
} from "../js/slices/results";

const Parameters = () => {
    const dispatch = useDispatch();
    const geoJSONData = useSelector((state) => state.geo.geoJSON);
    const resolution = useSelector((state) => state.parameters.resolution);
    const resolutionClass = useSelector(
        (state) => state.parameters.resolutionClass,
    );
    const mosaicking = useSelector((state) => state.parameters.mosaicking);
    const inputBands = useSelector((state) => state.parameters.inputBands);
    const dataType = useSelector((state) => state.parameters.dataType);
    const inputSamples = useSelector((state) => state.parameters.inputSamples);
    const handleMosaickingChange = (e) => {
        dispatch(setMosaicking(e.target.value));
        if (e.target.value === "SIMPLE") {
            dispatch(setInputSamples(1));
        }
    };
    const handleInputBandsChange = (e) =>
        dispatch(setInputBands(e.target.value));
    const handleDataTypeChange = (e) => dispatch(setDataType(e.target.value));
    const handleInputSamplesChange = (e) => {
        dispatch(setInputSamples(e.target.value));
    };

    const resolutionMapping = {
        S1HIW: { value: 10, text: "Sentinel-1 HIGH IW/SM - 10 m" },
        S1HEW: { value: 25, text: "Sentinel-1 HIGH EW - 25 m" },
        S1M: { value: 40, text: "Sentinel-1 MEDIUM - 40 m" },
        S210: { value: 10, text: "Sentinel-2: 10 m" },
        S3OLCIL1B: { value: 300, text: "Sentinel-3 OLCI L1B - 300 m" },
        S3OLCIL2: { value: 300, text: "Sentinel-3 OLCI L2 - 300 m" },
        S3SLSTRL1B: { value: 500, text: "Sentinel-3 SLSTR1B L1B - 500 m" },
        S5: { value: 7000, text: "Sentinel-5P - 7 km" },
        DEM: { value: 30, text: "Digital Elevation Model - 30 m" },
        OTHER: { value: 1, text: "Other" },
    };
    const handleResolutionClassChange = (e) => {
        const key = e.target.value;
        dispatch(setResolutionClass(key));
        dispatch(setResolution(resolutionMapping[key].value));
    };
    const handleResolutionChange = (e) => {
        const value = e.target.value;
        dispatch(setResolution(value));
    };

    const handleComputePUs = () => {
        if (
            !geoJSONData ||
            !geoJSONData.features ||
            geoJSONData.features.length === 0
        ) {
            dispatch(setPUs(0));
            dispatch(setComputeClicked(true));
            dispatch(setResetClicked(false));
            return;
        }
        // Get height and width from geoJSONData
        const [height, width] = calculateAutoDimensions(
            geoJSONData,
            resolution,
        );
        const result = totalPuContribution(
            height,
            width,
            inputBands,
            dataType,
            inputSamples,
        );
        dispatch(setPUs(result));
        dispatch(setComputeClicked(true));
        dispatch(setResetClicked(false));
    };

    const handleReset = () => {
        dispatch(reset());
        dispatch(setPUs(0));
        dispatch(setComputeClicked(false));
        dispatch(setResetClicked(true));
    };

    return (
        <div className="flex bg-gray-500 min-h overflow-y-auto items-center p-4 ">
            <div className="flex flex-col items-start w-full">
                <h2 className="text-lg font-bold mb-4">Request Parameters</h2>
                <div className="mb-4">
                    <label>
                        <a
                            href="https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Evalscript/V3.html#mosaicking"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Mosaicking
                        </a>{" "}
                        method:
                    </label>
                    <select
                        name="mosaick"
                        value={mosaicking}
                        onChange={handleMosaickingChange}
                        className="block mt-1 py-2 px-2 border bg-white text-sm text-black"
                    >
                        <option value="SIMPLE">SIMPLE</option>
                        <option value="ORBIT">ORBIT</option>
                        <option value="TILE">TILE</option>
                    </select>
                </div>
                {mosaicking === "ORBIT" || mosaicking === "TILE" ? (
                    <div className="mb-4">
                        <label>
                            Number of{" "}
                            <a
                                href="https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Evalscript/V3.html#samples"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-shgreen"
                            >
                                input samples
                            </a>{" "}
                            (images):
                        </label>
                        <input
                            name="number"
                            type="number"
                            value={inputSamples}
                            onChange={handleInputSamplesChange}
                            className="block mt-1 p-2 border bg-white text-sm text-black"
                        />
                    </div>
                ) : null}
                <div className="mb-4">
                    <label>Resolution (m):</label>
                    <select
                        name="resolution"
                        value={resolutionClass}
                        onChange={handleResolutionClassChange}
                        className="block mt-1 p-2 border text-sm text-black bg-white"
                    >
                        {Object.keys(resolutionMapping).map((optionKey) => {
                            const option = resolutionMapping[optionKey].text;
                            return (
                                <option value={optionKey} key={option}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>
                </div>
                {resolutionClass === "OTHER" ? (
                    <div className="mb-4">
                        <label>Custom Resolution (m):</label>
                        <input
                            name="custom"
                            type="number"
                            value={resolution}
                            onChange={handleResolutionChange}
                            className="block mt-1 p-2 border bg-white text-sm text-black"
                        />
                    </div>
                ) : null}
                <div className="mb-4">
                    <label>
                        Number of{" "}
                        <a
                            href="https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Evalscript/V3.html#input-object-properties"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-shgreen"
                        >
                            Input Bands
                        </a>{" "}
                        in the Evalscript:
                    </label>
                    <input
                        name="bands"
                        type="number"
                        value={inputBands}
                        onChange={handleInputBandsChange}
                        className="block mt-1 p-2 border bg-white text-sm text-black"
                    />
                </div>
                <div className="mb-4">
                    <label>
                        <a
                            href="https://documentation.dataspace.copernicus.eu/APIs/SentinelHub/Evalscript/V3.html#sampletype"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-shgreen"
                        >
                            SampleType
                        </a>{" "}
                        returned by the Evalscript:
                    </label>
                    <select
                        name="bit"
                        value={dataType}
                        onChange={handleDataTypeChange}
                        className="block mt-1 p-2 border bg-white text-sm text-black"
                    >
                        <option value="8bit">8bit</option>
                        <option value="16bit">16bit</option>
                        <option value="32bit">32bit</option>
                    </select>
                </div>
                <div className="flex justify-center w-full gap-4">
                    <button
                        type="button"
                        className="bg-green-500 ml-aut py-2 px-4 text-black font-bold"
                        onClick={handleComputePUs}
                    >
                        Compute PUs
                    </button>
                    <button
                        type="button"
                        className="bg-white border-green-500 border py-2 px-4 text-gray-900"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Parameters;
