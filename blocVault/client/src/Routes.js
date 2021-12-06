import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./view/LandingPage";
import Black from "./view/Black";


export default function Routes() {
    <Switch>
        <Route exact path = "/" component = {Black}/>
        <Route exact path = "/landing" component = {LandingPage}/>
        <Route
            render={function () {
              return <h1>Not Found</h1>;
            }}
        />
    </Switch>
}