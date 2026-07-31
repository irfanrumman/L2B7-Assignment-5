import { getCategories } from "@/service/categories";
import CreatePropertyForm from "../../_components/CreatePropertyForm";

export default async function CreatePropertyPage() {
  const result = await getCategories();

  return (
    <section className="container mx-auto px-4 py-8">
      <CreatePropertyForm
        categories={result.success ? result.data : []}
      />
    </section>
  );
}