import { Link } from "react-router-dom";
import "./Header-top.scss";
export const Header_top = (props) => {
    return (
        <React.Fragment>
            <div className="Login_top_nav">
                <div className="Login_top_nav_box">
                    <div className="img_box">
                        <img src={require("@/asset/images/muheda.png")} alt="" />
                    </div>
                    <span>睦合达 | 股票代码: 836801</span>
                    <span className="Login-left">首页</span>
                </div>
            </div>
        </React.Fragment>
    )
}



