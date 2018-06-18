import { connect } from 'react-redux';
import { Form, Row, Col, Select, Popconfirm, Modal, Input, Button, Table, Icon, Divider, DatePicker } from "antd";
import { Temp_create } from './action';

import { Title } from "@/components/content-header";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, history } = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch(Temp_create(values))
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <React.Fragment>
                <div className="open_content">
                    <Title style={{ fontSize: "24px" }} title={`新增供应商`} />
                </div>
                <Divider />
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="模板编号（对外交互）"
                    >
                        {getFieldDecorator('tempNumber', {
                            rules: [{
                                required: true, message: '请输入模板编号！',
                            }],
                        })(
                            <Input placeholder="模板编号为必填项" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="短信签名"
                    >
                        {getFieldDecorator('sign', {
                            rules: [{
                                required: true, message: '请输入短信签名！',
                            }],
                        })(
                            <Input placeholder="短信签名为必填项" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="模板内容（变量以{}包含）"
                    >
                        {getFieldDecorator('content', {
                            rules: [{
                                required: true, message: '请输入模板内容（变量以{}包含）！',
                            }],
                        })(
                            <TextArea placeholder="模板内容为必填项" rows={4} />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" loading={this.props.Loading} htmlType="submit">确认</Button>
                        <Button onClick={() => this.props.history.push("/home/temp")} style={{ marginLeft: 8 }}>取消</Button>
                    </FormItem>
                </Form>

            </React.Fragment>)
    }
}

Main = Form.create({})(Main);

function mapStateToProps(state) {
    return {
        Loading: state.Temp_create.btn_loading
    }
}
export default connect(mapStateToProps)(Main)