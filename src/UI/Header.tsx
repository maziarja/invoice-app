import { MdKeyboardArrowDown } from "react-icons/md";
import { HiPlusSm } from "react-icons/hi";
import { NavLink } from "react-router";
import FilterInvoice from "./FilterInvoice";
import { useState } from "react";
function Header({
  numOfInvoices,
  check,
  filter,
}: {
  numOfInvoices: number | undefined;
  // eslint-disable-next-line no-unused-vars
  check: (checked: boolean, filter: "draft" | "pending" | "paid") => void;
  filter: "draft" | "pending" | "paid" | undefined;
}) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <div className="flex h-11 items-center">
      <div>
        <p className="text-heading-m text-color-8 md:text-4xl">Invoices</p>
        <span className="text-body-variant text-color-6 md:hidden">
          {numOfInvoices} invoices
        </span>
        <span className="text-body-variant text-color-6 hidden md:block">
          There are {numOfInvoices} total invoices
        </span>
      </div>
      <div className="ml-auto flex h-full items-center justify-between gap-4.5">
        <div className="relative flex gap-3">
          <div
            onClick={() => setIsOpenFilter((open) => !open)}
            role="button"
            className="flex cursor-pointer items-center gap-3"
          >
            <p className="text-heading-s-variant text-color-8">
              Filter <span className="hidden md:inline">by status</span>
            </p>
            <MdKeyboardArrowDown className="fill-color-1 text-xl" />
          </div>
          {isOpenFilter && <FilterInvoice check={check} filter={filter} />}
        </div>
        <NavLink
          to={"/newInvoice"}
          className="text-heading-s-variant bg-color-1 flex h-full w-22.5 cursor-pointer items-center gap-2 rounded-3xl px-2 text-white md:w-37.5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <HiPlusSm className="fill-color-1 h-5 w-5" />
          </div>
          New <span className="hidden md:inline">Invoice</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
