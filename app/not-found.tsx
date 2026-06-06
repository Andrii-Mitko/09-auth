import css from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page does not exist in NoteHub",

  openGraph: {
    title: "Page Not Found",
    description: "This page does not exist in NoteHub",
    url: "http://localhost:3000/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Not Found",
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
