//input: pages list, active page
//output: handlepagination
import React from "react";
import "../css/style.css";

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

const Pagination = (props) => {
  return (
    <ul className="pagination">
      {props.pages.map((p) => (
        <li key={p} onClick={() => props.handlePagination(p)}>
          <Link className={p === props.activePage ? "page-active " : "page"}>
            {p}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
