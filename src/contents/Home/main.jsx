import React from "react"
import { Layout, Menu, Icon, Divider } from 'antd';
import { connect } from 'react-redux';
import { Route, Link, Switch, withRouter, Redirect } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import "@/asset/css/home_layout";

import Cookie from 'react-cookies';

import { Log_out } from "./action";

import { Main as Supplier } from "@/contents/Supplier";
import { Main as Supplier_create } from "@/contents/Supplier_create";
import { Main as Supplier_update } from "@/contents/Supplier_update";

import { Main as Temp } from "@/contents/Temp";
import { Main as Temp_create } from "@/contents/Temp_create";
import { Main as Temp_update } from "@/contents/Temp_update";

import { supplier_tabledata } from "@/contents/Supplier/action";
import { Temp_tabledata } from "@/contents/Temp/action";

import { Main as Change_pwd } from "@/contents/Changepwd";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: false, df: "home_userinfo", this_df: "1" }
        this.toggle = this.toggle.bind(this)
        this.handleClick = this.handleClick.bind(this);
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    handleClick = (e) => {
        const his = this.props.history;
        const { dispatch } = this.props;
        switch (e.key) {
            case "home_supplier":
                dispatch(supplier_tabledata());
                return his.push("/home/supplier");
            case "home_temp":
                dispatch(Temp_tabledata());
                return his.push("/home/temp");
            default:
                return
        }
    }


    componentWillMount() {
        let { match, history, location } = this.props;
        if (!Cookie.load("token")) {
            history.push("/login")
            return
        }
        let urlSplit = location.pathname.split("/")
        let first = urlSplit[1],
            second = urlSplit[2];
        this.handleClick({ key: `${first}_${second}` })
        this.setState({ df: `${first}_${second}` })
    }

    render() {
        return (
            <Layout className="home_layout">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">
                        <img src={require("@/asset/images/BitmapCopy.png")} width="26" height="auto" alt="" />
                        <span style={{ fontSize: 14, color: "white" }}>短信后台</span>
                    </div>
                    <Menu theme="dark" mode="inline"
                        defaultSelectedKeys={[this.state.df]}
                        onClick={this.handleClick}
                    >
                        <Menu.Item key="home_supplier">
                            <Icon type="pie-chart" />
                            <span>供应商管理</span>
                        </Menu.Item>
                        <Menu.Item key="home_temp">
                            <Icon type="desktop" />
                            <span>短信模板</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div style={{
                            display: "inlineBlock",
                            float: "right",
                            marginRight: "15px"
                        }}>
                            管理员
                            <Divider type="vertical" />
                            <Link to="/home/changepwd">修改密码</Link>
                            <Divider type="vertical" />
                            <span style={{ cursor: "pointer" }} onClick={()=>this.props.dispatch(Log_out())}>退出</span>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, minWidth: "800px", background: '#fff' }}>
                        <Route exact path="/home" render={() => <Redirect to="/home/supplier" />} />

                        <Route exact path="/home/supplier" component={Supplier} />
                        <Route exact path="/home/supplier/create" component={Supplier_create} />
                        <Route exact path="/home/supplier/update" component={Supplier_update} />

                        <Route exact path="/home/temp" component={Temp} />
                        <Route exact path="/home/temp/create" component={Temp_create} />
                        <Route exact path="/home/temp/update" component={Temp_update} />

                        <Route exact path="/home/changepwd" component={Change_pwd} />

                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(connect()(Home))