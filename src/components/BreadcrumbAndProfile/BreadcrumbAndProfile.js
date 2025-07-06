import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; // Integrates routing with Bootstrap components
import "./BreadcrumbAndProfile.css"; // Custom styles

function BreadcrumbAndProfile({ username, role, breadcrumbItems, pageTitle }) {
  // Default messages
  let welcomeMessage = `Welcome, ${username}`;
  let financialStatusSummary = "Here's a summary of your financial status.";

  // Customize messages based on the current page
  if (pageTitle === "Incomes") {
    welcomeMessage = `${username}, here are your incomes...`;
  } else if (pageTitle === "Expenses") {
    welcomeMessage = `${username}, here are your expenses...`;
  } else if (pageTitle === "Dashboard") {
    welcomeMessage = `Welcome back, ${username}`;
    financialStatusSummary =
      "Here's a summary of your overall financial status.";
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="custom-breadcrumb">
        {breadcrumbItems.map((item, index) => (
          <LinkContainer key={index} to={item.path} active={item.active}>
            <Breadcrumb.Item active={item.active}>{item.name}</Breadcrumb.Item>
          </LinkContainer>
        ))}
      </Breadcrumb>

      {/* Header Section with Profile Info */}
      <div className="user-info d-flex justify-content-between align-items-center">
        <h1>{pageTitle}</h1>
        <div className="profile">
          <img
            src={`${process.env.PUBLIC_URL}/images/User/2.png`}
            alt={`${username}'s avatar`}
            className="user-image"
          />
          <div>
            <strong>{username}</strong>
            <br />
            {role}
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div>
        <h3>{welcomeMessage}</h3>
        <p>{financialStatusSummary}</p>
      </div>
    </>
  );
}

export default BreadcrumbAndProfile;
