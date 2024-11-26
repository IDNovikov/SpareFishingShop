import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../index";
import style from "./Pages.module.css";
import { useLocation } from "react-router-dom";

const Pages = observer(({ place }) => {
  const location = useLocation();
  let pageCount;
  let pagesToShow;
  let currentPage;
  const constext = useContext(Context);
  let product;

  if (location.pathname == "/post" || place === "admin-blog") {
    product = constext.blog;
    pageCount = Math.ceil(product.totalCount / product.limit);
    pagesToShow = 5;
    currentPage = product.page;
  } else {
    product = constext.product;
    pageCount = Math.ceil(product.totalCount / product.limit);
    pagesToShow = 5;
    currentPage = product.page;
  }

  const getPages = () => {
    const pages = [];

    if (currentPage > 1) {
      pages.push(
        <div
          key="prev"
          className={style.textBtn}
          onClick={() => product.setPage(currentPage - 1)}
        >
          Prev page
        </div>
      );
    }
    if (currentPage <= pagesToShow) {
      for (let i = 1; i <= Math.min(pagesToShow, pageCount); i++) {
        pages.push(
          <div
            className={`${style.Btn} ${currentPage === i ? style.Active : ""}`}
            key={i}
            active={currentPage === i}
            onClick={() => product.setPage(i)}
          >
            {i}
          </div>
        );
      }
      if (pageCount > pagesToShow) {
        pages.push(<div key="ellipsis-end">...</div>);
        pages.push(
          <div
            className={style.Btn}
            key={pageCount}
            onClick={() => product.setPage(pageCount)}
          >
            {pageCount}
          </div>
        );
      }
    } else if (currentPage > pagesToShow && currentPage < pageCount - 3) {
      pages.push(
        <div className={style.Btn} key={1} onClick={() => product.setPage(1)}>
          1
        </div>
      );
      pages.push(
        <div className={style.Btn} key="ellipsis-start">
          ...
        </div>
      );

      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(
          <div
            className={`${style.Btn} ${currentPage === i ? style.Active : ""}`}
            key={i}
            active={currentPage === i}
            onClick={() => product.setPage(i)}
          >
            {i}
          </div>
        );
      }

      pages.push(
        <div className={style.Btn} key="ellipsis-end">
          ...
        </div>
      );
      pages.push(
        <div key={pageCount} onClick={() => product.setPage(pageCount)}>
          {pageCount}
        </div>
      );
    } else {
      pages.push(
        <div className={style.Btn} key={1} onClick={() => product.setPage(1)}>
          1
        </div>
      );
      pages.push(
        <div className={style.Btn} key="ellipsis-start">
          ...
        </div>
      );

      for (let i = pageCount - pagesToShow + 1; i <= pageCount; i++) {
        pages.push(
          <div
            className={`${style.Btn} ${currentPage === i ? style.Active : ""}`}
            key={i}
            active={currentPage === i}
            onClick={() => product.setPage(i)}
          >
            {i}
          </div>
        );
      }
    }
    if (currentPage < pageCount) {
      pages.push(
        <div
          className={style.textBtn}
          key="next"
          onClick={() => product.setPage(currentPage + 1)}
        >
          Next page
        </div>
      );
    }

    return pages;
  };

  return <div className={style.main}>{getPages()}</div>;
});

export default Pages;
