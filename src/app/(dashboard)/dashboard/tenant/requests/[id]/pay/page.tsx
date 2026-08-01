import { getRentalRequestDetailAction } from "../../../_actions/tenantPaymentActions";
import { PaymentInitiation } from "../../../_components/PaymentInitiation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;
  const result = await getRentalRequestDetailAction(id);

  if (!result.success || !result.data) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-destructive">
            {result.message || "Rental request not found"}
          </p>
        </div>
      </div>
    );
  }

  const request = result.data;

  // Business rule: shudhu APPROVED status er request e payment kora jabe
  if (request.status !== "APPROVED") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-muted-foreground">
            Payment is only available for approved requests. Current status:{" "}
            <span className="font-semibold">{request.status}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Complete Payment</h1>
        <p className="text-muted-foreground">
          Your request has been approved. Complete payment to confirm your rental.
        </p>
      </div>

      <PaymentInitiation request={request} />
    </div>
  );
}