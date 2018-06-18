import { message } from "antd"
export const Temp_tabledata = () => {
    return (dispatch) => {
        dispatch({ type: "Temp/Table_Loading_true" })
        axios.get('/api/sms/temp/getAll', {
        })
            .then(response => {
                dispatch({ type: "Temp/Table_Loading_false" })
                if (response.data.success) {
                    dispatch({ type: "Temp/Table_data", data: response.data.data })
                } else {
                    message.error("获取失败");
                }
            })
            .catch(err => {
                dispatch({ type: "Temp/Table_Loading_false" })
                message.error(err.message || "网络错误");
            })
    }
}

export const Temp_delete = (id) => {
    return (dispatch) => {
        dispatch({ type: "Temp/Table_Loading_true" });
        axios.delete('/api/sms/temp/delete', {
            params: {
                id
            }
        })
            .then(response => {
                dispatch({ type: "Temp/Table_Loading_false" });
                if (response.data.success) {
                    message.success("删除成功")
                    dispatch(Temp_tabledata())
                } else {
                    message.error("删除失败");
                }
            })
            .catch(err => {
                dispatch({ type: "Temp/Table_Loading_false" });
                message.error(err.message || "网络错误")
            })
    }
}