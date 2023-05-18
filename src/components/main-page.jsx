import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getSingleDoc from "../scripts/getSingleUser";

const Mainpage = ()=>{
    const params = useParams();
    const [username, setUsername] = useState('');
    // console.log(params);

    async function thisUserDetails(){
        const username = await getSingleDoc(params.userRefId);
        // return userDetails;
        // console.log(userDetails);
        setUsername(username);
    }

    useEffect(()=>{
        // console.log(thisUserDetails());
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