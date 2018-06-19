const def = {
    login_loading: false
  }
  export default function reducers(state = def, action) {
    switch (action.type) {
      case "Login/login_loading_false":
        return { ...state, login_loading: false }
      case "Login/login_loading_true":
        return { ...state, login_loading: true }
      case 'REGISTER':
        return { ...state, num: state.num + 1 };
      default:
        return state;
    }
  };