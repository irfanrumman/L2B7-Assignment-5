import {getAllPropertiesAction} from "./{public}/_actions/HomePageActions";
import {HeroSection} from "./{public}/_components/HeroSection";
import { FeaturedProperties } from "./{public}/_components/FeaturedProperties";
import { CTASection } from "./{public}/_components/CTASection";
import { Suspense } from "react";
import { getAllProperties } from "../utils/getAllProperties";

export default async function HomePage() {
  // const properties = await getAllPropertiesAction();
  const propertiesData = await getAllProperties();
  console.log(propertiesData.data);

  return (
    <>
      <HeroSection />
      
       <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
          <FeaturedProperties properties={propertiesData.data} />
        </Suspense>
      <CTASection />
    </>
  );
}