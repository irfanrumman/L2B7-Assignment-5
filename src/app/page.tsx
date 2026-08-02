import { getFeaturedPropertiesAction } from "./{public}/_actions/HomePageActions";
import { HeroSection } from "./{public}/_components/HeroSection";
import { FeaturedProperties } from "./{public}/_components/FeaturedProperties";
import { CTASection } from "./{public}/_components/CTASection";

export default async function HomePage() {
  const result = await getFeaturedPropertiesAction();

  return (
    <>
      <HeroSection />
      <FeaturedProperties properties={result.success ? result.data : []} />
      <CTASection />
    </>
  );
}