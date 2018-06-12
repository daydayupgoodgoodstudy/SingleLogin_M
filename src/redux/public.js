const initialState = {
    count: 1,
    name: "czg"

}


export default function (state = initialState, action) {
    console.log(state,'=-0987')
    switch (action.type) {
        case 'ADD': {
            return Object.assign({}, state, {count:state.count+1});
        }
        case 'DOWN': {
            return Object.assign({}, state, {count:state.count-1});
        }

        default: return state;
    }
}