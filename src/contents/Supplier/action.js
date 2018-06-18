import { message } from "antd"
//获取供应商列表
export const supplier_tabledata = () => {
    return (dispatch) => {
        dispatch({ type: "Table_Loading_true" })
        axios.get('/api/sms/supplier/getAll', {
            params: {
            }
        })
            .then(response => {
                dispatch({ type: "Table_Loading_false" })
                if (response.data.success) {
                    dispatch({ type: "Table_data", data: response.data.data })
                }else{
                    message.error("获取失败");
                }
            })
            .catch(err => {
                dispatch({ type: "Table_Loading_false" })
                message.error(err.message || "网络错误");
            })
    }
}

//删除供应商
export const supplier_delete = (id, current) => {
    return (dispatch) => {
        dispatch({ type: "Table_Loading_true" });
        axios.delete('/api/sms/supplier/delete', {
            params: {
                id
            }
        })
            .then(response => {
                dispatch({ type: "Table_Loading_false" });
                if (response.data.success) {
                    message.success("删除成功")
                    dispatch(supplier_tabledata())
                } else {
                    message.error("删除失败");
                }
            })
            .catch(err => {
                dispatch({ type: "Table_Loading_false" });
                message.error(err.message || "网络错误")
            })
    }
}

