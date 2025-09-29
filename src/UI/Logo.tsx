import logo from "/assets/logo.svg";

function Logo() {
  return (
    <div className="bg-color-1 relative flex h-18 w-18 items-center justify-center overflow-hidden rounded-r-[20px] md:h-20 md:w-20 lg:h-26 lg:w-26">
      <img
        src={logo}
        alt="logo"
        className="z-999 md:h-8 md:w-8 lg:h-10 lg:w-10"
      />
      <div className="bg-color-2 absolute top-1/2 h-18 w-18 rounded-tl-[20px] md:h-20 md:w-20 lg:h-26 lg:w-26"></div>
    </div>
  );
}

export default Logo;
