import Image from "next/image";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - NoteHub",
  description: "Welcome to NoteHub, your simple and efficient note-taking app",
};

const Home = () => {
  return (
    <div className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you are at home or on the go.
        </p>
        <p className={css.description}>
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>
        <Image
          src="https://picsum.photos/seed/picsum/300/300"
          alt="hero"
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
};
export default Home;
