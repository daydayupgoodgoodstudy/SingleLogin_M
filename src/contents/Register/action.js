import qs from "qs";
export const smsCode = (body) => {
    console.log(body, '0987654')
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/temp/user/sms/send',
            data: qs.stringify(body)
        })
            .then(response => {
            })
            .catch(err => {
            })
    }
}

export const register = (body) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/temp/user/register',
            data: qs.stringify(body)
        })
            .then(response => {
            })
            .catch(err => {
            })
    }
}