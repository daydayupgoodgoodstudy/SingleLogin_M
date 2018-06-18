
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Main as Home } from "@/contents/Home";
import { Main as Login } from "@/contents/Login";



import Cookie from 'react-cookies';



class Rout extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let this_url = this.props.match.url;
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="home" />} />
                <Route path="/home" render={props => <Home />} />
                <Route path="/login" component={Login} />
            </Switch>
        )
    }
}


export default Rout