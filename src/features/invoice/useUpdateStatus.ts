import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { markInvoiceAsPaidApi } from "../../services/apiInvoice";
import { useAuth } from "../../contexts/AuthContext";

export function useUpdateStatus() {
  const { invoiceId } = useParams();
  const userId = useAuth().user?.id;

  const queryClient = useQueryClient();
  const { isPending, mutate: updateInvoiceStatus } = useMutation({
    mutationKey: ["invoiceStatus", invoiceId, "invoices", userId],
    mutationFn: () => markInvoiceAsPaidApi(invoiceId || "", userId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isPending, updateInvoiceStatus };
}
