import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import { Route, Link } from "react-router-dom";
import { login, logout, register } from './action';
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
                <div className="Login_top_nav">
                    <div className="Login_top_nav_box">
                        <div className="img_box">
                            <img src={require("@/asset/images/BitmapCopy.png")} alt="" />
                        </div>
                        <span>得呗后台管理系统</span>
                    </div>
                </div>
                <div className="Login_content_model">
                    <div className="Login_content">
                        <div className="Login_content_img">
                            <img src={require("@/asset/images/Page1Copy.png")} alt="" />
                        </div>
                        <div className="Login_content_input">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input addonAfter={<Icon type="user" />} placeholder="Username" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input addonAfter={<Icon type="lock" />} type="password" placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" loading={this.props.login_n.login_loading} className="login-form-button">
                                        Log in
                                </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>

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