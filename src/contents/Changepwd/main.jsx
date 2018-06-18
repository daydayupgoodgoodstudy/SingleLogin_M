import { Form, Row, Col, Select, Popconfirm, Modal, Input, Button, Table, Icon, Divider, DatePicker } from "antd";
import { connect } from 'react-redux';

import { Title } from "@/components/content-header";
import { Change_pwd } from './action';

const FormItem = Form.Item;
const Option = Select.Option;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (e) => {
        const { dispatch, history } = this.props;
        this.props.form.validateFields((err, values) => {

            let input = {
                oldPwd: md5(values["oldPwd"]),
                userName: md5(values["newPwd"]),
                password: md5(values["confirmNewPwd"]),
            }
            dispatch(change_pwd(input))
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };
        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
        };

        const { getFieldDecorator } = this.props.form;
        const _this = this
        return (
            <React.Fragment>
                <div className="open_content">
                    <Title style={{ fontSize: "24px" }} title={`新增供应商`} />
                </div>
                <Divider />
                <Form onSubmit={this.handleSubmit} >
                    <FormItem {...formItemLayout} label="旧密码">
                        {getFieldDecorator('oldPwd', {
                            rules: [{
                                required: true,
                                message: '旧密码不能为空',
                            }],
                        })(
                            <Input type="password" placeholder="请输入旧密码" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="新密码">
                        {getFieldDecorator('newPwd', {
                            rules: [{
                                required: true,
                                message: '新密码不能为空',
                            }],
                        })(
                            <Input type="password" placeholder="请输入新的密码" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="确认新密码">
                        {getFieldDecorator('confirmNewPwd', {
                            rules: [
                                {
                                    validator: (rule, value, cb) => {
                                        if (!value) {
                                            return cb(true)
                                        }
                                        if (_this.props.form.getFieldValue("newPwd") !== value) {
                                            rule.message = "新密码和旧密码不一致"
                                            return cb(true)
                                        }
                                        return cb()
                                    },
                                    required: true,
                                    message: '此处请填写新密码',
                                },
                            ],
                        })(
                            <Input type="password" placeholder="请重新输入新密码" />
                        )}
                    </FormItem>
                    <FormItem {...formTailLayout}>
                        <Button htmlType="submit" loading={this.props.Loading} type="primary" onClick={this.check}>
                            确认修改
                        </Button>
                    </FormItem>
                </Form>
            </React.Fragment>)
    }
}

Main = Form.create({})(Main);

function mapStateToProps(state) {
    return {
        Loading: state.Changepwd.btn_loading
    }
}
export default connect(mapStateToProps)(Main)