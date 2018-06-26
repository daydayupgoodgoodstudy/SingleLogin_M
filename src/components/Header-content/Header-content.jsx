import { Link } from "react-router-dom";
// import "./Header-content.scss";
export const Header_content = (props) => {
    return (
        <React.Fragment>
            <div className="Login_content_model">
                <div className="Login_content">
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    )
}


