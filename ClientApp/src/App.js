import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Login } from './pages/Login';
import { List } from './pages/List';
import { Authorize } from './components/Authorize';
import  Roles  from './pages/Roles';
import UserTestList from './pages/examination/UsersTestList';
import NotFoundPage from './pages/NotFoundPage';
import { UserForm } from './pages/UserForm';
import UsersTestEdit from './pages/examination/UsersTestEdit';
import './custom.css';
import './styles/UserTestList.scss';

export default class App extends Component {
   
    static displayName = App.name;
   
    render() {
        return (
            <ErrorBoundary>
                <Switch>  
                    <Route exact path='/' component={Login} />
                    <Authorize exact path='/users'><List /></Authorize>
                    <Authorize exact path='/users/edit/:id'><Route render={(routeProps) => (<UserForm {...routeProps} />)}/></ Authorize>
                    <Authorize exact path='/users/create'><Route render={(routeProps) => (<UserForm {...routeProps} />)}/></Authorize>
                    <Authorize exact path='/roles'><Roles /></Authorize>
                    <Authorize exact path='/tests'><Route render={(routeProps) => (<UserTestList {...routeProps} />)} /></Authorize>
                    <Authorize exact path='/tests/edit/:id'><Route render={(routeProps) => (<UsersTestEdit {...routeProps}/>)}/></Authorize>
                    <Authorize exact path='/tests/create'><Route render={(routeProps) => (<UsersTestEdit {...routeProps}/>)}/></Authorize>
                    <Route exact path='*' component={NotFoundPage}/>
                </Switch>
            </ErrorBoundary>
        )
    }

}
