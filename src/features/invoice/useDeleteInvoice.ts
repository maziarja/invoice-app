import { useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoiceApi } from "../../services/apiInvoice";

export function useDeleteInvoice() {
  const userId = useAuth().user?.id;
  const { invoiceId } = useParams();
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteInvoice } = useMutation({
    mutationKey: ["invoices"],
    mutationFn: () => deleteInvoiceApi(invoiceId!, userId!),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      }),
    onError: (err) => {
      console.error(err);
    },
  });

  return { isPending, deleteInvoice };
}
