import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper/index";

const currenTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const Menu = ({ history }) => {
  return (
    <div className="indre bg-dark">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link style={currenTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={currenTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currenTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currenTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard"
              >
                U.Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currenTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard"
              >
                A. Dashboard
              </Link>
            </li>
          </Fragment>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currenTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign-up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currenTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign-in
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link text-warning"
              onClick={() => {
                signout();
              }}
            >
              Sign-out
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
