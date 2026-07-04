import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import EducationSection from '@/components/home/EducationSection';
import SkillsSection from '@/components/home/SkillsSection';
import FeaturedWork from '@/components/home/FeaturedWork';
import Testimonials from '@/components/home/Testimonials';
import JournalSection from '@/components/home/JournalSection';
import ContactCTA from '@/components/home/ContactCTA';
import ShowreelSection from '@/components/home/ShowreelSection';
import SectionIndicator from '@/components/home/SectionIndicator';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <SectionIndicator />
      <Hero />
      <AboutSection />
      <FeaturedWork />
      <JournalSection />
      <EducationSection />
      <SkillsSection />
      <Testimonials />
      <ShowreelSection />
      <ContactCTA />
    </main>
  );
}
