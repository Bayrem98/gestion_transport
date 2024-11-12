import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const Navbard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="">
        <Navbar color="light">
          <NavbarBrand href="/" style={{ color: "red" }}>
            Gestion Transport
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/ajouters">Ajouter Salarie</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/depart">Feuille Départ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/ramassage">Feuille Ramassage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Recap Transport</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};
export default Navbard;
