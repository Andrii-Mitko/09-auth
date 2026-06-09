"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

type PaginationProps = {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  page,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      className={css.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
    />
  );
}
