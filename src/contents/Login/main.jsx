import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Icon, Checkbox, Input, Button } from 'antd';
import Header_top from "@/components/Header-top";
import Header_content from "@/components/Header-content";

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
                <Header_top />
                <Header_content>
                    <div className="Login_content_img">
                        <img src={require("@/asset/images/Page1Copy.png")} alt="" />
                    </div>
                    <div className="Login_content_input">
                        <h1>账号登录</h1>
                        <p>公共产所不建议自动登录,以防账号丢失</p>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '手机号填写错误!' }],
                                })(
                                    <Input placeholder="手机号" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '密码错误!' }],
                                })(
                                    <Input type="password" placeholder="登录密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" loading={this.props.login_n.login_loading} className="login-form-button">
                                    Log in
                                </Button>
                            </FormItem>
                            <FormItem>
                                <Checkbox className="login-form-left">自动登录</Checkbox>
                                <span className="login-form-right">忘记密码</span>
                                <span className="login-form-right">立即注册</span>
                            </FormItem>
                        </Form>
                    </div>
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