import PortfolioDetailClient from './PortfolioDetailClient';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  return {
    title: `Visual Studies — Hanzala Photography`,
    description: "Explore premium captures, lens EXIF configurations, and community reflections."
  };
}

export default async function PortfolioDetailPage({ params }) {
  const resolvedParams = await params;
  return <PortfolioDetailClient id={resolvedParams?.id} />;
}
