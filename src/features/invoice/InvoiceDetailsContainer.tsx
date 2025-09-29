import { formatInTimeZone } from "date-fns-tz";

import { useInvoice } from "./useInvoice";
import InvoiceItems from "../items/InvoiceItems";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDarkMode } from "../../contexts/DarkmodeContext";

function InvoiceDetailsContainer() {
  const { darkMode } = useDarkMode();
  const { isLoading, invoice: invoiceObj } = useInvoice();
  const invoice = invoiceObj?.invoice;

  return (
    <div className="dark:bg-color-3 rounded-lg bg-white p-6 md:p-8">
      <div className="md:flex md:justify-between">
        <div className="mb-7.5 space-y-1 md:space-y-2">
          <p className="text-heading-s-variant text-color-8">
            <span className="text-color-7">#</span>
            {isLoading ? (
              <Skeleton
                width={80}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            ) : (
              invoice?.defaultId?.slice(-6).toUpperCase()
            )}
          </p>
          <p className="text-body-variant text-color-7">
            {isLoading ? (
              <Skeleton
                width={100}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            ) : (
              invoice?.description
            )}
          </p>
        </div>
        <div className="mb-7.5">
          <p className="text-body text-color-7">
            {isLoading ? (
              <Skeleton
                width={100}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            ) : (
              invoice?.senderAddress?.street
            )}
          </p>
          <p className="text-body text-color-7 md:text-right">
            {isLoading ? (
              <Skeleton
                width={50}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            ) : (
              invoice?.senderAddress?.city
            )}
          </p>
          <p className="text-body text-color-7 md:text-right">
            {isLoading ? (
              <Skeleton
                width={50}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            ) : (
              invoice?.senderAddress?.postCode
            )}
          </p>
          <p className="text-body text-color-7">
            {isLoading ? (
              <Skeleton
                width={10}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            ) : (
              invoice?.senderAddress?.country
            )}
          </p>
        </div>
      </div>
      <div className="mb-8 flex gap-15 md:gap-30">
        <div className="flex flex-col gap-7.5">
          <div className="flex flex-col gap-3">
            <p className="text-body-variant text-color-7">Invoice Date</p>
            <p className="text-heading-s text-color-8">
              {isLoading ? (
                <Skeleton
                  width={100}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />
              ) : (
                invoice?.createdAt &&
                formatInTimeZone(invoice?.createdAt, "UTC", "dd MMM yyyy")
              )}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-body-variant text-color-7">Payment Due</p>
            <p className="text-heading-s text-color-8">
              {isLoading ? (
                <Skeleton
                  width={100}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />
              ) : (
                invoice?.paymentDue &&
                formatInTimeZone(invoice?.paymentDue, "UTC", "dd MMM yyyy")
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <p className="text-body-variant text-color-7">Bill To</p>
            <p className="text-heading-s text-color-8">
              {isLoading ? (
                <Skeleton
                  width={100}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />
              ) : (
                invoice?.clientName
              )}
            </p>
          </div>
          <div>
            <p className="text-body text-color-7">
              {isLoading ? (
                <Skeleton
                  width={100}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />
              ) : (
                invoice?.clientAddress?.street
              )}
            </p>
            <p className="text-body text-color-7">
              {isLoading ? (
                <Skeleton
                  width={80}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />
              ) : (
                invoice?.clientAddress?.city
              )}
            </p>
            <p className="text-body text-color-7">
              {isLoading ? (
                <Skeleton
                  width={80}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />
              ) : (
                invoice?.clientAddress?.postCode
              )}
            </p>
            <p className="text-body text-color-7">
              {isLoading ? (
                <Skeleton
                  width={100}
                  baseColor={darkMode ? "#888eb0" : ""}
                  highlightColor={darkMode ? "#888eb0" : ""}
                />
              ) : (
                invoice?.clientAddress?.country
              )}
            </p>
          </div>
        </div>
        <div className="mb-9.5 hidden flex-col gap-3 md:flex">
          <p className="text-body-variant text-color-7">Sent to</p>
          <p className="text-heading-s text-color-8">
            {isLoading ? (
              <Skeleton
                width={100}
                baseColor={darkMode ? "#888eb0" : ""}
                highlightColor={darkMode ? "#888eb0" : ""}
              />
            ) : (
              invoice?.clientEmail
            )}
          </p>
        </div>
      </div>
      <div className="mb-9.5 flex flex-col gap-3 md:hidden">
        <p className="text-body-variant text-color-7">Sent to</p>
        <p className="text-heading-s text-color-8">
          {isLoading ? (
            <Skeleton
              width={100}
              baseColor={darkMode ? "#888eb0" : ""}
              highlightColor={darkMode ? "#888eb0" : ""}
            />
          ) : (
            invoice?.clientEmail
          )}
        </p>
      </div>
      <InvoiceItems />
    </div>
  );
}

export default InvoiceDetailsContainer;
