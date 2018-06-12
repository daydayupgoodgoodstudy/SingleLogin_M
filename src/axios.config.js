// import history from '../history';
// import Cookie from 'react-cookies';
// axios.interceptors.request.use(
//     config => {
//         const token = Cookie.load('token');
//         if (token) {
//             config.headers.t = token;
//             return config
//         }
//         return config
//     },
//     error => {
//         return Promise.reject(error)
// });

// axios.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     if (error.response.status == 416) {
//         Cookie.remove('token');
//         history.push("/login");
//         error.message = "请重新登录!"
//     }
//     return Promise.reject(error);
// });