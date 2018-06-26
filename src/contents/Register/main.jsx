import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon, Modal, WingBlank, Toast, WhiteSpace, Checkbox, Flex, Button, List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

import { connect } from 'react-redux';
// import { Form, Icon, Checkbox, Input, Button } from 'antd';
import Header_top from "@/components/Header-top";
import Header_content from "@/components/Header-content";

import { Route, Link } from "react-router-dom";


import { login, logout, smsCode, register } from './action';


import Cookie from 'react-cookies';

import "@/asset/font/icon.css";
import style from "./Register.scss";

// const FormItem = Form.Item;

// import '@/asset/css/login';

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const Item = List.Item;


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
var captchaIns, a, SmsCodeTimer;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, code_html: 0, sumbit: true }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSmsCode = this.getSmsCode.bind(this);
        this.sumbit = this.sumbit.bind(this);
    }

    sumbit(e){
        e.preventDefault();
        const { dispatch , form } = this.props
        form.validateFields((err,values)=>{
            if(!err){
                dispatch(register({...values,
                    password:md5(values.password),
                    confirmPwd:md5(values.confirmPwd),
                    origin:1,
                    source:3
                }))
            }
        })
    }

    componentDidMount() {
        // initNECaptcha({
        //     element: '#captcha',
        //     captchaId: 'b926fc53d1714e60836bda4303bdf174',
        //     mode: 'popup',
        //     width: '320px'
        // }, function onload(instance) {
        //     captchaIns = instance
        //     console.log(instance, '---for instance---')
        //     // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
        // }, function onerror(err) {
        //     // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
        //     console.log(err, '--for err---')
        // },function onV(err,data){
        //     console.log(err,data,'-09876')
        // })
    }
    getSmsCode = (e) => {
        // captchaIns && captchaIns.refresh();
        // if(captchaIns){
        //     a = captchaIns.popUp((err,data)=>{
        //         console.log(err,data)
        //     })
        // }
        let _this = this;
        let { form, dispatch, history } = this.props;
        let mobileMessage = form.getFieldError("mobile");
        if (mobileMessage) {
            Toast.info(mobileMessage[0], 1)
            return
        }
        this.setState({ modal: true })
        initNECaptcha({
            captchaId: 'b926fc53d1714e60836bda4303bdf174',
            element: '#captcha',
            mode: 'embed',
            width: 320,
            onReady: function (instance) {
                // 验证码一切准备就绪，此时可正常使用验证码的相关功能
            },
            onVerify: function (err, data) {
                _this.setState({ modal: false })
                _this.setState({ code_html: 5 })
                let mobile = form.getFieldValue('mobile')
                SmsCodeTimer = setInterval(() => {
                    if (!_this.state.code_html) {
                        return clearInterval(SmsCodeTimer)
                    }
                    _this.setState({ code_html: _this.state.code_html - 1 })
                }, 1000)
                console.log(data,'---')
                // dispatch(smsCode({ mobile, imgCode: data.validate }))
            }
        }, function onload(instance) {
            // 初始化成功
        }, function onerror(err) {
            // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
        })
    }

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
        let errors;
        const { getFieldProps, getFieldError, getFieldValue } = this.props.form;
        return (
            <React.Fragment>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                >账号注册</NavBar>
                <WingBlank size="lg"><h1 style={{ margin: "23px 0", color: "#333333", fontSize: "22px", lineHeight: "30px" }}>注册睦合达账号</h1></WingBlank>
                <WingBlank size="lg">
                    <List>
                        <InputItem
                            {...getFieldProps('mobile', {
                                rules: [
                                    { required: true, message: "手机号不能为空" },
                                    { pattern: /^1\d{10}$/, message: "手机号格式不正确" }
                                ],
                                validateTrigger: "onBlur",
                                validateFirst: true,
                            })}
                            placeholder="建议使用常用手机!"
                            type="number"
                            clear
                        >手机号</InputItem>
                    </List>
                    {(errors = getFieldError('mobile')) ?
                        <p className={style.error_html}><i className={["iconfont", "icon-cuowu", style.i].join(" ")}></i>{errors.join(',')}</p>
                        : null}
                </WingBlank>
                <WhiteSpace size='md' />
                <WingBlank size="lg" style={{ overflow: "hidden" }}>
                    <List>
                        <InputItem
                            {...getFieldProps('smsCode', {
                                rules: [
                                    { required: true, message: "验证码不能为空" },
                                ],
                                validateTrigger: "onBlur",
                                validateFirst: true,
                            })}
                            placeholder="请输入手机验证码!"
                            type="number"
                            clear
                        >手机验证码</InputItem>
                        <Button disabled={this.state.code_html} onClick={this.getSmsCode} className={style.register_code} type="primary">{this.state.code_html || "获取验证码"}</Button>
                    </List>
                    {(errors = getFieldError('smsCode')) ?
                        <p className={style.error_html}><i className={["iconfont", "icon-cuowu", style.i].join(" ")}></i>{errors.join(',')}</p>
                        : null}
                </WingBlank>
                <WhiteSpace size='md' />
                <WingBlank size="lg">
                    <List>
                        <InputItem
                            {...getFieldProps('password', {
                                rules: [
                                    { required: true, message: "密码不能为空" }
                                ],
                                validateTrigger: "onBlur",
                                validateFirst: true,
                            })}
                            placeholder="建议使用字母与数字组合!"
                            type="password"
                            clear
                        >设置密码</InputItem>
                    </List>
                    {(errors = getFieldError('password')) ?
                        <p className={style.error_html}><i className={["iconfont", "icon-cuowu", style.i].join(" ")}></i>{errors.join(',')}</p>
                        : null}
                </WingBlank>
                <WhiteSpace size='md' />

                <WingBlank size="lg">
                    <List>
                        <InputItem
                            {...getFieldProps('confirmPwd', {
                                rules: [
                                    { required: true, message: "密码不能为空" },
                                    { type: "enum", enum: [getFieldValue("password")], message: "密码不一致" }
                                ],
                                validateTrigger: "onBlur",
                                validateFirst: true,
                            })}
                            placeholder="请再次确认密码!"
                            type="password"
                            clear
                        >确认密码</InputItem>
                    </List>
                    {(errors = getFieldError('confirmPwd')) ?
                        <p className={style.error_html}><i className={["iconfont", "icon-cuowu", style.i].join(" ")}></i>{errors.join(',')}</p>
                        : null}
                </WingBlank>
                <WhiteSpace size='md' />
                <WingBlank>
                    <Flex justify="between" className={style.ff} >
                        <Flex.Item>
                            <AgreeItem className={style.am_checkbox_agree} data-seed="logId"
                                onChange={e => this.setState({ sumbit: !e.target.checked })} >
                                <span style={{
                                    fontSize: "12px",
                                    color: "#999",
                                    lineHeight: "17px",
                                }}>阅读并同意</span><Link style={{
                                    fontSize: "12px",
                                    lineHeight: "17px"
                                }} to="">《用户服务协议》</Link>
                            </AgreeItem>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
                <WhiteSpace size='md' />
                <WingBlank>
                    <Button disabled={this.state.sumbit} onClick={this.sumbit} type="primary">立即注册</Button>
                </WingBlank>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: "100%", overflow: 'scroll' }}>
                        <div id="captcha"
                        // className={style.captchaCode}
                        ></div>
                    </div>
                </Modal>

            </React.Fragment>
        );
    }
}

Register = createForm()(Register);

function mapStateToProps(state) {
    return {
        login_n: state.Login,
    }
}

export default connect(mapStateToProps)(Register);