import Link from "next/link";
import css from "./SidebarNotes.module.css";

const NOTE_TAGS = [
  "all",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

const NotesSidebar = () => {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        {NOTE_TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NotesSidebar;
