import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formattedNum } from "../../helpers/formattedNum";
import { useItem } from "./useItem";
import { useDarkMode } from "../../contexts/DarkmodeContext";

function InvoiceItems() {
  const { isLoading, items } = useItem();
  const { darkMode } = useDarkMode();

  const total = items?.reduce(
    (acc, cur) =>
      cur.price && cur.quantity ? acc + cur.price * cur.quantity : 0,
    0,
  );

  return (
    <div>
      <div className="dark:bg-color-4 flex flex-col gap-6 rounded-t-lg bg-[#F9FAFE] p-6">
        <div className="hidden items-center justify-between md:grid md:grid-cols-2">
          <p className="text-body text-color-7">Item Name</p>
          <div className="flex items-center justify-between">
            <p className="text-body text-color-7">QTY.</p>
            <p className="text-body text-color-7">Price</p>
            <p className="text-body text-color-7">Total</p>
          </div>
        </div>
        {isLoading ? (
          <Skeleton
            height={40}
            baseColor={darkMode ? "#888eb0" : ""}
            highlightColor={darkMode ? "#888eb0" : ""}
          />
        ) : (
          items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between md:grid md:grid-cols-2"
            >
              <div className="flex flex-col gap-2">
                <p className="text-heading-s-variant text-color-8">
                  {item.name}
                </p>
                <p className="text-heading-s-variant text-color-7 md:hidden">
                  {item.quantity} x £ {item?.price && formattedNum(item.price)}
                </p>
              </div>
              <div className="items-center justify-between md:flex">
                <p className="text-heading-s-variant text-color-7 hidden md:ml-3 md:inline-block">
                  {item.quantity}
                </p>
                <p className="text-heading-s-variant text-color-7 hidden md:block">
                  £ {item?.price && formattedNum(item.price)}
                </p>
                <p className="text-heading-s-variant text-color-8">
                  £{" "}
                  {item?.price &&
                    item?.quantity &&
                    formattedNum(item.quantity * item.price)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="rounded-b-lg bg-[#373B53] p-6 dark:bg-[#0c0e16]">
        <div className="flex items-center justify-between">
          <p className="text-body text-white">Amount Due</p>

          <p className="text-heading-m text-white">
            £ {total && formattedNum(total)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceItems;
