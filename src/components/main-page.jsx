import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getSingleDoc from "../scripts/getSingleUser";

const Mainpage = ()=>{
    const params = useParams();
    // const navigate = useNavigate();
    const [username, setUsername] = useState('');

    async function thisUserDetails(){
        const username = await getSingleDoc(params.userRefId);
        setUsername(username);
    }

    useEffect(()=>{
        thisUserDetails();
    }, [])

    return(
        <div>
            <h1>Welcome {username}</h1>
            <Link to={'/'}><button>Logout</button></Link>
        </div>
    )
}

export default Mainpage;