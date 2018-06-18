const def = {
    login_loading: false
  }
  export default function reducers(state = def, action) {
    switch (action.type) {
      //增加计数
      case "login_loading_false":
        return { ...state, login_loading: false }
      case "login_loading_true":
        return { ...state, login_loading: true }
      case 'REGISTER':
        return { ...state, num: state.num + 1 };
      //减少计数
      case "LOGIN":
        return { ...state, ...action };
      case "LOGOUT":
        return { ...state, isLogout: action.data };
      // case "EDIT":
      //   return { ...state, name: action.success };
      case "LOGIN_ERROR":
        return { ...state, error_message: action.data }
      default:
        return state;
    }
  };