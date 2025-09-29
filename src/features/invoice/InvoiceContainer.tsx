import { type Database } from "../../types/database";
import { format } from "date-fns";
import { formattedNum } from "../../helpers/formattedNum";
import Status from "../../UI/Status";

type Invoice = Database["public"]["Tables"]["invoice"]["Row"];

type InvoiceContainerProps = {
  invoice: Invoice;
};

function InvoiceContainer({ invoice }: InvoiceContainerProps) {
  const { clientName, paymentDue, total, status, defaultId } = invoice;
  return (
    <div className="dark:bg-color-3 flex flex-col gap-6 rounded-lg bg-white p-5.5 md:flex-row md:items-center md:justify-between md:gap-20">
      <div className="flex items-center justify-between md:flex-1 md:gap-7">
        <p className="text-heading-s-variant text-color-8">
          <span className="text-color-7">#</span>
          {defaultId?.slice(-6).toUpperCase()}
        </p>
        <span className="text-body-variant text-[#858BB2] md:hidden">
          {clientName}
        </span>
        <span className="text-body-variant hidden text-[#858BB2] md:inline">
          Due {paymentDue && format(paymentDue, "dd MMM yyyy")}
        </span>
      </div>
      <div className="md:flex md:flex-1/4 md:justify-between">
        <div className="flex items-center justify-between md:flex-1 md:gap-15">
          <div className="flex flex-col gap-2 md:flex-1 md:flex-row md:items-center md:justify-between">
            <p className="text-body-variant text-color-7 md:hidden">
              Due {paymentDue && format(paymentDue, "dd MMM yyyy")}
            </p>
            <p className="text-body-variant text-color-7 hidden md:inline">
              {clientName}
            </p>
            <p className="text-heading-s text-color-8">
              £ {total && formattedNum(total)}
            </p>
          </div>
          {status && <Status status={status} />}
        </div>
      </div>
    </div>
  );
}

export default InvoiceContainer;
