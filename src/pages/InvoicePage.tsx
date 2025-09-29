import { Link, Outlet } from "react-router";
import EmptyInvoice from "../UI/EmptyInvoice";
import Header from "../UI/Header";
import InvoiceContainerSkeleton from "../UI/skeleton/InvoiceContainerSkeleton";
import InvoiceContainer from "../features/invoice/InvoiceContainer";
import { useInvoices } from "../features/invoice/useInvoices";
import { useState } from "react";

function InvoicePage() {
  const { invoices, isLoading } = useInvoices();

  const [filter, setFilter] = useState<
    undefined | "draft" | "pending" | "paid"
  >();

  const check = (checked: boolean, filter: "draft" | "pending" | "paid") => {
    setFilter(checked ? filter : undefined);
  };

  const filteredInvoices = filter
    ? invoices?.filter((invoice) => invoice.status === filter)
    : invoices;

  return (
    <>
      <Outlet />
      <div className="max-w-182.5 space-y-8 px-6 py-8 md:mx-auto md:w-full md:px-0 lg:space-y-16 lg:pt-19">
        <Header
          numOfInvoices={filteredInvoices?.length}
          check={check}
          filter={filter}
        />
        {invoices?.length === 0 ? (
          <EmptyInvoice />
        ) : isLoading ? (
          <InvoiceContainerSkeleton />
        ) : (
          <div className="flex flex-col gap-4 lg:h-[calc(100dvh-180px)] lg:overflow-y-scroll">
            {filteredInvoices?.map((invoice) => (
              <Link
                key={invoice.id}
                to={`/${invoice.id}`}
                className="cursor-pointer"
              >
                <InvoiceContainer key={invoice.id} invoice={invoice} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default InvoicePage;
