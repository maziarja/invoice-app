import type { Database } from "../types/database";
import supabase from "./supabase";

type Invoice = Database["public"]["Tables"]["invoice"]["Row"];
type ClientAddress = Database["public"]["Tables"]["clientAddress"]["Row"];
type SenderAddress = Database["public"]["Tables"]["senderAddress"]["Row"];
type Items = Database["public"]["Tables"]["items"]["Row"];
type NewInvoice = {
  invoice: Invoice;
  clientAddress: ClientAddress;
  senderAddress: SenderAddress;
  items?: Items[];
};

export async function getInvoices(userId: string | undefined) {
  const { data: initialInvoices, error } = await supabase
    .from("invoice")
    .select("*")
    .is("userId", null)
    .order("createdAt", { ascending: false });

  const { data: userInvoices, error: error2 } = await supabase
    .from("invoice")
    .select("*")
    .eq("userId", userId || "")
    .order("createdAt", { ascending: false });

  if (error || error2) {
    console.error(error);
    console.error(error2);

    throw new Error("Invoices could not be loaded");
  }

  const defaultIdsUserInvoices = new Set(
    // .filter(Boolean) removes all the falsy values in array
    userInvoices.map((inv) => inv.defaultId).filter(Boolean),
  );

  const merged = [
    ...(userInvoices?.filter((inv) => !inv.isDeleted) || []),
    ...(initialInvoices?.filter((inv) => !defaultIdsUserInvoices.has(inv.id)) ||
      []),
  ];
  return merged;
}

export async function getInvoice(id: string) {
  const { data: invoice, error } = await supabase
    .from("invoice")
    .select(
      `
      *,
      clientAddress:clientAddressId ( * ),
      senderAddress:senderAddressId ( * )
      `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not find invoice");
  }

  return { invoice };
}

export async function getInvoiceStatus(invoiceId: string) {
  const { data: status, error } = await supabase
    .from("invoice")
    .select("status, id")
    .eq("id", invoiceId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not find invoice");
  }

  return status;
}

