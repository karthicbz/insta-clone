import { Link } from "react-router-dom";

const HeaderMenu = ({username, userRefId})=>{
    return(
        <>
        <p>Instagram</p>
        <div className="header-menu">
            <Link to={'/newpost'} state={{refId:userRefId, username: username}}><span className="material-symbols-outlined">add_circle</span></Link>
            {/* <span className="material-symbols-outlined">home</span> */}
            <Link to={`/${userRefId}`}><span className="material-symbols-outlined">home</span></Link>
            <Link to={'/'}><span className="material-symbols-outlined">logout</span></Link>
            <Link to={'/profile'} state={{refId:userRefId, username: username}}><p>{username}</p></Link>
        </div>
        </>
    );
}

export default HeaderMenu;