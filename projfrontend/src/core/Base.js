import React from "react";
import Menu from "../core/menu";
const Base = ({
  title = "Title",
  description = "Description",
  className = "mb-auto p-8",
  children,
}) => {
  return (
    <div className="indra">
      <Menu />
      <div className="container-fluid indraq">
        <div className="jumbotron bg-dark text-center text-white mb-auto pt-3 pb-8 pl-0 pr-0">
          <h2 className="display-4">{title}</h2>
          <h4>{description}</h4>
        </div>
        <div className={className}>{children}</div>
      </div>
      {/* <footer className="footer bg-success mt-auto text-center text-white p-4">
            <h2>If you wish, we are here to help you!</h2>
            <button type="button" className="btn btn-warning">Contact Us</button>
            <br/>
            <span className="text-muted">An Amazing <span className="text-dark">MARN</span> bootcamp</span>
      </footer> */}
    </div>
  );
};

export default Base;
