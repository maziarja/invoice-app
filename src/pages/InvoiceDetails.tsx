import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Status from "../UI/Status";
import InvoiceDetailsContainer from "../features/invoice/InvoiceDetailsContainer";
import { useInvoiceStatus } from "../features/invoice/useInvoiceStatus";
import Skeleton from "react-loading-skeleton";
import { useUpdateStatus } from "../features/invoice/useUpdateStatus";
import { useState } from "react";
import DeleteInvoiceModal from "../UI/DeleteInvoiceModal";
import { useDarkMode } from "../contexts/DarkmodeContext";

function InvoiceDetails() {
  const { isLoading, status } = useInvoiceStatus();
  const { updateInvoiceStatus } = useUpdateStatus();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { darkMode } = useDarkMode();

  const navigate = useNavigate();
  async function handleMarkAsPaid() {
    try {
      await updateInvoiceStatus();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Outlet />
      <div className="max-w-182.5 space-y-8 px-6 py-8 md:mx-auto md:w-full md:px-0 lg:space-y-16 lg:pt-19 lg:pb-0">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <MdKeyboardArrowLeft className="text-color-1" />
          <p className="text-heading-s-variant text-color-8">Go back</p>
        </Link>
        <div className="dark:bg-color-3 mb-4 flex items-center justify-between rounded-lg bg-white p-6">
          <div className="flex flex-1 items-center justify-between md:justify-start md:gap-5">
            <p className="text-body-variant text-[#858BB2]">Status</p>
            {!isLoading ? (
              status?.status && <Status status={status?.status} />
            ) : (
              <Skeleton
                width={104}
                height={35}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            )}
          </div>
          <div className="dark:bg-color-3 hidden items-center justify-between gap-2 bg-white md:flex">
            <NavLink
              to={`/${status?.id}/edit`}
              className="text-heading-s-variant text-color-7 hover:bg-color-5 dark:bg-color-4 dark:text-color-5 hover:text-color-7 dark:hover:text-color-7 cursor-pointer rounded-3xl bg-[#F9FAFE] px-6 py-4"
            >
              Edit
            </NavLink>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="text-heading-s-variant hover:bg-color-10 bg-color-9 cursor-pointer rounded-3xl px-6 py-4 text-white"
            >
              Delete
            </button>
            {status?.status === "pending" && (
              <button
                onClick={handleMarkAsPaid}
                className="text-heading-s-variant bg-color-1 hover:bg-color-2 cursor-pointer rounded-3xl px-6 py-4 text-white"
              >
                Mark as Paid
              </button>
            )}
          </div>
        </div>
        <InvoiceDetailsContainer />
      </div>
      <div className="dark:bg-color-3 flex items-center justify-between gap-2 bg-white px-6 py-5.5 md:hidden">
        <NavLink
          to={`/${status?.id}/edit`}
          className="text-heading-s-variant text-color-7 hover:bg-color-5 dark:bg-color-4 dark:text-color-5 dark:hover:text-color-7 cursor-pointer rounded-3xl bg-[#F9FAFE] px-6 py-4.5"
        >
          Edit
        </NavLink>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-heading-s-variant hover:bg-color-10 bg-color-9 cursor-pointer rounded-3xl px-6 py-4.5 text-white"
        >
          Delete
        </button>
        {status?.status === "pending" && (
          <button
            onClick={handleMarkAsPaid}
            className="text-heading-s-variant bg-color-1 hover:bg-color-2 cursor-pointer rounded-3xl px-7 py-4.5 text-white"
          >
            Mark as Paid
          </button>
        )}
      </div>
      {isDeleteModalOpen && status && (
        <DeleteInvoiceModal
          invoiceId={status?.id}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
    </>
  );
}

export default InvoiceDetails;
