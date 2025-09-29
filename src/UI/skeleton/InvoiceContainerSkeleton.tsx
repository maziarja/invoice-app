import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDarkMode } from "../../contexts/DarkmodeContext";

function InvoiceContainerSkeleton() {
  const { darkMode } = useDarkMode();
  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100dvh-180px)] lg:overflow-y-scroll">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
        <div
          key={i}
          className="dark:bg-color-3 flex flex-col gap-6 rounded-lg bg-white p-5.5 md:flex-row md:items-center md:justify-between md:gap-20"
        >
          <div className="flex items-center justify-between md:flex-1 md:gap-7">
            <Skeleton
              height={10}
              width={63}
              baseColor={darkMode ? "#888eb0" : ""}
              highlightColor={darkMode ? "#888eb0" : ""}
            />

            <Skeleton
              height={10}
              width={90}
              baseColor={darkMode ? "#888eb0" : ""}
              highlightColor={darkMode ? "#888eb0" : ""}
            />
          </div>
          <div className="md:flex md:flex-1/4 md:justify-between">
            <div className="flex items-center justify-between md:flex-1 md:gap-15">
              <div className="flex flex-col gap-2 md:flex-1 md:flex-row md:items-center md:justify-between">
                <Skeleton
                  height={10}
                  width={64}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />

                <Skeleton
                  height={10}
                  width={90}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />
              </div>
              <Skeleton
                height={10}
                width={105}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvoiceContainerSkeleton;
