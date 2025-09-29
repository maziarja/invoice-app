import { useEffect, useState, type FormEvent } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { HiCalendar } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";
import { useInvoice } from "../features/invoice/useInvoice";
import EditItemContainer from "../features/items/EditItemContainer";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { format } from "date-fns";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useItem } from "../features/items/useItem";
import { useUpdateInvoice } from "../features/invoice/useUpdateInvoice";

function EditInvoice() {
  const { isLoading, invoice: invoiceObj } = useInvoice();
  const invoice = invoiceObj?.invoice;
  const { items } = useItem();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [paymentTerms, setPaymentTerms] = useState(invoice?.paymentTerms);
  const [openPaymentTerms, setOpenPaymentTerms] = useState(false);
  const [openCalendar, setOpenCalender] = useState(false);
  const calenderRef = useOutsideClick(() => setOpenCalender(false));
  const paymentRef = useOutsideClick(() => setOpenPaymentTerms(false));
  const [editItems, setEditItems] = useState(items ?? []);
  const { updateInvoice } = useUpdateInvoice();
  const [error, setError] = useState("");
  useEffect(() => {
    // on mount
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    // on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (items) setEditItems(items);
    if (invoice) setPaymentTerms(invoice?.paymentTerms);
  }, [items, invoice]);

  useEffect(() => {
    if (editItems.length > 0) setError("");
  }, [editItems.length]);

  const paymentDays = [1, 7, 14, 30];

  function handleAddNewItem() {
    const newItem = {
      id: Math.random(),
      invoiceId: invoice === undefined ? null : invoice.id,
      price: 0,
      quantity: 0,
      name: "",
      total: 0,
      userId: invoice === undefined ? null : invoice.userId,
    };
    setEditItems((items) => [...items, newItem]);
  }

  function handleRemoveItem(id: number) {
    setEditItems((items) => items.filter((item) => item.id !== id));
  }

  function handleEditItem(
    id: number,
    field: "name" | "price" | "quantity" | "total",
    value: string,
  ) {
    setEditItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  }

  const total = editItems.reduce(
    (acc, cur) =>
      cur.price && cur.quantity ? acc + cur.price * cur.quantity : 0,
    0,
  );
  async function handleSubmitEditInvoice(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newInvoice = {
      invoice: {
        clientAddressId: invoice?.clientAddressId as number,
        clientName: formData.get("clientName") as string,
        clientEmail: formData.get("clientEmail") as string,
        createdAt:
          selectedDate?.toISOString() || (invoice?.createdAt as string),
        defaultId: invoice?.defaultId || null,
        description: formData.get("invoiceDescription") as string,
        id: invoice ? invoice.id : "",
        paymentDue: invoice?.paymentDue || null,
        paymentTerms: paymentTerms || null,
        senderAddressId: invoice?.senderAddressId || null,
        status: invoice?.status || null,
        total,
        userId: invoice?.userId || null,
        isDeleted: invoice?.isDeleted || false,
      },
      clientAddress: {
        city: formData.get("clientCity") as string,
        country: formData.get("clientCountry") as string,
        id: invoice?.clientAddressId as number,
        postCode: formData.get("clientPostalCode") as string,
        street: formData.get("clientStreet") as string,
      },
      senderAddress: {
        city: formData.get("senderCity") as string,
        country: formData.get("senderCountry") as string,
        id: invoice?.senderAddressId as number,
        postCode: formData.get("senderPostalCode") as string,
        street: formData.get("senderStreet") as string,
      },
    };

    try {
      if (editItems.length > 0) {
        setError("");
        await updateInvoice({ newInvoice, editItems });
        navigate("/");
      } else {
        setError("-An item must be added");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmitEditInvoice}>
      <div className="fixed inset-0 top-18 bg-black/70 backdrop-blur-sm lg:top-0 lg:left-[103px] dark:bg-black/30"></div>
      <div className="fixed z-99 h-full w-full max-w-154 overflow-y-scroll bg-white px-6 pt-8.5 pb-60 lg:left-[103px] dark:bg-[#0c0e16]">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="mb-6.5 flex items-center gap-2"
        >
          <MdKeyboardArrowLeft className="text-color-1" />
          <p className="text-heading-s-variant text-color-8">Go back</p>
        </button>
        <p className="text-heading-m text-color-8 mb-5.5">
          Edit <span className="text-color-6">#</span>
          {invoice?.defaultId?.slice(-6).toUpperCase()}
        </p>
        <div className="mb-10 space-y-6">
          <p className="text-heading-s-variant text-color-1">Bill From</p>
          <label className="text-body-variant text-color-7 flex flex-col gap-2">
            Street Address
            <input
              type="text"
              id="senderStreet"
              name="senderStreet"
              defaultValue={invoice?.senderAddress?.street || undefined}
              required
              className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
            />
          </label>
          <div className="flex items-center gap-6">
            <label className="text-body-variant text-color-7 flex flex-col gap-2">
              City
              <input
                type="text"
                id="senderCity"
                name="senderCity"
                defaultValue={invoice?.senderAddress?.city || undefined}
                required
                className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
              />
            </label>
            <label className="text-body-variant text-color-7 flex flex-col gap-2">
              Post Code
              <input
                type="text"
                id="senderPostalCode"
                name="senderPostalCode"
                defaultValue={invoice?.senderAddress?.postCode || undefined}
                required
                className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
              />
            </label>
          </div>
          <label className="text-body-variant text-color-7 flex flex-col gap-2">
            Country
            <input
              type="text"
              id="senderCountry"
              name="senderCountry"
              defaultValue={invoice?.senderAddress?.country || undefined}
              required
              className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
            />
          </label>
        </div>
        <div className="mb-10 space-y-6">
          <p className="text-heading-s-variant text-color-1">Bill To</p>
          <label className="text-body-variant text-color-7 flex flex-col gap-2">
            Client's name
            <input
              type="text"
              id="clientName"
              name="clientName"
              defaultValue={invoice?.clientName || undefined}
              required
              className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
            />
          </label>
          <label className="text-body-variant text-color-7 flex flex-col gap-2">
            Client's Email
            <input
              type="text"
              id="clientEmail"
              name="clientEmail"
              defaultValue={invoice?.clientEmail || undefined}
              required
              className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
            />
          </label>
          <label className="text-body-variant text-color-7 flex flex-col gap-2">
            Street Address
            <input
              type="text"
              id="clientStreet"
              name="clientStreet"
              defaultValue={invoice?.clientAddress?.street || undefined}
              required
              className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
            />
          </label>
          <div className="flex items-center gap-6">
            <label className="text-body-variant text-color-7 flex flex-col gap-2">
              City
              <input
                type="text"
                id="clientCity"
                name="clientCity"
                defaultValue={invoice?.clientAddress?.city || undefined}
                required
                className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
              />
            </label>
            <label className="text-body-variant text-color-7 flex flex-col gap-2">
              Post Code
              <input
                type="text"
                id="clientPostalCode"
                name="clientPostalCode"
                defaultValue={invoice?.clientAddress?.postCode || undefined}
                required
                className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
              />
            </label>
          </div>
          <label className="text-body-variant text-color-7 flex flex-col gap-2">
            Country
            <input
              type="text"
              id="clientCountry"
              name="clientCountry"
              defaultValue={invoice?.clientAddress?.country || undefined}
              required
              className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
            />
          </label>
        </div>
        <div className="mb-17 space-y-6">
          <div className="space-y-6 md:flex md:gap-8">
            <label className="text-body-variant text-color-7 relative flex flex-col gap-2 md:flex-1">
              Issue Date
              <p className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0">
                {(selectedDate && format(selectedDate, "dd MMM yyyy")) ||
                  (invoice &&
                    format(new Date(invoice?.createdAt), "dd MMM yyyy"))}
              </p>
              <HiCalendar
                role="button"
                onClick={() => setOpenCalender((open) => !open)}
                className="fill-color-7 absolute top-9.5 right-4 h-5 w-5 cursor-pointer"
              />
              {openCalendar && (
                <div ref={calenderRef}>
                  <DayPicker
                    animate
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    navLayout="around"
                    className="text-color-8 rounded-lg p-4 font-bold shadow-2xl"
                    classNames={{
                      selected: "text-color-1 text-lg",
                      chevron: "fill-color-1 w-4 h-4",
                      today: "",
                    }}
                    onDayClick={() => setOpenCalender(false)}
                  />
                </div>
              )}
            </label>
            <div className="flex flex-col gap-2 md:flex-1">
              <p className="text-body-variant text-color-7"> Payment Terms</p>
              <div
                role="button"
                onClick={() => setOpenPaymentTerms((open) => !open)}
                className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 flex w-full cursor-pointer justify-between rounded-sm border-1 px-5 py-4.5 outline-0"
              >
                {paymentTerms && (
                  <p>{`Net ${paymentTerms} Day${paymentTerms > 1 ? "s" : ""}`}</p>
                )}
                {!openPaymentTerms ? (
                  <FaChevronDown className="fill-color-7 ml-auto h-3.5 w-3.5 cursor-pointer" />
                ) : (
                  <FaChevronUp className="fill-color-7 ml-auto h-3.5 w-3.5 cursor-pointer" />
                )}
              </div>

              {openPaymentTerms && (
                <div
                  ref={paymentRef}
                  className="divide-color-5 divide-y rounded-xl bg-white drop-shadow-2xl"
                >
                  {paymentDays.map((day) => (
                    <div
                      key={day}
                      role="button"
                      onClick={() => {
                        setOpenPaymentTerms(false);
                        setPaymentTerms(day);
                      }}
                      className="hover:text-color-1 text-color-8 flex cursor-pointer flex-col px-6 py-4"
                    >
                      <p className="text-heading-s-variant text-inherit">
                        {`   Net ${day} Day${day > 1 ? "s" : ""}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <label className="text-body-variant text-color-7 flex flex-col gap-2">
            Project Description
            <input
              type="text"
              id="invoiceDescription"
              name="invoiceDescription"
              defaultValue={invoice?.description || undefined}
              required
              className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
            />
          </label>
        </div>
        <div className="mb-12 space-y-6">
          <p className="text-[18px] font-bold text-[#777F98]">Item List</p>
          <div className="space-y-12.5">
            {editItems?.map((item) => (
              <EditItemContainer
                key={item.id}
                item={item}
                onRemoveItem={handleRemoveItem}
                onEditItem={handleEditItem}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => handleAddNewItem()}
          className="text-heading-s-variant text-color-7 dark:bg-color-4 mb-6 w-full cursor-pointer rounded-3xl bg-[#F9FAFE] py-4.5"
        >
          + Add New Item
        </button>
        <p className="text-body-variant text-color-9 pb-4">{error}</p>
      </div>
      <div className="fixed bottom-0 z-999 w-full max-w-154 lg:left-[103px]">
        <div className="bg-linear-to-b from-white to-gray-100 p-10 dark:from-[#0c0e16] dark:to-[#0c0e16]"></div>
        <div className="dark:bg-color-3 flex bg-white px-6 py-5.5">
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-heading-s-variant dark:bg-color-4 text-color-7 dark:text-color-5 cursor-pointer rounded-3xl bg-[#F9FAFE] px-6 py-4.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-heading-s-variant bg-color-1 cursor-pointer rounded-3xl px-6 py-4.5 text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditInvoice;
