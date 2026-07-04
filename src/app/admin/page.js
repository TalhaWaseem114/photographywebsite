import AdminClient from "./AdminClient";

export const metadata = {
  title: "Admin Command Center",
  description: "Administrative console for managing portfolio, services, journals, and testimonials.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
