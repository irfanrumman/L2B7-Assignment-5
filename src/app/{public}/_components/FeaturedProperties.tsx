import { PropertyGrid } from "./PropertyGrid";


type Property = {
  id: string;
  landlordId: string;
  categoryId: string;
  title: string;
    description: string;
    location: string;
    price: number;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
    landlord: {
      id: string;   
    name: string;
    email: string;
    phone: string | null;
    role: string;
    };
    category: {
      id: string;
        name: string;
        description: string;
    };
    reviews: any[];

}; 


interface PropertyData {
  properties: Property[];
}

export function FeaturedProperties({ properties }: PropertyData) {
  return (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 space-y-4">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured Properties
          </h2>

          <p className="text-lg text-muted-foreground">
            Check out our latest rental properties.
          </p>
        </div>

        <PropertyGrid properties={properties} />
      </div>
    </section>
  );
}