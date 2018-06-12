//登录
export const login = (data, history) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: `/api/shuzhi/login.html`,
            data: {}
        })
            .then(response => {
                let data = response.data;

            })
            .catch(err => {
            })
    }
}