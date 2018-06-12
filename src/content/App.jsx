import React from "react";
import { connect } from 'react-redux';
import { login } from "../action/login.js";


class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>{this.props.public.name}</h1>
                <h1>{this.props.public.count}</h1>
                <button onClick={() => this.props.dispatch({ type: "ADD" })}>+</button>
                <button onClick={() => this.props.dispatch({ type: "DOWN" })}>-</button>
                <button onClick={()=>this.props.dispatch(login())}>登录</button> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state, '-098')
    return {
        public: state.Public
    }
}

export default connect(mapStateToProps)(App)