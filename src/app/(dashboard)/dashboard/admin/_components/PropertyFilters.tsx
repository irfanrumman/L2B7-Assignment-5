// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ChevronDown, Filter } from "lucide-react";

// export default function PropertyFilters() {
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [price, setPrice] = useState(50000);

//   return (
//     <div className="lg:w-64">
//       <Button
//         variant="outline"
//         className="mb-4 w-full justify-between lg:hidden"
//         onClick={() => setFilterOpen(!filterOpen)}
//       >
//         <span className="flex items-center gap-2">
//           <Filter className="h-4 w-4" />
//           Filters
//         </span>

//         <ChevronDown
//           className={`h-4 w-4 transition ${
//             filterOpen ? "rotate-180" : ""
//           }`}
//         />
//       </Button>

//       <div
//         className={`space-y-6 rounded-lg border bg-card p-4 ${
//           filterOpen ? "" : "hidden lg:block"
//         }`}
//       >
//         <div>
//           <label className="mb-2 block font-medium">
//             Location
//           </label>

//           <Input placeholder="Search location" />
//         </div>

//         <div>
//           <label className="mb-2 block font-medium">
//             Max Price
//           </label>

//           <input
//             type="range"
//             min={0}
//             max={100000}
//             value={price}
//             onChange={(e) => setPrice(Number(e.target.value))}
//             className="w-full"
//           />

//           <p className="mt-2 text-sm text-muted-foreground">
//             ${price.toLocaleString()}
//           </p>
//         </div>

//         <div>
//           <label className="mb-2 block font-medium">
//             Category
//           </label>

//           <select className="w-full rounded-md border p-2 bg-background">
//             <option>All</option>
//             <option>House</option>
//             <option>Villa</option>
//             <option>Apartment</option>
//           </select>
//         </div>

//         <Button className="w-full">
//           Apply Filters
//         </Button>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PropertyFilters() {
  const [price, setPrice] = useState(50000);

  return (
    <div className="mb-8 rounded-lg border bg-card p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:flex-wrap">
        {/* Location */}
        {/* min-w-[180px] */}
        <div className="flex-1 min-w-45">
          <label className="mb-2 block text-sm font-medium">Location</label>
          <Input placeholder="Search location" />
        </div>

        {/* Category */}
        <div className="w-full sm:w-40">
          <label className="mb-2 block text-sm font-medium">Category</label>
          <select className="w-full rounded-md border p-2 bg-background text-sm h-9">
            <option>All</option>
            <option>House</option>
            <option>Villa</option>
            <option>Apartment</option>
          </select>
        </div>

        {/* Max Price */}
        <div className="w-full sm:w-56">
          <label className="mb-2 block text-sm font-medium">
            Max Price: ${price.toLocaleString()}
          </label>
          <input
            type="range"
            min={0}
            max={100000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-9"
          />
        </div>

        {/* Apply button */}
        <Button className="w-full sm:w-auto">Apply Filters</Button>
      </div>
    </div>
  );
}