import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import List from "../admin/list";
import AdminEdit from "../admin/edit";
import AdminNew from "../admin/new";

// Have AdminRouteGroup return an array of components.
const AdminRouteGroup = ({ contentType }) => [
    <Route
        exact
        path={`/admin/${contentType}`}
        key={`/admin/${contentType}`}
        render={routeProps => (
            <AdminList contentType={contentType} {...routeProps} />
        )}
    />,
    <Route
        exact
        path={`/admin/${contentType}/new`}
        key={`/admin/${contentType}/new`}
        render={routeProps => (
            <AdminNew contentType={contentType} {...routeProps} />
        )}
    />,
    <Route
        path={`/admin/${contentType}/:id`}
        key={`/admin/${contentType}/:id`}
        render={routeProps => (
            <AdminEdit contentType={contentType} {...routeProps} />
        )}
    />
];

// Render the components directly.
const App = () => (
    <Router>
        <Switch>
            {AdminRouteGroup({ contentType: "pages" })}
            {AdminRouteGroup({ contentType: "posts" })}
        </Switch>
    </Router>
);

export default App;
