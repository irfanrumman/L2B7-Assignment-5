import { HeroSection } from "./{public}/_components/HeroSection";
import { StatsSection } from "./{public}/_components/StatsSection";
import { PopularCategoriesSection } from "./{public}/_components/popularCategoriesSection";
import { HomePropertiesSection } from "./{public}/_components/HomePropertiesSection";
import { WhyChooseUsSection } from "./{public}/_components/WhyChooseUsSection";
import { HowItWorksSection } from "./{public}/_components/HowItWorksSection";
import { PopularLocationsSection } from "./{public}/_components/PuplarLocationsSection";
import { TestimonialsSection } from "./{public}/_components/TestimonialsSection";
import { CTASection } from "./{public}/_components/CTASection";

type Props = {
  searchParams: Promise<{ location?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PopularCategoriesSection />
      <HomePropertiesSection searchParams={searchParams} />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <PopularLocationsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
