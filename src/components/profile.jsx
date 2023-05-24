import { useLocation } from "react-router-dom"
import HeaderMenu from "./headerMenu";
import { Grid } from "./main-page";
import styled from "styled-components";
import getSingleDoc from "../scripts/getSingleUser";
import { useState, useEffect } from "react";
import Loader from "./loader";

const ProfileGrid = styled(Grid)`
    &>.profile-section{
        grid-column: 1/3;
        grid-row: 2/3;
        height: 100%;
        display: grid;
        grid-template: 10% 90%/1fr;
    }

    &>.profile-section>.user-name{
        grid-column: 1/2;
        grid-row: 1/2;
        display: grid;
        justify-items: center;
        align-items: center;
        font-size: 2rem;

        &>p{
            font-family: 'Pacifico', cursive;
        }
    }

    &>.profile-section>.profile-details{
        grid-column: 1/2;
        grid-row: 2/3;
        display: grid;
        grid-template: 10% 90%/1fr;
        // justify-items: center;
    }

    &>.profile-section>.profile-details>.profile-menu{
        grid-column: 1/2;
        grid-row: 1/2;
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        justify-content: center;
        text-align: center;
    }

    &>.profile-section>.profile-details>.profile-menu>p{
        width: 100px;
        background: rgba(124, 184, 239, 0);
        border-top: 1px solid rgb(124, 184, 239);
        // border-radius: 8px;
        // color: aliceblue;
        padding: 4px;
        font-weight: 600;
        font-size: 0.9rem;
        transition: background ease-in-out 0.3s;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;

        &:hover{
            background: rgba(124, 184, 239, 1);
            color: aliceblue;
            cursor: pointer;
        }
    }

    &>.profile-section>.profile-details>.profile-menu>p>span{
        font-weight: 400;
    }

    &>.profile-section>.profile-details>.posted-image>img{
        width: 250px;
        height: 250px;
        border-radius: 8px;
    }

    &>.profile-section>.profile-details>.posted-image{
        grid-column: 1/2;
        grid-row: 2/3;
        display: grid;
        grid-template-rows: repeat(auto-fit, min(300px));
        grid-template-columns: repeat(auto-fit, min(300px));
        gap: 4px;
        justify-items: center;
        align-items: center;
        // justify-content: center;
    }

    &>.profile-section>.profile-details>.followers, &>.profile-section>.profile-details>.following{
        grid-column: 1/2;
        grid-row: 2/3;
        // background: red;
        display: grid;
        // justify-content: center;
        align-content: start;
        gap: 1rem;
        display: none;

    }

    &>.profile-section>.profile-details>.followers>div, &>.profile-section>.profile-details>.following>div{
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: max(25px);
        justify-items: center;
        align-items: center;
        column-gap: 1rem;
        width: 250px;
        margin: 0 auto;

        &>p{
            justify-self: start;
        }

        &>button{
            justify-self: end;
            padding: 5px;
            border: none;
            background: rgb(124, 184, 239);
            color: aliceblue;
            border-radius: 5px;
            font-weight: 600;
            box-shadow: 0px 1px 3px 1px #cac7c7;

        &:hover{
            cursor: pointer;
            background-color: #2694ca;
        }
    
        &:active{
            transform: scale(0.95);
        }
        }
    }
`;

const Profile = ()=>{
    const location = useLocation();
    const [profileDetails, setProfileDetails] = useState({posts:[], followers:[], following: []});

    async function getProfileData(){
        const profileData = await getSingleDoc(location.state.refId);
        setProfileDetails(profileData);
    }

    useEffect(()=>{
        getProfileData();
    }, [])

    const handleClick = (e)=>{
        const postImages = document.querySelector('.posted-image');
        const menuFollowers = document.querySelector('.followers');
        const menuFollowing = document.querySelector('.following');
        if(e.target.classList.contains('menu-posts')){
            postImages.setAttribute('style', 'display: grid');
            menuFollowers.setAttribute('style', 'display: none;');
            menuFollowing.setAttribute('style', 'display: none;');

        }
        if(e.target.classList.contains('menu-followers')){
            postImages.setAttribute('style', 'display: none');
            menuFollowers.setAttribute('style', 'display: grid;');
            menuFollowing.setAttribute('style', 'display: none;');
        }
        if(e.target.classList.contains('menu-following')){
            postImages.setAttribute('style', 'display: none');
            menuFollowers.setAttribute('style', 'display: none;');
            menuFollowing.setAttribute('style', 'display: grid;');
        }
    }

    return(
        <ProfileGrid>
            <HeaderMenu username={location.state.username} userRefId={location.state.refId}/>
            <div className="profile-section">
                <div className="user-name">
                    <p>{location.state.username}</p>
                </div>
                <div className="profile-details">
                    <div className="profile-menu">
                        <p className="menu-posts" onClick={handleClick}>Posts<br /><span>{profileDetails.posts.length}</span></p>
                        <p className="menu-followers" onClick={handleClick}>Followers<br /><span>{profileDetails.followers.length}</span></p>
                        <p className="menu-following" onClick={handleClick}>Following<br /><span>{profileDetails.following.length}</span></p>
                    </div>
                    <div className="posted-image">
                        {(profileDetails.posts.length !== 0)?profileDetails.posts.map(post=>{
                            return(
                                <img src={post.imgUrl} alt="posted image"/>
                            )
                        }):<Loader color="gray"/>}
                    </div>
                    <div className="followers">
                        {(profileDetails.followers.length !== 0)?profileDetails.followers.map(post=>{
                            return(
                                <div>
                                <p>{post}</p>
                                <button>Follow</button>
                                </div>
                            )
                        }):<Loader color="gray"/>}
                    </div>
                    <div className="following">
                        {(profileDetails.following.length !== 0)?profileDetails.following.map(post=>{
                            return(
                                <div>
                                    <p>{post}</p>
                                    <button>Unfollow</button>
                                </div>
                            )
                        }):<Loader color="gray"/>}
                    </div>
                </div>
            </div>
        </ProfileGrid>
    )
}

export default Profile;