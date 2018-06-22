import { message } from "antd";
import history from "@/history";
import config from "@/config.json";
import Cookie from 'react-cookies';
import qs from "qs";
//修改密码
export const Change_pwd = (body) => {
    return (dispatch) => {
        dispatch({ type: "Changepwd/btn_loading_true" })
        axios({
            method: "post",
            url: `/api/sms/user/updatePwd`,
            data: qs.stringify(body)
        })
            .then(response => {
                dispatch({ type: "Changepwd/btn_loading_false" })
                let data = response.data;
                if (data.success) {
                    Cookie.remove('token')
                    message.success("已修改密码，请重新登录");
                    setTimeout(() => history.push('/login'), config.timeout)
                } else {
                    message.error(data.message)
                }
            })
            .catch(err => {
                dispatch({ type: "Changepwd/btn_loading_false" })
                message.error( err.message||"修改失败");
            })
    }
}