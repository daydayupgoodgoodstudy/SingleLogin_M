const def = {
}
export default function reducers(state = def, action) {
  switch (action.type) {
case 'a':
      return { ...state }
    default:
      return state;
  }
}