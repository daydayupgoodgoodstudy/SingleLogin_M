import { Link } from "react-router-dom";
console.log(Link,'----------------')
export const Title = (props)=>{
    return(
        <h1 style={props.style}>{props.title}</h1>
    )
}