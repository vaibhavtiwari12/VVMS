import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "./no-bg.svg";
const NavBar = ({ isAuthenticated, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  const handleLogOut = () => {
    logout();
  };

  const toggelDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <Navbar color="primary" dark expand="md" light className="p-3">
        <NavbarBrand>
          <Link className="link-no-decoration text-white" to="/">
            <img className="logo" src={logo} alt="MahrajVegetables" />
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="" navbar>
            <NavItem className="ps-2">
              <Link className="link-no-decoration text-white" to="/">
                Purchaser
              </Link>
            </NavItem>
            <NavItem className="ps-2">
              <Link className="link-no-decoration text-white" to="/kisan">
                Kisan
              </Link>
            </NavItem>
            <NavItem className="ps-2">
              <Link className="link-no-decoration text-white" to="/Report">
                Report
              </Link>
            </NavItem>
          </Nav>
          <Nav className="d-flex justify-content-end flex-fill" navbar>
            {isAuthenticated === "TRUE" ? (
              <div className="text-white">
                <ButtonDropdown
                  color="primary"
                  isOpen={dropdownOpen}
                  toggle={toggelDropDown}
                >
                  <DropdownToggle color="primary" caret>
                    <span className="capitalize">
                      Hello {window.sessionStorage.getItem("userName")}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleLogOut}>Logout</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            ) : (
              <NavItem className="ps-2">
                <NavLink>
                  <Link className="link-no-decoration text-white" to="/Login">
                    Sign In
                  </Link>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
