import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Icon,Checkbox ,Input, Button } from 'antd';
import { Route, Link } from "react-router-dom";
import { login, logout, register } from './action';
import  Header_top  from "@/components/Header-top";
import  Header_content from "@/components/Header-content";

import Cookie from 'react-cookies';

const FormItem = Form.Item;

import '@/asset/css/login';


class Login extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let { form, dispatch, history } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                let output = {
                    username: values.username,
                    password: values.password
                }
                dispatch(login(output, history))
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="Login">
               <Header_top />
               <Header_content>
               </Header_content>
            </div>
        );
    }
}

Login = Form.create({})(Login);

function mapStateToProps(state) {
    return {
        login_n: state.Login,
    }
}

export default connect(mapStateToProps)(Login);