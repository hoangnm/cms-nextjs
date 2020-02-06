import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

const Header = ({ router }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <Link href="/">
        <a className="navbar-brand">Blog</a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${router.pathname === "/" ? "active" : ""}`}>
            <Link href="/">
              <a className="nav-link">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </Link>
          </li>
          <li
            className={`nav-item ${
              router.pathname === "/create" ? "active" : ""
            }`}
          >
            <Link href="/create">
              <a className="nav-link">Create</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default withRouter(Header);
