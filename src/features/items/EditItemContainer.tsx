import { FaTrash } from "react-icons/fa6";
import type { Database } from "../../types/database";
import { formattedNum } from "../../helpers/formattedNum";
import { useEffect, useState } from "react";

type EditItemContainerProps = {
  item: Database["public"]["Tables"]["items"]["Row"];
  // eslint-disable-next-line no-unused-vars
  onRemoveItem: (id: number) => void;
  onEditItem: (
    // eslint-disable-next-line no-unused-vars
    id: number,
    // eslint-disable-next-line no-unused-vars
    field: "name" | "price" | "quantity" | "total",
    // eslint-disable-next-line no-unused-vars
    value: string,
  ) => void;
};

function EditItemContainer({
  item,
  onRemoveItem,
  onEditItem,
}: EditItemContainerProps) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const total = quantity * price;

  useEffect(() => {
    onEditItem(item.id, "total", total.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, total]);

  return (
    <div className="space-y-6">
      <label className="text-body-variant text-color-7 flex flex-col gap-2">
        Item Name
        <input
          type="text"
          id={`itemName-${item.id}`}
          name={`itemName-${item.id}`}
          defaultValue={item.name || undefined}
          onChange={(e) => {
            onEditItem(item.id, "name", e.target.value);
          }}
          required
          className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
        />
      </label>
      <div className="flex items-center gap-4">
        <label className="text-body-variant text-color-7 flex flex-col gap-2">
          Qty.
          <input
            type="number"
            id={`itemQty-${item.id}`}
            name={`itemQty-${item.id}`}
            defaultValue={item.quantity || undefined}
            onChange={(e) => {
              onEditItem(item.id, "quantity", e.target.value);
              setQuantity(+e.target.value);
            }}
            required
            className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
          />
        </label>
        <label className="text-body-variant text-color-7 flex w-full flex-col gap-2">
          Price
          <input
            type="number"
            id={`itemsPrice-${item.id}`}
            name={`itemsPrice-${item.id}`}
            defaultValue={item.price || undefined}
            onChange={(e) => {
              onEditItem(item.id, "price", e.target.value);
              setPrice(+e.target.value);
            }}
            required
            className="border-color-5 dark:border-color-4 text-heading-s-variant text-color-8 w-full rounded-sm border-1 px-5 py-4.5 outline-0"
          />
        </label>
        <div className="text-body-variant text-color-7 flex flex-col gap-2">
          Total
          <p className="text-heading-s-variant text-color-6 rounded-sm py-4.5">
            {item.price !== null &&
            item.quantity !== null &&
            item.price * item.quantity === 0
              ? ""
              : item.price &&
                item.quantity &&
                formattedNum(item.price * item.quantity)}
          </p>
        </div>
        <FaTrash
          role="button"
          onClick={() => onRemoveItem(item.id)}
          className="fill-color-6 mt-4 h-4 w-full cursor-pointer"
        />
      </div>
    </div>
  );
}

export default EditItemContainer;
