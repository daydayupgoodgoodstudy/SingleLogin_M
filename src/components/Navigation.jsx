import React from "react"
import { Layout, Menu, Icon, Divider } from 'antd';
import { connect } from 'react-redux';
import { Route, Link, Switch, withRouter, Redirect } from "react-router-dom";
import "../asset/css/home_layout";

import Cookie from 'react-cookies';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: false, df: "home_userinfo", this_df: "1" }
        this.toggle = this.toggle.bind(this)
        this.handleClick = this.handleClick.bind(this);
        this.getout = this.getout.bind(this);
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    
    handleClick = (e) => {
        const his = this.props.history;
        const { dispatch } = this.props;
        this.setState({
            this_df: e.key
        })
        const state = this.state.this_df;
        // if(state == e.key){
        //     if(["2","3","4","5","6","7"].includes(e.key)){
        //         dispatch({type:"clear"})
        //     }

        //     return
        // }
        // 此处dispatch是点击左边导航刷新页面 
        switch (e.key) {
            case "home_userinfo":
                dispatch({ type: "changeCurrent_user", data: 1 })
                dispatch(info_data(1, 20));
                return his.push("/home/userinfo");
            case "2":
                return his.push("/home/openscreen");
            case "home_messages":
                dispatch({ type: "changeCurrent", data: 1 })
                dispatch({ type: "changeActiveKey", data: "1" });
                dispatch(message_data(1, 20, "/api/shuzhi/message/system.html"));
                return his.push("/home/messages");
            case "home_carousel":
                dispatch({ type: "changeCurrent", data: 1 })
                dispatch(carousel_data(1, 20));
                return his.push("/home/carousel");
            case "5":
                return his.push("/home/lifeservice");
            case "home_convertibility":
                dispatch({ type: "changeCurrent", data: 1 })
                dispatch(convertibility_data(1, 20));
                return his.push("/home/convertibility");
            case "home_dataserver":
                dispatch({ type: "changeCurrent", data: 1 })
                dispatch({ type: "changeActiveKey", data: "1" });
                dispatch(dataserver_data(1, 20, 1));
                return his.push("/home/dataserver");
            case "home_worldcup":
                dispatch({ type: "world_current", data: 1 })
                dispatch(Worldcup_data(1, 20));
                return his.push("/home/worldcup");

            default:
                return
        }
    }


    componentWillMount() {
        let { match, history, location } = this.props;
        if (!Cookie.load("t")) {
            history.push("/login")
            return
        }
        //首次加载侧边栏时根据 url 来判断默认值的位置 
        //以及默认获取页面的数据
        let urlSplit = location.pathname.split("/")
        let first = urlSplit[1],
            second = urlSplit[2];
        this.handleClick({ key: `${first}_${second}` })
        this.setState({ df: `${first}_${second}` })
    }
    getout() {
        const { dispatch, history } = this.props;
        dispatch(get_out(history))
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
                        <img src={require("../asset/images/BitmapCopy.png")} width="26" height="auto" alt="" />
                        <span style={{ fontSize: 14, color: "white" }}>得呗后台管理系统</span>
                    </div>
                    <Menu theme="dark" mode="inline"
                        defaultSelectedKeys={[this.state.df]}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                        onClick={this.handleClick}
                    >
                        <SubMenu
                            key="sub1"
                            title={<span className={this.state.collapsed ? "icon_none" : "icon_hidden"} ><img src={require("../asset/images/png5.png")} alt="" /><span className={this.state.collapsed ? "icon_none" : "icon_hidden"}>用户中心</span></span>}
                        >
                            <Menu.Item key="home_userinfo" ><img style={{ width: "14px", height: "14px" }} src={require("../asset/images/png6.png")} alt="" /> <span style={{ marginLeft: "8px" }}>用户信息统计</span></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span className={this.state.collapsed ? "icon_none" : "icon_hidden"} ><img src={require("../asset/images/png1.png")} alt="" /><span className={this.state.collapsed ? "icon_none" : "icon_hidden"}>运营管理</span></span>}
                        >
                            {/* <Menu.Item key="2">开屏页设置</Menu.Item> */}
                            <Menu.Item key="home_messages"><img style={{ width: "14px", height: "14px" }} src={require("../asset/images/png2.png")} alt="" /> <span style={{ marginLeft: "8px" }}>消息管理</span></Menu.Item>
                            <Menu.Item key="home_carousel"><img style={{ width: "14px", height: "14px" }} src={require("../asset/images/png3.png")} alt="" /><span style={{ marginLeft: "8px" }}>轮播图设置</span></Menu.Item>
                            {/* <Menu.Item key="5">生活服务应用管理</Menu.Item> */}
                            <Menu.Item key="home_convertibility"><img style={{ width: "14px", height: "14px" }} src={require("../asset/images/png4.png")} alt="" /><span style={{ marginLeft: "8px" }}>积分兑换列表</span></Menu.Item>
                            <Menu.Item key="home_dataserver"><img style={{ width: "14px", height: "14px" }} src={require("../asset/images/png1.png")} alt="" /><span style={{ marginLeft: "8px" }}>定制数据服务客户列表</span></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span className={this.state.collapsed ? "icon_none" : "icon_hidden"} ><img src={require("../asset/images/png1.png")} alt="" /><span className={this.state.collapsed ? "icon_none" : "icon_hidden"}>世界杯</span></span>}
                        >
                            <Menu.Item key="home_worldcup"><img style={{ width: "14px", height: "14px" }} src={require("../asset/images/png1.png")} alt="" /><span style={{ marginLeft: "8px" }}>赛程管理</span></Menu.Item>
                        </SubMenu>
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
                            <span style={{ cursor: "pointer" }} onClick={this.getout}>退出</span>
                        </div>

                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, minWidth: "800px", background: '#fff' }}>
                        <Route exact path="/home" render={() => <Redirect to="/home/userinfo" />} />

                        {/* 用户信息统计 */}
                        <Route exact path="/home/userinfo" component={Userinfo} />
                        <Route exact path="/home/userinfo/infoasset" component={Infoasset} />

                        {/* 开屏页设置 */}
                        <Route exact path="/home/openscreen" component={Openscreen} />
                        <Route exact path="/home/openscreen/create" component={Openscreen_create} />
                        <Route exact path="/home/openscreen/edit" component={Openscreen_edit} />

                        {/* 消息管理 */}
                        <Route exact path="/home/messages" component={Messages} />
                        <Route exact path="/home/messages/create" component={Messages_create} />
                        <Route exact path="/home/messages/edit" component={Messages_eidt} />

                        {/* 轮播图设置 */}
                        <Route exact path="/home/carousel" component={Carousel} />
                        <Route exact path="/home/carousel/create" component={Carousel_create} />
                        <Route exact path="/home/carousel/edit" component={Carousel_edit} />

                        {/* 生活服务应用管理 */}
                        <Route exact path="/home/lifeservice" component={Lifeservice} />
                        <Route exact path="/home/lifeservice/edit" component={Lifeservice_edit} />

                        {/* 积分兑换列表 */}
                        <Route exact path="/home/convertibility" component={Convertibility} />

                        {/* 定制数据服务客户列表 */}
                        <Route exact path="/home/dataserver" component={DataServer} />
                        <Route exact path="/home/dataserver/check" component={DataServer_check} />

                        {/* 世界杯 */}
                        <Route exact path="/home/worldcup" component={WorldCup} />


                        {/* 修该密码 */}
                        <Route exact path="/home/changepwd" component={Changepwd} />


                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(connect()(Navigation))