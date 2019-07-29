import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../views/home/Home';
import Login from '../views/login/Login';

export default props => (
    <Switch>
        <Route exact path="/login" component={Login}/>
        <Route path="/home" component={Home} />
        <Redirect from="*" to="/login"/>
    </Switch>
);