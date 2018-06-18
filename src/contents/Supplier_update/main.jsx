import { connect } from 'react-redux';
import { Form, Row, Col, Select, Popconfirm, Modal, Input, Button, Table, Icon, Divider, DatePicker } from "antd";
import { Link, withRouter } from 'react-router-dom';
import { Supplier_update } from './action';
import { Title } from "@/components/content-header";

const FormItem = Form.Item;
const Option = Select.Option;

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
                dispatch(Supplier_update({...values,id:this.props.data.id}))
            }
        });
    }

    componentWillMount() {
        if (!Object.keys(this.props.data).length) {
            this.props.history.push("/home/supplier")
        }
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
                        label="供应商名称"
                    >
                        {getFieldDecorator('supplierName', {
                            initialValue: this.props.data.supplierName,
                            rules: [{
                                required: true, message: '请输入供应商名称！',
                            }],
                        })(
                            <Input placeholder="供应商名称为必填项" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="供应商key"
                    >
                        {getFieldDecorator('supplierKey', {
                            initialValue: this.props.data.supplierKey,
                            rules: [{
                                required: true, message: '请输入供应商key！',
                            }],
                        })(
                            <Input placeholder="供应商key为必填项" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="供应商秘钥(secret)"
                    >
                        {getFieldDecorator('supplierSecret', {
                            initialValue: this.props.data.supplierSecret,
                            rules: [{
                                required: true, message: '请输入供应商秘钥(secret)！',
                            }],
                        })(
                            <Input placeholder="供应商秘钥(secret)称为必填项" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="请求url"
                    >
                        {getFieldDecorator('supplierUrl', {
                            initialValue: this.props.data.supplierUrl,
                            rules: [{
                                required: true, message: '请输入请求url！',
                            }],
                        })(
                            <Input placeholder="请求url为必填项" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="供应商联系方式"
                    >
                        {getFieldDecorator('contact', {
                            initialValue: this.props.data.contact,
                            rules: [{
                                required: true, message: '请输入供应商联系方式！',
                            }],
                        })(
                            <Input placeholder="供应商联系方式为必填项" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="编码方式"
                    >
                        {getFieldDecorator('encode', {
                            initialValue: this.props.data.encode,
                            rules: [{
                                required: true, message: '请输入编码方式！',
                            }],
                        })(
                            <Input placeholder="编码方式为必填项" />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" loading={this.props.Loading} htmlType="submit">确认</Button>
                        <Button onClick={() => this.props.history.push("/home/supplier")} style={{ marginLeft: 8 }}>取消</Button>
                    </FormItem>
                </Form>

            </React.Fragment>)
    }
}

Main = Form.create({})(Main);

function mapStateToProps(state) {
    return {
        Loading: state.Supplier_update.btn_loading,
        data: state.Supplier_update.data,
    }
}
export default withRouter(connect(mapStateToProps)(Main))