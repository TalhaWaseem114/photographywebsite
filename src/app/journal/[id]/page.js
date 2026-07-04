import JournalDetailClient from './JournalDetailClient';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  return {
    title: `Journal Entry — Hanzala Photography`,
    description: "Read detailed photographic essays, field notes, and reflections from the lens."
  };
}

export default async function JournalDetailPage({ params }) {
  const resolvedParams = await params;
  return <JournalDetailClient id={resolvedParams?.id} />;
}
