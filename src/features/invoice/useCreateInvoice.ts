import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { createInvoiceApi } from "../../services/apiInvoice";
import type { Database } from "../../types/database";

type Invoice = Database["public"]["Tables"]["invoice"]["Row"];
type ClientAddress = Database["public"]["Tables"]["clientAddress"]["Row"];
type SenderAddress = Database["public"]["Tables"]["senderAddress"]["Row"];
type Items = Database["public"]["Tables"]["items"]["Row"];
type NewInvoice = {
  invoice: Invoice;
  clientAddress: ClientAddress;
  senderAddress: SenderAddress;
  items: Items[];
};

export function useCreateInvoice() {
  const userId = useAuth().user?.id;
  const queryClient = useQueryClient();
  const { isPending, mutate: createNewInvoice } = useMutation({
    mutationKey: ["invoices"],
    mutationFn: ({
      newInvoice,
      status,
    }: {
      newInvoice: NewInvoice;
      status: "pending" | "draft";
    }) => createInvoiceApi(newInvoice, status, userId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      }),
    onError: (err) => {
      console.error(err);
    },
  });

  return { isPending, createNewInvoice };
}
