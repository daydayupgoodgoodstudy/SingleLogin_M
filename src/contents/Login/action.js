import { message } from 'antd';
import md5 from "md5";
import Cookie from 'react-cookies';
import qs from "qs";
import history from "@/history";
import config from "@/config.json";
//登录
export const login = (data) => {
    return (dispatch) => {
        dispatch({ type: "Login/login_loading_true" })
        axios({
            method: "post",
            url: `/api/sms/user/login`,
            data: qs.stringify({
                userName: data.username,
                password: md5(data.password)
            })
        })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    Cookie.save('token', data.data.token)
                    message.success("登录成功");
                    setTimeout(() => {
                        history.push('/home')
                    }, config.timeout)
                } else {
                    message.error(data.message)
                }
                dispatch({ type: "Login/login_loading_false" })
            })
            .catch(err => {
                dispatch({ type: "Login/login_loading_false" })
                message.error(err.message || "登录失败");
            })
    }
}

//修改密码
export const change_pwd = (body, history) => {
    return (dispatch) => {
        dispatch({ type: "Login/login_loading_true" })
        axios({
            method: "post",
            url: `/api/shuzhi/modifyPassword.html`,
            data: qs.stringify(body)
        })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    Cookie.remove('token')
                    history.push('/login')
                    message.success("已修改密码，请重新登录");

                } else {
                    message.error(data.message)
                }
                dispatch({ type: "Login/login_loading_false" })
            })
            .catch(err => {
                dispatch({ type: "Login/login_loading_false" })
                message.error("修改失败");
            })
    }
}

//退出登录
export const get_out = (history) => {
    return (dispatch) => {
        // dispatch({ type: "login_loading_true" })
        axios({
            method: "post",
            url: `/api/shuzhi/doLoginOut.html`,
            // data: qs.stringify(body)
        })
            .then(response => {
                let data = response.data;
                if (data.success) {
                    Cookie.remove('token')
                    history.push('/login')
                    message.success("已退出登录");
                } else {
                    message.error(data.message)
                }
            })
            .catch(err => {
                message.error("已退出登录");
            })
    }
}