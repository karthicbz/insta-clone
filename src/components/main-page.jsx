import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getSingleDoc from "../scripts/getSingleUser";
import allUserDetails from "../scripts/getAllUsers";
import saveFollowing from "../scripts/saveFollows";
import styled from "styled-components";
import saveFollowers from "../scripts/saveFollowers";
import HeaderMenu from "./headerMenu";
import saveComments from "../scripts/saveComments";
import updateLikes from "../scripts/updateLikes";

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
        position: sticky;
        top: 0;
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
        position: sticky;
        top: 0;
        z-index: 2;
    }

    &>.header-menu>a{
        text-decoration: none;
    }

    &>.header-menu>a>span{
        font-size: 1.8rem;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform ease-in-out 0.5s;
    }

    &>.header-menu>a>span:hover{
        transform: rotate(360deg);
    }

    &>.main-content{
        grid-column: 1/2;
        grid-row: 2/3;
        display: grid;
        row-gap: 1rem;
        height: 100%;
        justify-items: center;
        padding: 1rem;
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
        position: sticky;
        top: 84px;
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

const PostContainer = styled.div`
    width: 450px;
    height: max-content;
    padding: 8px;
    box-shadow: 0px 1px 7px 2px rgb(202, 200, 200);
    display: flex;
    justify-content: center;
    border-radius: 8px;
    flex-direction: column;
    // align-items: center;
    gap: 8px;
    box-sizing: border-box;

    &>.user-name{
        font-weight: 600;
        background: #43a743;
        width: max-content;
        padding: 4px;
        border-radius: 8px;
        color: white;
        margin-right: 0.8rem;
        align-self: end;
    }

    &>img{
        width: 100%;
        height: 350px;
        align-self: center;
        border-radius: 8px;
    }

    &>.post-desc{
        font-size: 0.9rem;
        font-weight: 400;
        margin-left: 0.8rem;
    }

    &>.post-desc>span{
        font-size: 1rem;
        font-weight: 600;
    }

    &>.like-post{
        display: flex;
        margin-left: 8px;
        gap: 8px;
        align-items: center;

        &>span{
            color: #dfd6d6;
        }

        &>span:hover{
            cursor: pointer;
        }
    }
`;

const CommentBox = styled.div`
    display: flex;
    padding: 0 8px;
    gap: 8px;

    &>input{
        margin-right: auto;
        width: 100%;
        font-size: 0.9rem;
        padding: 5px;
        border: none;
        outline: none;
    }

    &>button{
        border: none;
        background: none;
        color: #0786f3;
        font-weight: 600;
        border-radius: 8px;
        padding: 0 4px;
        background: rgba(208, 231, 245, 0);
        transition: background ease-in-out 0.3s;
    }

    &>button:hover{
        cursor: pointer;
        background: rgba(208, 231, 245, 1);
    }

    &>button:active{
        transform: scale(0.95);
    }
`;

const CommentSection = styled.div`
    margin-left: 10px;
    height: 100px;
    overflow: auto;
    &>p{
        display: flex;
        gap: 8px;
    }

    &>p>span{
        font-weight: 600;
    }
`;

const Mainpage = ()=>{
    const params = useParams();
    // const navigate = useNavigate();
    const [username, setUsername] = useState(''); //to store current username
    let [usersToFollow, setUsersToFollow] = useState([]); //to store other user names to follow
    const [userFollowing, setUserFollowing] = useState(''); //when current user follows someone the other person name get stored here
    //and whenever user login the follows details also get stored in userfollowing
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');
    // const [likes, setLikes] = useState([]);

    function clearCommentInput(){
        document.querySelectorAll('.post-container').forEach(post=>{
            post.querySelector('.comment-section>input').value = '';
        })
    }

    async function thisUserDetails(){
        const userDetails = await getSingleDoc(params.userRefId); //this one get details about current user
        setUsername(userDetails.username);
        setUserFollowing(userDetails.following);
        otherUsers(userDetails.username, userDetails.following); //invoking other user function here
        showPosts(userDetails.username, userDetails.following);
        clearCommentInput();
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

    async function showPosts(name, follows){
        let postDetails = [];
        const users = await allUserDetails();
        users.forEach(user=>{
            if(user.username === name || follows.includes(user.username)){
                if(user.posts.length !== 0){
                    // postDetails = [...postDetails, {posts: user.posts}]
                    user.posts.forEach(post=>{
                        // console.log({post: post});
                        postDetails = [...postDetails, {name: user.username, post: post}]
                    })
                }
            }
        })
        setPosts(postDetails);
    }

    useEffect(()=>{
        thisUserDetails(); //this function updates the ui everytime user follows other users and put new post.
    }, [])

    async function handleFollow(e){
        // setUserFollowing([...userFollowing, e.target.id]);
        await saveFollowing(params.userRefId, [...userFollowing, e.target.id]); //when user click follows the followed user added into userfollowing
        //which already contains user follows details it get fetched on load and both get merged into firebase
        saveFollowers(username, e.target.parentNode.id);
        thisUserDetails();
    }
    
    function getCommentText(e){
        setComment(e.target.value);
    }

    async function handleComment(e){
        if(comment != ''){
        await saveComments(e.target.parentNode.parentNode.id, username, comment, e.target.parentNode.id);
        // document.querySelector('.comment-section>input').value = '';
        thisUserDetails();
        }else{
            alert('Empty comment..')
        }
    }

    async function changeHeartColor(e){
        e.target.classList.toggle('colored-heart');
        await updateLikes(e.target.parentNode.parentNode.id, username, e.target.id);
        thisUserDetails();
    }

    return(
        <Grid className="main-page">
            {/* <h1>Welcome {username}</h1> */}
            <HeaderMenu username={username} userRefId={params.userRefId}/>
            <div className="main-content">
                {posts.sort((a,b)=>b.post.created - a.post.created).map(post=>{
                    return(
                        <PostContainer id={post.post.postId} key={post.post.postId} className="post-container">
                            <p className="user-name">{post.name}</p>
                            <img src={post.post.imgUrl} alt="post image"/>
                            <p className="post-desc"><span>{post.name+' '}</span>{post.post.description}</p>
                            <CommentSection>
                            {post.post.comments.length !== 0 ?post.post.comments.map(comment=>{
                                return(
                                    <p><span>{comment.user}</span>{comment.comment}</p>
                                )
                            }):<p>No comments yet..</p>}
                            </CommentSection>
                            <p className="like-post">{post.post.likes.includes(username)
                            ?<span className="material-symbols-outlined colored-heart" id={post.post.userId} onClick={changeHeartColor}>favorite</span>
                            :<span className="material-symbols-outlined" id={post.post.userId} onClick={changeHeartColor}>favorite</span>}{post.post.likes.length} likes</p>
                            <CommentBox className="comment-section" id={post.post.userId}>
                                <input type="text" placeholder="your comment.." onChange={getCommentText}/>
                                <button onClick={handleComment}>Comment</button>
                            </CommentBox>
                        </PostContainer>
                    )
                })}
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