import { message } from "antd";
import history from "@/history";
import config from "@/config.json";
import qs from "qs";

export const Supplier_create = (data) => {
    return (dispatch) => {
        dispatch({ type: "Supplier_create/btn_loading_true" })
        axios({
            method: "put",
            url: "/api/sms/supplier/save",
            data: qs.stringify(data)
        })
            .then(response => {
                dispatch({ type: "Supplier_create/btn_loading_false" })
                if (response.data.success) {
                    message.success("创建成功")
                    setTimeout(() => { history.push("/home/supplier") }, config.timeout)
                } else {
                    message.error("创建失败")
                }
            })
            .catch(err => {
                dispatch({ type: "Supplier_create/btn_loading_false" })
                message.error(err.message || "网络错误")
            })
    }
}