// Pagination.jsx

import { useState } from "react";

export default function Pagination() {
  const [activePage, setActivePage] = useState(1);
  const totalPages = 10; // Set the total number of pages

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li className="page-item">
        <a
          className="page-link page-prev cursor-pointer"
          onClick={() => setActivePage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
        </a>
      </li>
      {pages.map((page) => (
        <li key={page} className="page-item">
          <a
            onClick={() => setActivePage(page)}
            className={`page-link cursor-pointer ${page === activePage ? "active" : ""}`}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className="page-item cursor-pointer"
        onClick={() => setActivePage((prev) => (prev < totalPages ? prev + 1 : prev))}
      >
        <a className="page-link page-next">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  );
}
