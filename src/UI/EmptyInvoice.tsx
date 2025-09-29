import illustration from "/assets/illustration-empty.svg";

function EmptyInvoice() {
  return (
    <div className="flex h-[calc(100dvh-230px)] flex-col items-center justify-center gap-10.5">
      <img src={illustration} alt="illustration" />
      <div className="flex flex-col items-center justify-center gap-6">
        <p className="text-heading-m text-color-8 text-center">
          There is nothing here
        </p>
        <p className="text-body-variant text-color-6 w-[60%] text-center">
          Create an invoice by clicking the{" "}
          <span className="font-bold">New</span> button and get started
        </p>
      </div>
    </div>
  );
}

export default EmptyInvoice;
