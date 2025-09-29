import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getItem } from "../../services/apiItems";

export function useItem() {
  const { invoiceId } = useParams();

  const { isLoading, data: items } = useQuery({
    queryKey: ["items", invoiceId],
    queryFn: () => getItem(invoiceId || ""),
  });

  return { isLoading, items };
}
