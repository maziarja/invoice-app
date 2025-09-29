import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../../services/apiInvoice";
import { useAuth } from "../../contexts/AuthContext";

export function useInvoices() {
  const userId = useAuth().user?.id;

  const {
    isLoading,
    data: invoices,
    error,
  } = useQuery({
    queryKey: ["invoices", userId],
    queryFn: () => getInvoices(userId),
  });

  return { invoices, isLoading, error };
}
