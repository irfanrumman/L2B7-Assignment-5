import { HeroSection } from "./{public}/_components/HeroSection";
import { HomePropertiesSection } from "./{public}/_components/HomePropertiesSection";
import { CTASection } from "./{public}/_components/CTASection";

type Props = {
  searchParams: Promise<{ location?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  return (
    <>
      <HeroSection />
      <HomePropertiesSection searchParams={searchParams} />
      <CTASection />
    </>
  );
}