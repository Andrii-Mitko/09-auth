import css from "./LayoutNotes.module.css";

type Props = {
  children: React.ReactNode;
  modal?: React.ReactNode;
};

const NotesLayout = ({ children, modal }: Props) => {
  return (
    <section className={css.container}>
      <div className={css.notesWrapper}>{children}</div>
      {modal}
    </section>
  );
};

export default NotesLayout;
