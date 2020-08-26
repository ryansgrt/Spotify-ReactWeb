import React, { Component, Fragment } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component{
    render() {
        return (
            <Fragment>
                <Nav vertical pills>
                    <NavItem>
                        <NavLink to="/" className="nav-link" active>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/genre" className="nav-link">Genres</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/album" className="nav-link">Albums</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/artist" className="nav-link">Artists</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/song" className="nav-link">Songs</NavLink>
                    </NavItem>
                </Nav>
            </Fragment>
        )
    }
}

export default Sidebar;