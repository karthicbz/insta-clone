import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getSingleDoc from "../scripts/getSingleUser";
import allUserDetails from "../scripts/getAllUsers";
import saveFollowing from "../scripts/saveFollows";
import styled from "styled-components";
import saveFollowers from "../scripts/saveFollowers";

const Grid = styled.div`
    display: grid;
    grid-template: max-content 1fr/80% 1fr;
    align-items: center;
    height: 100%;
    width: 100%;

    &>p{
        grid-column: 1/2;
        grid-row: 1/2;
        font-size: 2rem;
        font-family: 'Pacifico', cursive;
        align-self: center;
        padding-left: 2rem;
        background: wheat;
        padding: 5px 0px 5px 2rem;
    }

    &>.header-menu{
        grid-column: 2/3;
        grid-row: 1/2;
        display: flex;
        gap: 2rem;
        justify-content: center;
        height: 100%;
        align-items: center;
        background:wheat;
    }

    &>.main-content{
        grid-column: 1/2;
        grid-row: 2/3;
    }

    &>.other-users{
        grid-column: 2/3;
        grid-row: 2/3;
        height: max-content;
        padding: 1rem;
        border-radius: 8px;
        // border: 1px solid gray;
        justify-self: center;
        align-self: start;
        box-shadow: 0px 1px 3px 1px #cac7c7;
        margin-top: 1rem;
    }

    &>.other-users>p{
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 8px;
    }

    &>.other-users>div{
        display: flex;
        gap: 10px;
        padding: 8px 0;
        align-items: center;
        width: 200px;
    }
`;

const FollowButton = styled.button`
    padding: 5px;
    border: none;
    background: rgb(67, 167, 67);
    color: white;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 0px 1px 3px 1px #cac7c7;
    margin-left: auto;

    &:hover{
        cursor: pointer;
        background-color: green;
    }

    &:active{
        transform: scale(0.95);
    }
`;


const Mainpage = ()=>{
    const params = useParams();
    // const navigate = useNavigate();
    const [username, setUsername] = useState(''); //to store current username
    let [usersToFollow, setUsersToFollow] = useState([]); //to store other user names to follow
    const [userFollowing, setUserFollowing] = useState(''); //when current user follows someone the other person name get stored here
    //and whenever user login the follows details also get stored in userfollowing

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
                followList = [...followList, {username: user.username, userId: user.refId}];//i am getting user refId so that it would be easy to save followers
            }
        })

        setUsersToFollow(followList);
    }

    useEffect(()=>{
        thisUserDetails();
    }, [])

    async function handleFollow(e){
        // setUserFollowing([...userFollowing, e.target.id]);
        await saveFollowing(params.userRefId, [...userFollowing, e.target.id]); //when user click follows the followed user added into userfollowing
        //which already contains user follows details it get fetched on load and both get merged into firebase
        saveFollowers(username, e.target.parentNode.id);
        thisUserDetails();
    }

    return(
        <Grid className="main-page">
            {/* <h1>Welcome {username}</h1> */}
            <p>Instagram</p>
            <div className="header-menu">
                <Link to={'/newpost'} state={{refId:params.userRefId}}><span className="material-symbols-outlined">add_circle</span></Link>
                <span className="material-symbols-outlined">home</span>
                <Link to={'/'}><span className="material-symbols-outlined">logout</span></Link>
                <img src="#"/>
            </div>
            <div className="main-content">
            </div>
            <div className="other-users">
                <p>People you may know</p>
                {usersToFollow.map(user =>{
                    return(
                        <div key={user.username} id={user.userId}>
                            <p className="user-name">{user.username}</p>
                            <FollowButton className="button-follow" id={user.username} onClick={handleFollow}>Follow</FollowButton>
                        </div>
                    )
                })}
            </div>
        </Grid>
    )
}

export default Mainpage;