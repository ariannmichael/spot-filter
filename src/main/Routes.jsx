import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../views/home/Home';
import Albums from '../views/albums/Albums';
import Artists from '../views/artists/Artists';
import Login from '../views/login/Login';
import Search from '../views/search/Search';

export default props => (
    <Switch>
        <Route exact path="/login" component={Login}/>
        <Route path="/home" component={Home} />
        <Route path="/albums" component={Albums} />
        <Route path="/artists" component={Artists}/>
        <Route path="/search" component={Search} />
        <Redirect from="*" to="/login"/>
    </Switch>
);