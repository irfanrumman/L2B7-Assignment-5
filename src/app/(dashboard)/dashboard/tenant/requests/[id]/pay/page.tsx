import { getRentalRequestDetailAction } from "../../../_actions/tenantPaymentActions";
import { PaymentInitiation } from "../../../_components/PaymentInitiation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CreatePaymentPage({ params }: Props) {
  const { id } = await params;
  const result = await getRentalRequestDetailAction(id);

  if (!result.success || !result.data) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="rounded-lg border border-dashed border-border p-6 text-center sm:p-8">
          <p className="text-sm text-destructive sm:text-base">
            {result.message || "Rental request not found"}
          </p>
        </div>
      </div>
    );
  }

  const request = result.data;

  if (request.status !== "APPROVED") {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="rounded-lg border border-dashed border-border p-6 text-center sm:p-8">
          <p className="text-sm text-muted-foreground sm:text-base">
            Payment is only available for approved requests. Current status:{" "}
            <span className="font-semibold">{request.status}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 px-4 sm:space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">Complete Payment</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Your request has been approved. Complete payment to confirm your rental.
        </p>
      </div>

      <PaymentInitiation request={request} />
    </div>
  );
}