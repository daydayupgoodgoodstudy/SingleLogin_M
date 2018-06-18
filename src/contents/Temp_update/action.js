import { message } from "antd";
import config from "@/config.json";
import history from "@/history";
import qs from "qs";

export const Temp_update = (data) => {
    return (dispatch) => {
        dispatch({type:"Temp_update/btn_loading_true"});
        axios({
            method:"put",
            url:'/api/sms/temp/update',
            data: qs.stringify(data)
        })
        .then(response => {
            dispatch({type:"Temp_update/btn_loading_false"});
            if(response.data.success){
                message.success("编辑成功");
                setTimeout(()=>history.push("/home/temp"),config.timeout);
            }else{
                message.error("编辑失败");
            }
        })
        .catch(err => {
            dispatch({type:"Temp_update/btn_loading_false"});
            message.error(err.message||"网络异常!")
        })
    }
}