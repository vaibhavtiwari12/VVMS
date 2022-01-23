import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <Navbar color="primary" dark expand="md" light className="p-3">
        <NavbarBrand href="/">VVMS</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Purchaser</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/kisan">Kisan</NavLink>
            </NavItem>
          </Nav>
          <Button color="primary">Sign In</Button>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
