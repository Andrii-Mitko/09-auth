import SidebarNotes from "@/components/NotesSidebar/NotesSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Settings - NoteHub",
  description: "Edit your user details and settings",
};

export default function Page() {
  return <SidebarNotes />;
}
