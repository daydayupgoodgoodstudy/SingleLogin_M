import { message } from "antd";
import history from "@/history";
import config from "@/config.json";
import qs from "qs";

export const Temp_create = (data) => {
    return (dispatch) => {
        dispatch({ type: "Temp_create/btn_loading_true" })
        axios({
            method: "put",
            url: "/api/sms/temp/save",
            data: qs.stringify(data)
        })
            .then(response => {
                dispatch({ type: "Temp_create/btn_loading_false" })
                if (response.data.success) {
                    message.success("创建成功")
                    setTimeout(() => { history.push("/home/temp") }, config.timeout)
                } else {
                    message.error("创建失败")
                }
            })
            .catch(err => {
                dispatch({ type: "Temp_create/btn_loading_false" })
                message.error(err.message || "网络错误")
            })
    }
}