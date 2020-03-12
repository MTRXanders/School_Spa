import React from 'react';
import { AuthService } from "../serviceManager/servicesProvider";
import { Route, Redirect } from 'react-router-dom';

export const Authorize = ({children,...rest })=>{
    const v = AuthService.isSignedIn();
    return (
            <Route {...rest} render={
                (routeprops) => v ? (children)
                    : (<Redirect to={{ pathname: "/", state: { from: routeprops.location } }} />
                    )}
            />
        );
    
}