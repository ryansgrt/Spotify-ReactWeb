import React, { Component, Fragment } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleNavbar = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    render() {
        const { isOpen } = this.state;
        return (
            <Fragment>
                <Navbar dark color='dark'>
                    <NavbarBrand href="/" className="mr-auto" color='primary'>IndoXXI</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2 d-sm-none d-md-none d-lg-none d-xl-none "></NavbarToggler>
                    <Collapse isOpen={!isOpen} navbar className='d-sm-none d-md-none d-lg-none d-xl-none'>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/genre">Genres</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/album">Albums</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/artist">Artists</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/song">Songs</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment>
        )
    }
}

export default Header;

