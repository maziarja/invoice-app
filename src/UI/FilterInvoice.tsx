import { useState } from "react";

function FilterInvoice({
  check,
  filter,
}: {
  // eslint-disable-next-line no-unused-vars
  check: (checked: boolean, filter: "draft" | "pending" | "paid") => void;
  filter: "draft" | "pending" | "paid" | undefined;
}) {
  const [checked, setChecked] = useState(filter);
  return (
    <div className="dark:bg-color-4 absolute top-8 right-0 flex flex-col gap-[15px] rounded-lg bg-white p-6 drop-shadow-2xl md:top-10 md:-right-5 md:w-[150%]">
      <label
        className="text-heading-s-variant text-color-8 flex cursor-pointer items-center gap-3.5"
        htmlFor="draft"
      >
        <input
          className="accent-color-1 h-3.5 w-3.5 cursor-pointer"
          id="draft"
          type="checkbox"
          checked={checked === "draft" ? true : false}
          onChange={(e) => {
            check(e.target.checked, "draft");
            setChecked(e.target.checked ? "draft" : undefined);
          }}
        />
        Draft
      </label>
      <label
        className="text-heading-s-variant text-color-8 flex cursor-pointer items-center gap-3.5"
        htmlFor="pending"
      >
        <input
          className="accent-color-1 h-3.5 w-3.5 cursor-pointer"
          id="pending"
          type="checkbox"
          checked={checked === "pending" ? true : false}
          onChange={(e) => {
            check(e.target.checked, "pending");
            setChecked(e.target.checked ? "pending" : undefined);
          }}
        />
        Pending
      </label>
      <label
        className="text-heading-s-variant text-color-8 flex cursor-pointer items-center gap-3.5"
        htmlFor="paid"
      >
        <input
          className="accent-color-1 h-3.5 w-3.5 cursor-pointer"
          id="paid"
          type="checkbox"
          checked={checked === "paid" ? true : false}
          onChange={(e) => {
            check(e.target.checked, "paid");
            setChecked(e.target.checked ? "paid" : undefined);
          }}
        />
        Paid
      </label>
    </div>
  );
}

export default FilterInvoice;
