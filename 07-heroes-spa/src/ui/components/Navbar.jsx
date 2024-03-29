import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { AuthProvider } from "../../auth/context/AuthProvider";

export const Navbar = () => {

  const {logout} = useContext(AuthContext);

  const navigate = useNavigate();

  const { userName } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
      <Link className="navbar-brand" to="/">
        Heroes App
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="/marvel"
          >
            Marvel
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="/dc"
          >
            DC
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="/search"
          >
            Search
          </NavLink>
          {/* <NavLink
            className={({ isActive }) =>
              `nav-item nav-link ${isActive ? "active" : ""}`
            }
            to="/hero"
          >
            Heroe
          </NavLink> */}
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-secondary">
            {userName?.name}
          </span>
          <button className="nav-item nav-link btn" onClick={onLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
