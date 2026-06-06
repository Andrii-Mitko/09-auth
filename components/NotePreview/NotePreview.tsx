"use client";

import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

type Props = {
  id: string;
};

const NotePreview = ({ id }: Props) => {
  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>Note #{id}</h2>
            <span className={css.tag}>Work</span>
          </div>

          <p className={css.content}>Детали заметки...</p>

          <div className={css.date}>2026-01-01</div>

          <button className={css.backBtn} onClick={() => history.back()}>
            ← Back
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