export async function markInvoiceAsPaidApi(invoiceId: string, userId: string) {
  // get invoice
  const { data: initialInvoice, error: getError } = await supabase
    .from("invoice")
    .select("*")
    .eq("id", invoiceId)
    .single();

  if (getError || !initialInvoice) {
    console.error(getError);
    throw new Error("Invoice not found");
  }

  // if invoice is initial
  if (initialInvoice.userId === null) {
    // create new invoice with status === paid
    const { data: newInvoice, error } = await supabase
      .from("invoice")
      .insert([
        {
          ...initialInvoice,
          id: crypto.randomUUID(),
          defaultId: initialInvoice?.id,
          userId,
          status: "paid",
          // createdAt: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("Could not find invoice");
    }

    // get items array for this initial invoice
    const { data: items } = await supabase
      .from("items")
      .select("*")
      .eq("invoiceId", invoiceId);

    // update invoiceId and userId for this initial items array
    if (items && newInvoice?.id) {
      const newItems = items.map(({ id, ...item }) => ({
        ...item,
        // id: crypto.randomUUID(),
        invoiceId: newInvoice.id,
        userId,
      }));

      const { error: itemsError } = await supabase
        .from("items")
        .insert(newItems);

      if (itemsError) {
        console.error(itemsError);
        throw new Error("Could not copy invoice items");
      }
    }

    // if invoice is not initial just update status === paid
  } else {
    const { error: updateError } = await supabase
      .from("invoice")
      .update({ status: "paid" })
      .eq("id", invoiceId)
      .eq("userId", userId)
      .select()
      .single();

    if (updateError) {
      console.error(updateError);
      throw new Error("Could not find invoice");
    }
  }
}

export async function updateInvoice(
  {
    newInvoice,
    editItems,
  }: {
    newInvoice: NewInvoice;
    editItems: Items[];
  },
  userId: string,
) {
  // 1) If invoice is initial
  if (!newInvoice.invoice.userId) {
    // Create new sender address for new invoice
    const { id: senderId, ...senderAddressWithoutId } =
      newInvoice.senderAddress;
    const { data: newSenderAddress, error: newSenderAddressError } =
      await supabase
        .from("senderAddress")
        .insert([senderAddressWithoutId])
        .select()
        .single();

    if (newSenderAddressError) {
      console.error(newSenderAddressError);
      throw new Error("Could not create items");
    }

    // Create new client address for new invoice
    const { id: clientId, ...clientAddressWithoutId } =
      newInvoice.clientAddress;
    const { data: newClientAddress, error: newClientAddressError } =
      await supabase
        .from("clientAddress")
        .insert([clientAddressWithoutId])
        .select()
        .single();

    if (newClientAddressError) {
      console.error(newClientAddressError);
      throw new Error("Could not create items");
    }

    // Create new invoice
    const { data: newInv, error: newInvoiceError } = await supabase
      .from("invoice")
      .insert([
        {
          ...newInvoice.invoice,
          id: crypto.randomUUID(),
          senderAddressId: newSenderAddress.id,
          clientAddressId: newClientAddress.id,
          userId,
        },
      ])
      .select()
      .single();

    if (newInvoiceError) {
      console.error(newInvoiceError);
      throw new Error("Could not create invoice");
    }

    // Create new items for new invoice
    if (editItems && newInv?.id) {
      const newItems = editItems.map(({ id, ...item }) => ({
        ...item,
        invoiceId: newInv.id,
        userId,
      }));

      const { error: newItemsError } = await supabase
        .from("items")
        .insert(newItems)
        .select();

      if (newItemsError) {
        console.error(newItemsError);
        throw new Error("Could not create items");
      }
    }
  } else {
    // 2) If invoice is not initial just update invoice
    const { error: updateInvoiceError } = await supabase
      .from("invoice")
      .update(newInvoice.invoice)
      .eq("id", newInvoice.invoice.id)
      .eq("userId", userId)
      .select()
      .single();

    if (updateInvoiceError) {
      console.error(updateInvoiceError);
      throw new Error("Could not update invoice");
    }

    // update senderAddress
    const { error: updateSenderAddressError } = await supabase
      .from("senderAddress")
      .update(newInvoice.senderAddress)
      .eq("id", newInvoice.invoice.senderAddressId as number)
      .select()
      .single();

    if (updateSenderAddressError) {
      console.error(updateSenderAddressError);
      throw new Error("Could not update senderAddress");
    }

    // update clientAddress
    const { error: updateClientAddressError } = await supabase
      .from("clientAddress")
      .update(newInvoice.clientAddress)
      .eq("id", newInvoice.invoice.clientAddressId as number)
      .select()
      .single();

    if (updateClientAddressError) {
      console.error(updateClientAddressError);
      throw new Error("Could not update clientAddress");
    }

    // update items
    // replace items (delete old, insert new)
    if (newInvoice.invoice.id) {
      // 1) Delete all previous items for this invoice
      const { error: deleteError } = await supabase
        .from("items")
        .delete()
        .eq("invoiceId", newInvoice.invoice.id);

      if (deleteError) {
        console.error(deleteError);
        throw new Error("Could not delete previous items");
      }

      // 2) Insert new items
      if (editItems.length > 0) {
        const newItems = editItems.map(({ id, ...item }) => ({
          ...item,
          invoiceId: newInvoice.invoice.id,
          userId,
        }));

        const { error: insertError } = await supabase
          .from("items")
          .insert(newItems);

        if (insertError) {
          console.error(insertError);
          throw new Error("Could not insert new items");
        }
      }
    }
  }
}

// Delete an Invoice

export async function deleteInvoiceApi(
  invoiceId: string | undefined,
  userId: string,
) {
  const { data: invoice, error } = await supabase
    .from("invoice")
    .select("*")
    .eq("id", invoiceId!)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Could not find invoice");
  }
  // 1) If invoice is initial
  if (!invoice?.userId) {
    // Create invoice and set userId and also isDeleted to true
    const { error: newInvoiceError } = await supabase
      .from("invoice")
      .insert([
        {
          ...invoice,
          userId,
          isDeleted: true,
          id: crypto.randomUUID(),
          defaultId: invoice.id,
        },
      ])
      .select();

    if (newInvoiceError) {
      console.error(newInvoiceError);
      throw new Error("Could not create invoice");
    }
  } else {
    // 2) If invoice is not initial just update isDeleted to true
    const { error } = await supabase
      .from("invoice")
      .update({ isDeleted: true })
      .eq("userId", userId)
      .eq("id", invoiceId!)
      .select();
    if (error) {
      console.error(error);
      throw new Error("Could not delete invoice ");
    }
  }
}

// Create new Invoice
export async function createInvoiceApi(
  newInvoice: NewInvoice,
  status: "pending" | "draft",
  userId: string | undefined,
) {
  // 1) create sender address
  const { id: senderId, ...senderAddress } = newInvoice.senderAddress;
  const { data: newSenderAddress, error: newSenderAddressError } =
    await supabase
      .from("senderAddress")
      .insert([senderAddress])
      .select()
      .single();
  if (newSenderAddressError) {
    console.error(newSenderAddressError);
    throw new Error("Could not create new senderAddress ");
  }

  // 2) create client address
  const { id: clientId, ...clientAddress } = newInvoice.clientAddress;
  const { data: newClientAddress, error: newClientAddressError } =
    await supabase
      .from("clientAddress")
      .insert([clientAddress])
      .select()
      .single();
  if (newClientAddressError) {
    console.error(newClientAddressError);
    throw new Error("Could not create new clientAddress ");
  }

  // 3) create invoice
  const {
    id: invoiceId,
    userId: uId,
    clientAddressId,
    senderAddressId,
    defaultId,
    createdAt,
    status: invoiceStatus,
    ...invoice
  } = newInvoice.invoice;

  const id = crypto.randomUUID();

  const { data: newInvoiceData, error: newInvoiceError } = await supabase
    .from("invoice")
    .insert([
      {
        ...invoice,
        userId,
        clientAddressId: newClientAddress.id,
        senderAddressId: newSenderAddress.id,
        status,
        id,
        defaultId: id,
      },
    ])
    .select()
    .single();
  if (newInvoiceError) {
    console.error(newInvoiceError);
    throw new Error("Could not create new invoice ");
  }

  // 4) create items for newInvoice
  if (newInvoice.items && newInvoice.items.length > 0) {
    newInvoice.items.map(async (item) => {
      const { id, invoiceId, userId: urId, ...itemWithoutId } = item;
      const { error: newItemError } = await supabase
        .from("items")
        .insert([
          {
            ...itemWithoutId,
            invoiceId: newInvoiceData.id,
            userId,
            total: itemWithoutId.total,
          },
        ])
        .select();

      if (newItemError) {
        console.error(newItemError);
        throw new Error("Could not create new items");
      }
    });
  }
}
