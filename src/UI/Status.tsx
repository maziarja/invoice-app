import { GoDotFill } from "react-icons/go";

type StatusProps = {
  status: string;
};

function Status({ status }: StatusProps) {
  return (
    <div
      className={`flex h-10 w-26 items-center justify-center gap-2 rounded-[6px] ${status === "pending" && "bg-[#FF8F00]/7"} ${status === "paid" && "bg-[#33d69f]/7"} ${
        status === "draft" && "dark:bg-color-5/6 bg-[#373B53]/7"
      }`}
    >
      <GoDotFill
        className={`${status === "pending" && "fill-[#FF8F00]"} ${status === "paid" && "fill-[#33d69f]"} ${status === "draft" && "dark:fill-color-5 fill-[#373B53]"}`}
      />
      <p
        className={`${status === "pending" && "text-[#FF8F00]"} ${status === "paid" && "text-[#33d69f]"} ${status === "draft" && "dark:text-color-5 text-[#373B53]"} text-heading-s-variant`}
      >
        {`${status?.charAt(0).toUpperCase()}${status?.slice(1)}`}
      </p>
    </div>
  );
}

export default Status;
