import React, { Component } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Route, Switch } from 'react-router';
import { Login } from './components/Login';
import { List }  from './components/List';
import { Authorize } from './components/Authorize';
import  Roles  from './components/Roles';
import RestUtilities from './services/RestUtilities';
import AuthServices from './services/AuthServices';
import RolesService from './services/RolesService';
import UsersService from './services/UsersService';

import './styles/login.scss';
import './custom.css';
import NotFoundPage from './components/NotFoundPage';
import { UserForm } from './components/UserForm';

export const AuthService = new AuthServices(); 
export const Rest = new RestUtilities();
export const RoleService = new RolesService();
export const UserService = new UsersService();

export default class App extends Component {
   
    static displayName = App.name;
   
  
    render() {
        return (
            <ErrorBoundary>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Authorize path='/userlist'><List /></Authorize>
                    <Authorize path='/users/edit/:id'><Route render={(routeProps) => (<UserForm {...routeProps} />)} /> </ Authorize>
                    <Authorize path='/users/create'><Route render={(routeProps) => (<UserForm {...routeProps} />)} /></Authorize>
                    <Authorize path='/roleslist'><Roles /></Authorize>
                    <Route exact path='*' component={NotFoundPage} />
                </Switch>
            </ErrorBoundary>
        )
    }

}
