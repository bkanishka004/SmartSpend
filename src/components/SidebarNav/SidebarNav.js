// SidebarNav.js
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faWallet,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import "./SidebarNav.css";

function SidebarNav() {
  return (
    <Nav className="flex-column fixed">
      {/* Logo linking to dashboard */}
      <Link to="/dashboard">
        <img
          src={`${process.env.PUBLIC_URL}/images/Logo/jiyo.png`}
          alt="Bee Finance Logo"
          className="logo-img"
        />
      </Link>

      {/* Navigation Links */}
      <Nav.Link as={Link} to="/dashboard">
        <FontAwesomeIcon icon={faHome} className="nav-icon" /> Dashboard
      </Nav.Link>
      <Nav.Link as={Link} to="/incomes">
        <FontAwesomeIcon icon={faDollarSign} className="nav-icon" /> Incomes
      </Nav.Link>
      <Nav.Link as={Link} to="/expenses">
        <FontAwesomeIcon icon={faWallet} className="nav-icon" /> Expenses
      </Nav.Link>

      {/* Sign Out Link */}
      <Nav.Link as={Link} to="/signout" className="exit-link">
        Sign Out
      </Nav.Link>

      {/* Optional Credit or GitHub Link */}
      <a
        href="https://github.com/bkanishka004"
        className="github-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} /> View on GitHub
      </a>
    </Nav>
  );
}

export default SidebarNav;
