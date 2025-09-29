import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useDeleteInvoice } from "../features/invoice/useDeleteInvoice";
import { ImSpinner6 } from "react-icons/im";
import { useNavigate } from "react-router";

type DeleteInvoiceModalProps = {
  invoiceId: string;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

function DeleteInvoiceModal({
  invoiceId,
  setIsDeleteModalOpen,
}: DeleteInvoiceModalProps) {
  const ref = useOutsideClick(() => setIsDeleteModalOpen(false));
  const { isPending, deleteInvoice } = useDeleteInvoice();
  const navigate = useNavigate();

  useEffect(() => {
    // on mount
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    // on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  async function handleDeleteInvoice() {
    await deleteInvoice();
    navigate("/");
  }

  return (
    <div className="relative flex justify-center">
      <div className="fixed inset-0 top-18 bg-black/70 backdrop-blur-sm lg:top-0 dark:bg-black/30"></div>
      <div
        ref={ref}
        className="dark:bg-color-3 fixed top-1/2 z-999 mx-6 flex max-w-120 -translate-y-1/2 flex-col rounded-lg bg-white p-8 lg:left-1/2 lg:-translate-x-1/2"
      >
        <p className="text-color-8 mb-2 text-2xl leading-8 font-bold tracking-[-0.5px]">
          Confirm Deletion
        </p>
        <p className="text-color-6 mb-5.5 text-[13px] leading-[22px] font-medium tracking-[-0.1px]">
          Are you sure you want to delete invoice #
          {invoiceId?.slice(-6).toUpperCase()}? This action cannot be undone.
        </p>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="text-heading-s-variant dark:bg-color-4 dark:text-color-5 text-color-7 hover:bg-color-5 cursor-pointer rounded-3xl bg-[#F9FAFE] px-6 py-4.5"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteInvoice}
            className={`text-heading-s-variant hover:bg-color-10 bg-color-9 cursor-pointer rounded-3xl px-6 py-4.5 text-white`}
          >
            {isPending ? (
              <ImSpinner6 className={`${isPending && "animate-spin"}`} />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteInvoiceModal;
