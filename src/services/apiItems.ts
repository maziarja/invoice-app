import supabase from "./supabase";

export async function getItem(invoiceId: string) {
  const { data: items, error } = await supabase
    .from("items")
    .select("*")
    .eq("invoiceId", invoiceId);

  if (error) {
    console.error(error);
    throw new Error("Could not find items");
  }

  return items;
}
