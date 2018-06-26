import React from 'react';
import ReactDOM from 'react-dom';

import { NavBar, Icon, WingBlank, WhiteSpace, Checkbox, Flex, Button, List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

import { connect } from 'react-redux';
// import { Form, Icon, Checkbox, Input, Button } from 'antd';
import Header_top from "@/components/Header-top";
import Header_content from "@/components/Header-content";

import { Route, Link } from "react-router-dom";


import { login, logout, register } from './action';


import Cookie from 'react-cookies';

import style from "./Login.scss";

// const FormItem = Form.Item;

// import '@/asset/css/login';

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


const PlaceHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);

class Main extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { form, dispatch, history } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                dispatch(login(values))
            }
        });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="Login">
                <React.Fragment>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => console.log('onLeftClick')}
                    >账号登录</NavBar>
                    <WingBlank size="lg"><h1 style={{ marginTop: "18px", color: "#333333", fontSize: "22px", lineHeight: "30px" }}>账号登录</h1></WingBlank>
                    <WingBlank size="lg"><p style={{ fontSize: "14px", color: "#666", lineHeight: "20px" }}>
                        公共场所不建议自动登录，以防账号丢失</p>
                    </WingBlank>
                    <WingBlank size="lg">
                        <List>
                            <InputItem
                                {...getFieldProps('userName')}
                                placeholder="请输入手机号!"
                                type="number"
                                clear
                            >手机号</InputItem>
                        </List>
                    </WingBlank>
                    <WhiteSpace size='md' />
                    <WingBlank size="lg">
                        <List>
                            <InputItem
                                {...getFieldProps('password')}
                                placeholder="请输入密码!"
                                type="password"
                                clear
                            >密码</InputItem>
                        </List>
                    </WingBlank>
                    <WhiteSpace size='md' />
                    <WingBlank>
                        <Button type="primary" onClick={this.handleSubmit} >登录</Button>
                    </WingBlank>
                    <WhiteSpace size='md' />
                    <WingBlank>
                        <Flex justify="between" className={style.ff} >
                            <Flex.Item>
                                <AgreeItem className={style.am_checkbox_agree} data-seed="logId" onChange={e => console.log('checkbox', e)}>
                                    <span style={{
                                        fontSize: "12px",
                                        color: "#999",
                                        lineHeight: "17px",
                                    }}>自动登录</span>
                                </AgreeItem>
                            </Flex.Item>
                            <div>
                                <Link to="/changepwd">
                                    <span style={{
                                        marginRight: "10px",
                                        fontSize: "12px",
                                        color: "#999",
                                        lineHeight: "14px",
                                    }}>忘记密码</span>
                                </Link>
                                <Link to="/register">
                                    <span style={{
                                        fontSize: "12px",
                                        color: "#999",
                                        lineHeight: "14px",
                                    }}>立即注册</span>
                                </Link>
                            </div>
                        </Flex>
                    </WingBlank>
                </React.Fragment>
            </div>
        );
    }
}

Main = createForm()(Main);

function mapStateToProps(state) {
    return {
        login_n: state.Login,
    }
}

export default connect(mapStateToProps)(Main);