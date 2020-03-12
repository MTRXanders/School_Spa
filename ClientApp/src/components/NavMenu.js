import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Route } from 'react-router-dom';
import { AuthButton } from './AuthButton';
import { AuthService } from '../serviceManager/servicesProvider';

import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
      };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }
    pointerHandler(e) {
    console.log(e.target)
    }
    arrayComp() {
        if (AuthService.isSignedIn()) {
            const arr = [{ text: 'List', to: '/users' }, { text: 'Roles', to: '/roles' }, { text: 'Tests', to: 'tests' }]
            for (let key in arr) {
                return (<NavItem>
                    <NavLink tag={Link} className="text-dark group" to={arr[key].to}>{arr[key].text}</NavLink>
                </NavItem>
                    )
            }
        }
    }
    render() {
        const arr = [{ text: 'List', to: '/users' }, { text: 'Roles', to: '/roles' }, { text: 'Tests', to: '/tests' }];
        const arrayComp = arr.map((item, index) => {
            return (
                <NavItem key={index}>
                    <NavLink tag={Link} className="text-dark group" to={item.to}>{item.text}</NavLink>
                </NavItem>
            )
        })
        
        return (
            <header>
                <Navbar  className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">School_Spa</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>

                                {arrayComp}
                                <Route component={AuthButton}/>
                      
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
