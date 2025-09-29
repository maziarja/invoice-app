import { useQuery } from "@tanstack/react-query";
import { getInvoiceStatus } from "../../services/apiInvoice";
import { useParams } from "react-router";

export function useInvoiceStatus() {
  const { invoiceId } = useParams();
  const { isLoading, data: status } = useQuery({
    queryKey: ["invoiceStatus", invoiceId],
    queryFn: () => getInvoiceStatus(invoiceId || ""),
  });

  return { isLoading, status };
}
