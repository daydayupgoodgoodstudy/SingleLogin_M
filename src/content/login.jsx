// import React from "react";
// import { connect } from 'react-redux';
// import { dispatch } from "rxjs/internal/observable/pairs";

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.public.name}</h1>
//                 <h1>{this.props.public.count}</h1>
//                 <button onClick={() => this.props.dispatch({ type: "ADD" })}>+</button>
//                 <button onClick={() => this.props.dispatch({ type: "DOWN" })}>-</button>
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         public: state.Public
//     }
// // }

// export default connect(mapStateToProps)(Login)