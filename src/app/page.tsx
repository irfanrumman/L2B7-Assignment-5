import {getProperties} from "./{public}/_actions/HomePageActions";
import {HeroSection} from "./{public}/_components/HeroSection";
import { FeaturedProperties } from "./{public}/_components/FeaturedProperties";
import { CTASection } from "./{public}/_components/CTASection";

export default async function HomePage() {
  const properties = await getProperties();
  console.log(properties.data);

  return (
    <>
      <HeroSection />
      <FeaturedProperties properties={properties.data} />
      <CTASection />
    </>
  );
}