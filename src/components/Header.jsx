const Header = () => {
    return (
        <div className="flex justify-center lg:flex-row flex-co px-4 py-3 lg:x-4 bg-blue-500">
            <div className="flex items-center w-full 2xl:w-420 ps-4 2xl:ps-8">
                <img
                    src={"./logonew.svg"}
                    className="sm:w-60 w-48 h-auto "
                    alt="logo"
                />
                <h1 className="heading-primary ml-8 mt-3 text-2xl sm:text-3xl">
                    <i className="text-white cursor-default"> PU Calculator</i>
                </h1>
            </div>
        </div>
    );
};

export default Header;
