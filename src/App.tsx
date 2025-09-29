import { Route, Routes } from "react-router";
import InvoicePage from "./pages/InvoicePage";
import Nav from "./UI/Nav";
import InvoiceDetails from "./pages/InvoiceDetails";
import EditInvoice from "./pages/EditInvoice";
import AddInvoice from "./pages/AddInvoice";

function App() {
  return (
    <div className="bg-color-11 lg:grid lg:grid-cols-[minmax(0,103px)_minmax(0,1fr)))]">
      <Nav />
      <Routes>
        <Route path="/" element={<InvoicePage />}>
          <Route path="/newInvoice" element={<AddInvoice />} />
        </Route>
        <Route path="/:invoiceId" element={<InvoiceDetails />}>
          <Route path="/:invoiceId/edit" element={<EditInvoice />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
