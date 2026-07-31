"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PropertySearch() {
  const [location, setLocation] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (!location.trim()) {
      router.push("/properties");
      return;
    }

    router.push(
      `/properties?location=${encodeURIComponent(location)}`
    );
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="pl-11"
        />
      </div>

      <Button
        onClick={handleSearch}
        className="w-full sm:w-auto gap-2"
      >
        <Search className="h-5 w-5" />
        Search
      </Button>
    </div>
  );
}