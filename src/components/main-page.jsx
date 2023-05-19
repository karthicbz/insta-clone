import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getSingleDoc from "../scripts/getSingleUser";
import allUserDetails from "../scripts/getAllUsers";

const Mainpage = ()=>{
    const params = useParams();
    // const navigate = useNavigate();
    const [username, setUsername] = useState(''); //to store current username
    let [usersToFollow, setUsersToFollow] = useState([]); //to store other user names to follow
    const [userFollowing, setUserFollowing] = useState(''); //when current user follows someone the other person name get stored here

    async function thisUserDetails(){
        const userDetails = await getSingleDoc(params.userRefId); //this one get details about current user
        setUsername(userDetails.username);
        setUserFollowing(userDetails.following);
        otherUsers(userDetails.username, userDetails.following); //invoking other user function here
    }

    async function otherUsers(name, follows){
        let followList = []
        const users = await allUserDetails(); //this one fetch all user details

        users.forEach(user=>{ //i am filtering users to follow which doesn't include current user
            if(user.username !== name && !follows.includes(user.username)){
                followList = [...followList, {username: user.username}];
            }
        })

        setUsersToFollow(followList);
    }

    useEffect(()=>{
        thisUserDetails();
    }, [])

    function handleFollow(e){
        setUserFollowing([...userFollowing, e.target.id]);
    }

    return(
        <div>
            <h1>Welcome {username}</h1>
            <Link to={'/'}><button>Logout</button></Link>
            <div className="other-users">
                <p>People you may know</p>
                {usersToFollow.map(user =>{
                    return(
                        <div key={user.username}>
                            <p className="user-name">{user.username}</p>
                            <button className="button-follow" id={user.username} onClick={handleFollow}>Follow</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Mainpage;