import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AuthService } from "../serviceManager/servicesProvider";
const { Component } = React;

export class AuthButton extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.logIn = this.logIn.bind(this);
    }
    logIn() {
        this.props.history.push('/');
    }
    logOut() {
       this.props.history.push('/');
        AuthService.signOut()
    }
    render() {
        return AuthService.isSignedIn() ? (
                <NavItem>
                    <NavLink className="text-dark hover" onClick={this.logOut}>LogOut</NavLink>
               </NavItem>
        ) : <NavItem >
                <NavLink className="text-dark hover" onClick={this.logIn}>Log in</NavLink>
            </NavItem>
    }
 }        