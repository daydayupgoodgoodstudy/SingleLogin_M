
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Main as Login } from "@/contents/Login";
import { Main as Register } from "@/contents/Register"; 
import { Main as Changepwd } from "@/contents/Changepwd";

import Cookie from 'react-cookies';



class Rout extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let this_url = this.props.match.url;
        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="login" />} />
                {/* <Route path="/home" render={props => <Home />} /> */}
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/changepwd" component={Changepwd} />
                {/* <Route path="/register" component={Register} /> */}
            </Switch>
        )
    }
}


export default Rout