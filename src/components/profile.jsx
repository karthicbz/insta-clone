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

    &>.profile-section>p{
        grid-column: 1/2;
        grid-row: 1/2;
    }

    &>.profile-section>.profile-details{
        grid-column: 1/2;
        grid-row: 2/3;
        display: grid;
        grid-template: 10% 90%/1fr;
    }

    &>.profile-section>.profile-details>.profile-menu{
        grid-column: 1/2;
        grid-row: 1/2;
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        justify-content: center;
    }

    &>.profile-section>.profile-details>.posted-image, .profile-section>.profile-details>.followers, .profile-section>.profile-details>.following{
        grid-column: 1/2;
        grid-row: 2/3;
    }
`;

const Profile = ()=>{
    const location = useLocation();
    const [profileDetails, setProfileDetails] = useState([]);

    async function getProfileData(){
        const profileData = await getSingleDoc(location.state.refId);
        setProfileDetails(profileData);
    }

    useEffect(()=>{
        getProfileData();
    }, [])

    return(
        <ProfileGrid>
            <HeaderMenu username={location.state.username} userRefId={location.state.refId}/>
            <div className="profile-section">
                <p>{location.state.username}</p>
                <div className="profile-details">
                    <div className="profile-menu">
                        <p className="menu-posts">Posts</p>
                        <p className="menu-followers">Followers</p>
                        <p className="menu-following">Following</p>
                    </div>
                    <div className="posted-image">
                        {(profileDetails.length !== 0)?profileDetails.posts.map(post=>{
                            return(
                                <img src={post.imgUrl} alt="posted image"/>
                            )
                        }):<Loader />}
                    </div>
                    <div className="followers">
                        {(profileDetails.length !== 0)?profileDetails.followers.map(post=>{
                            return(
                                <p>{post}</p>
                            )
                        }):<Loader/>}
                    </div>
                    <div className="following">
                        {(profileDetails.length !== 0)?profileDetails.following.map(post=>{
                            return(
                                <p>{post}</p>
                            )
                        }):<Loader/>}
                    </div>
                </div>
            </div>
        </ProfileGrid>
    )
}

export default Profile;