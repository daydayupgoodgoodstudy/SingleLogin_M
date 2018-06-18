const def = {
  data:{},
  btn_loading: false
}
export default function reducers(state = def, action) {
  switch (action.type) {
    case 'Supplier_update/btn_loading_false':
      return { ...state, btn_loading: false }
    case 'Supplier_update/btn_loading_true':
      return { ...state, btn_loading: true }
    case "Supplier_update/data":
      return { ...state, data: action.data }
    default:
      return state;
  }
}