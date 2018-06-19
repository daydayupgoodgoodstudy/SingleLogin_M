import { Form, Row, Col, Select, Popconfirm, Modal, Input, Button, Table, Icon, Divider, DatePicker } from "antd";
import { connect } from 'react-redux';

import { Title } from "@/components/content-header";
import { supplier_tabledata,supplier_delete,supplier_sort } from "./action";

const FormItem = Form.Item;
const Option = Select.Option;
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.confirm = this.confirm.bind(this);
        this.message_edit = this.message_edit.bind(this);
        this.message_sort = this.message_sort.bind(this);
    }
    confirm = (id) => {
        const { dispatch} = this.props;
        dispatch(supplier_delete(id))
    }
    message_sort(id) {
        const { dispatch, history } = this.props;
        dispatch(supplier_sort(id));
    }
    message_edit(row) {
        const { dispatch, history } = this.props;
        dispatch({ type: "Supplier_update/data", data: row })
        history.push("/home/supplier/update");
    }

    componentWillMount() {
        // console.log('组件渲染之后调用，只调用一次');
        const { dispatch } = this.props;
        dispatch(supplier_tabledata(1, 20))
    }

    componentWillReceiveProps() {
        console.log('组件初始化时不调用，组件接受新的props时调用');
    }
    // shouldComponentUpdate(){
    //     console.log(`react性能优化非常重要的一环。
    //     组件接受新的state或者props时调用，
    //     我们可以设置在此对比前后两个props和state是否相同，
    //     如果相同则返回false阻止更新，
    //     因为相同的属性状态一定会生成相同的dom树，
    //     这样就不需要创造新的dom树和旧的dom树进行diff算法对比，
    //     节省大量性能，
    //     尤其是在dom结构复杂的时候`)
    // }

    componentWillUpdate() {
        console.log('组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state')
    }

    componentDidUpdate() {
        console.log('组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。');
    }

    componentWillUnmount() {
        console.log('组件将要卸载时调用，一些事件监听和定时器需要在此时清除。');
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: '1',
                key: '1',
                width: "12%",
                render: (text, record, index) => {
                    return index + 1;
                }
            }, {
                title: '供应商名称',
                dataIndex: 'supplierName',
                width: "12%",
                key: '2'
            }, {
                title: '供应商key',
                dataIndex: 'supplierKey',
                width: "12%",
                key: '3'
            }, {
                title: '供应商秘钥(secret)',
                dataIndex: 'supplierSecret',
                width: "12%",
                key: '4'
            }, {
                title: '请求url',
                dataIndex: 'supplierUrl',
                width: "12%",
                key: '5'
            }, {
                title: '供应商联系方式',
                dataIndex: 'contact',
                width: "12%",
                key: '6'
            }, {
                title: '编码方式',
                dataIndex: 'encode',
                width: "12%",
                key: '7'
            }, {
                title: '操作',
                key: '8',
                width: "16%",
                render: (text, record, index) => {
                    return <div>
                        <Button onClick={() => this.message_sort(record.id)} type="primary">置顶</Button>
                        <Button  style={{ marginLeft: 8 }} onClick={() => this.message_edit(record)} type="primary">编辑</Button>
                        <Popconfirm  placement="topRight" title={`是否确认删除`} onConfirm={() => this.confirm(record.id)} okText="Yes" cancelText="No">
                            <Button style={{ marginLeft: 8 }}>删除</Button>
                        </Popconfirm>
                    </div>
                }
            }
        ];
        return (
            <React.Fragment>
                <div className="open_content">
                    <Title style={{ fontSize: "24px" }} title={`供应商管理`} />
                    <Button className="open_btn" onClick={() => this.props.history.push("/home/supplier/create")} type="primary">添加</Button>
                </div>
                <Divider />
                <Table
                    className="info_table"
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={this.props.Data}
                    loading={this.props.Loading}
                    scroll={{ x: 900, y: 500 }}
                />
            </React.Fragment>)
    }
}

function mapStateToProps(state) {
    return {
        Loading: state.Supplier.Table_Loading,
        Data: state.Supplier.Table_data
    }
}
export default connect(mapStateToProps)(Main)