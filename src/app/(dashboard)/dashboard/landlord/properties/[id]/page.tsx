import { notFound } from "next/navigation";

import UpdatePropertyForm from "../../_components/PropertyUpdateForm";
import { getPropertyByIdAction } from "../../_actions/landlordPropertyActions";
import { getCategories } from "@/service/categories";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UpdatePropertyPage({ params }: Props) {
  const { id } = await params;

  const [propertyResult, categoryResult] = await Promise.all([
    getPropertyByIdAction(id),
    getCategories(),
  ]);

  if (!propertyResult.success || !propertyResult.data) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <UpdatePropertyForm
        property={propertyResult.data}
        categories={categoryResult.data || []}
      />
    </div>
  );
}