import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";

import App from "../App";
import Input from "../components/Input";

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/add" exact component={Input} />
        </Switch>
    </BrowserRouter>
)