import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Logged from './pages/Logged';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/listrepos/:id" component={Logged} />
            </Switch>
        </BrowserRouter>
    );
}