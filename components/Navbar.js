import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <h1>Navbar</h1>
        <Link className="navlink" href="/notes">
          Notes
        </Link>
        <Link className="navlink" href="/">
          Home
        </Link>
        <Link className="navlink" href="/reactquery">
          ReactQuery
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
