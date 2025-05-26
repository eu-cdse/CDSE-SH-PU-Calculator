import { useSelector } from "react-redux";

const PUBox = () => {
    const PUs = useSelector((state) => state.results.PUs);
    const computeClicked = useSelector((state) => state.results.computeClicked);
    const reset = useSelector((state) => state.results.resetClicked);

    return (
        <div className="flex bg-gray-500 items-center justify-center p-4">
            <div className="text-center">
                <h2 className="text-lg font-semibold">
                    <span className="mr-1">Total PUs</span>
                </h2>
                {reset ? (
                    <p className="text-xl font-bold">0</p>
                ) : computeClicked ? (
                    PUs === null ? (
                        <p className="text-xl font-bold text-red-500">
                            Error: AOI not set
                        </p>
                    ) : (
                        <p className="text-xl font-bold text-green-200">
                            {Number(PUs).toFixed(2)}
                        </p>
                    )
                ) : (
                    <p className="text-xl font-bold">0</p>
                )}
            </div>
        </div>
    );
};

export default PUBox;
