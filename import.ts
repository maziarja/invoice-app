import fs from "fs";
import "dotenv/config";
import supabase from "./src/services/supabase.ts";
import "dotenv/config";

// Read JSON file
const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

async function insertData() {
  for (const invoice of data) {
    // 1. Insert senderAddress
    const { data: senderData, error: senderError } = await supabase
      .from("senderAddress")
      .insert([invoice.senderAddress])
      .select()
      .single();
    if (senderError) console.error("Sender Address Error:", senderError);

    // 2. Insert clientAddress
    const { data: clientData, error: clientError } = await supabase
      .from("clientAddress")
      .insert([invoice.clientAddress])
      .select()
      .single();
    if (clientError) console.error("Client Address Error:", clientError);

    // 3. Insert invoice
    const { data: invoiceData, error: invoiceError } = await supabase
      .from("invoice")
      .insert([
        {
          id: invoice.id,
          createdAt: invoice.createdAt,
          paymentDue: invoice.paymentDue,
          description: invoice.description,
          paymentTerms: invoice.paymentTerms,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          status: invoice.status,
          senderAddressId: senderData?.id,
          clientAddressId: clientData?.id,
          total: invoice.total,
        },
      ])
      .select()
      .single();
    if (invoiceError) console.error("Invoice Error:", invoiceError);

    // 4. Insert items
    for (const item of invoice.items) {
      const { error: itemError } = await supabase
        .from("items")
        .insert([{ invoiceId: invoiceData?.id, ...item }]);
      if (itemError) console.error("Item Error:", itemError);
    }
  }

  console.log("All data inserted!");
}

insertData();
