// import { getPropertiesAction } from "../_actions/AdminActions";
// import PropertyFilters from "../_components/PropertyFilters";
// import { AdminPropertyGrid as PropertyGrid } from "../_components/PropertyGrid";
// import PropertyHeader from "../_components/PropertyHeader";
// import PropertyPagination from "../_components/PropertyPagination";

// type Props = {
//   searchParams: Promise<{
//     page?: string;
//   }>;
// };

// const PropertiesPage = async ({ searchParams }: Props) => {
//   const params = await searchParams;

//   const page = Number(params.page) || 1;

//   const result = await getPropertiesAction({
//     page: String(page),   
//     limit: String(9),     
//   });

//   if (!result.success) {
//     return (
//       <main className="mx-auto max-w-7xl px-4 py-12">
//         <h2 className="text-xl font-semibold text-destructive">
//           {result.message}
//         </h2>
//       </main>
//     );
//   }

//   return (
//     <main className="flex-1">
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
//         <PropertyHeader total={result.meta.total} />

//         <div className="flex flex-col gap-8 lg:flex-row">
//           {/* Filters */}
//           <PropertyFilters />

//           {/* Properties */}
//           <div className="flex-1">
//             <PropertyGrid properties={result.data} />

//             <PropertyPagination
//               currentPage={result.meta.page}
//               totalPages={result.meta.totalPages}
//             />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default PropertiesPage;



import { getPropertiesAction } from "../_actions/AdminActions";
import PropertyFilters from "../_components/PropertyFilters";
import { AdminPropertyGrid as PropertyGrid } from "../_components/PropertyGrid";
import PropertyHeader from "../_components/PropertyHeader";
import PropertyPagination from "../_components/PropertyPagination";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PropertiesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const result = await getPropertiesAction({
    page: String(page),
    limit: String(9),
  });

  if (!result.success) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl font-semibold text-destructive">
          {result.message}
        </h2>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
        <PropertyHeader total={result.meta.total} />

        {/* Filters — ekhon upore, horizontal bar hisebe */}
        <PropertyFilters />

        {/* Properties — full width, sidebar nei tai beshi jayga */}
        <PropertyGrid properties={result.data} />

        <PropertyPagination
          currentPage={result.meta.page}
          totalPages={result.meta.totalPages}
        />
      </div>
    </main>
  );
};

export default PropertiesPage;