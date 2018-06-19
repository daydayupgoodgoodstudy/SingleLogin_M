import { message } from "antd";
import history from "@/history";
import Cookie from 'react-cookies';
import qs from "qs";
//退出登录
export const Log_out = () => {
    return (dispatch) => {
        axios({
            method: "post",
            url: `/api/sms/user/loginOut`,
            data: qs.stringify({ userName: "xxx" })
        })
            .then(response => {
                Cookie.remove('token')
                history.push('/login')
                message.success("已退出登录");
            })
            .catch(err => {
                Cookie.remove('token')
                history.push('/login')
                message.error("已退出登录");
            })
    }
}
