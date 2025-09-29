import { useQuery } from "@tanstack/react-query";
import { getInvoice } from "../../services/apiInvoice";
import { useParams } from "react-router";

export function useInvoice() {
  const { invoiceId } = useParams();
  const { isLoading, data: invoice } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => getInvoice(invoiceId || ""),
  });

  return { isLoading, invoice };
}
