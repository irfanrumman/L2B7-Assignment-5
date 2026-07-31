// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { MapPin, ImageOff } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { PropertyListItem } from "@/lib/types";

// export function AdminPropertyCard({
//   id,
//   title,
//   price,
//   location,
//   isAvailable,
//   category,
//   image,
//   featured,
//   landlord,
// }: PropertyListItem) {
//   return (
//     <Link href={`/dashboard/admin/properties/${id}`}>
//       <Card className="group flex items-center gap-4 p-3 transition-all hover:shadow-md hover:border-primary/50">
//         {/* Thumbnail — chotto, fixed size */}
//         <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted sm:h-20 sm:w-20">
//           {image ? (
//             <Image
//               src={image}
//               alt={title}
//               fill
//               unoptimized
//               className="object-cover"
//             />
//           ) : (
//             <div className="flex h-full w-full items-center justify-center text-muted-foreground">
//               <ImageOff className="h-5 w-5" />
//             </div>
//           )}
//         </div>

//         {/* Details — flex-1, remaining space nibe */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-start justify-between gap-2">
//             <div className="min-w-0">
//               <h4 className="truncate font-semibold text-foreground group-hover:text-primary transition">
//                 {title}
//               </h4>
//               <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
//                 <MapPin className="h-3 w-3 shrink-0" />
//                 <span className="truncate">{location}</span>
//               </div>
//             </div>

//             <p className="shrink-0 font-bold text-primary text-sm sm:text-base">
//               ${price.toLocaleString()}
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-2 mt-2">
//             <Badge variant="outline" className="capitalize text-xs">
//               {category.name}
//             </Badge>

//             {featured && (
//               <Badge variant="secondary" className="text-xs">
//                 Featured
//               </Badge>
//             )}

//             {isAvailable ? (
//               <Badge className="bg-green-600 text-white hover:bg-green-600 text-xs">
//                 Available
//               </Badge>
//             ) : (
//               <Badge variant="destructive" className="text-xs">
//                 Not Available
//               </Badge>
//             )}

//             <span className="text-xs text-muted-foreground ml-auto hidden sm:inline">
//               by {landlord.name}
//             </span>
//           </div>
//         </div>
//       </Card>
//     </Link>
//   );
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Heart, ImageOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PropertyListItem } from "@/lib/types";

export function AdminPropertyCard({
  id,
  title,
  description,
  price,
  location,
  isAvailable,
  category,
  image,
  featured,
}: PropertyListItem) {
  return (
    <Link href={`/properties/${id}`}>
      <Card className="group flex h-56 overflow-hidden transition-all hover:shadow-lg">
        {/* Left — Image, pura height jure */}
        <div className="relative w-2/5 shrink-0 overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageOff className="h-8 w-8" />
            </div>
          )}

          {featured && (
            <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
              Featured
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 left-2 h-8 w-8 rounded-full bg-card shadow-md hover:bg-primary hover:text-primary-foreground"
            aria-label="Save property"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Right — Content, baki shob kichu */}
        <div className="flex flex-1 min-w-0 flex-col justify-between p-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition line-clamp-1">
                {title}
              </h3>
              <Badge variant="outline" className="shrink-0 capitalize text-xs">
                {category.name}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{location}</span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {description}
            </p>
          </div>

          <div className="flex items-end justify-between gap-2 mt-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Monthly Price</p>
              <p className="font-bold text-lg text-primary truncate">
                ${price.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {isAvailable ? (
                <Badge className="bg-green-600 text-white hover:bg-green-600 text-xs">
                  Available
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  Not Available
                </Badge>
              )}

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                size="sm"
                disabled={!isAvailable}
              >
                {isAvailable ? "View" : "Unavailable"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}