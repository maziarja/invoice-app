import { PiMoonFill, PiSunFill } from "react-icons/pi";
import avatar from "/assets/image-avatar.jpg";
import Logo from "./Logo";
import { useDarkMode } from "../contexts/DarkmodeContext";
import { useEffect } from "react";

function Nav() {
  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <div className="dark:bg-color-3 z-999 flex h-18 items-center bg-[#373B53] md:overflow-hidden lg:h-dvh lg:flex-col lg:items-start lg:rounded-r-[20px]">
      <Logo />
      <div className="ml-auto flex h-full cursor-pointer items-center gap-6 px-6 lg:mt-auto lg:h-auto lg:w-full lg:flex-col lg:justify-end lg:px-0 lg:py-6">
        <button
          className="cursor-pointer"
          onClick={() => setDarkMode((prevState) => !prevState)}
        >
          {!darkMode ? (
            <PiMoonFill className="fill-color-7 h-6 w-6" />
          ) : (
            <PiSunFill className="fill-color-7 h-6 w-6" />
          )}
        </button>
        <div className="h-full w-[1px] bg-[#494e6e] lg:h-[1px] lg:w-full"></div>
        <img
          src={avatar}
          alt="avatar"
          className="h-8 w-8 rounded-full lg:h-10 lg:w-10"
        />
      </div>
    </div>
  );
}

export default Nav;
