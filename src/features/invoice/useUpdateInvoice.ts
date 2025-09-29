import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice as updateInvoiceApi } from "../../services/apiInvoice";
import { useParams } from "react-router";
import type { Database } from "../../types/database";
import { useAuth } from "../../contexts/AuthContext";
type Invoice = Database["public"]["Tables"]["invoice"]["Row"];
type ClientAddress = Database["public"]["Tables"]["clientAddress"]["Row"];
type SenderAddress = Database["public"]["Tables"]["senderAddress"]["Row"];
type Items = Database["public"]["Tables"]["items"]["Row"];
type NewInvoice = {
  invoice: Invoice;
  clientAddress: ClientAddress;
  senderAddress: SenderAddress;
};

export function useUpdateInvoice() {
  const { user } = useAuth();
  const userId = user?.id as string;
  const { invoiceId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: updateInvoice } = useMutation({
    mutationFn: ({
      newInvoice,
      editItems,
    }: {
      newInvoice: NewInvoice;
      editItems: Items[];
    }) => updateInvoiceApi({ newInvoice, editItems }, userId),
    mutationKey: ["invoice", "invoices", invoiceId, userId],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { updateInvoice };
}
