import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
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
const NavBar = ({ isAuthenticated, logout, changelanguage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLanguageEnglish, setIsLanguageEnglish] = useState(true);
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

  const handleLanguageChange = () => {
    setIsLanguageEnglish((isLanguageEnglish) => !isLanguageEnglish);
  };

  useEffect(() => {
    console.log("Language Change ", isLanguageEnglish);
    changelanguage(isLanguageEnglish);
  }, [isLanguageEnglish]);

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
            <NavItem className="ps-3">
              <Link className="link-no-decoration text-white" to="/">
                <FormattedMessage id="purchaser" />
              </Link>
            </NavItem>
            <NavItem className="ps-3">
              <Link className="link-no-decoration text-white" to="/kisan">
                <FormattedMessage id="kisan" />
              </Link>
            </NavItem>
            <NavItem className="ps-3">
              <Link className="link-no-decoration text-white" to="/Report">
                <FormattedMessage id="report" />
              </Link>
            </NavItem>
          </Nav>
          <Nav className="d-flex justify-content-end flex-fill" navbar>
            <div className="mt-1">
              <label class="toggle-switch">
                <input
                  type="checkbox"
                  name="toggleSwitch"
                  class="toggle-switch__checkbox"
                  id="myToggleSwitch"
                  onChange={handleLanguageChange}
                  checked={isLanguageEnglish}
                />
                <span class="toggle-switch__label">
                  <span class="toggle-switch__inner"></span>
                </span>
              </label>
            </div>

            {isAuthenticated === "TRUE" ? (
              <div className="text-white">
                <ButtonDropdown
                  color="primary"
                  isOpen={dropdownOpen}
                  toggle={toggelDropDown}
                >
                  <DropdownToggle color="primary" caret>
                    <span className="capitalize">
                      <FormattedMessage id="hello" />{" "}
                      {window.sessionStorage.getItem("userName")}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleLogOut}>
                      <FormattedMessage id="logout" />
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            ) : (
              <NavItem className="ps-3">
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
