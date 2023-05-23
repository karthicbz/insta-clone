import { useLocation } from "react-router-dom"
import HeaderMenu from "./headerMenu";
import { Grid } from "./main-page";
import styled from "styled-components";

const ProfileGrid = styled(Grid)`
    &>.profile-section{
        grid-column: 1/3;
        grid-row: 2/3;
        height: 100%;
    }
`;

const Profile = ()=>{
    const location = useLocation();
    console.log(location);
    return(
        <ProfileGrid>
            <HeaderMenu username={location.state.username} userRefId={location.state.refId}/>
            <div className="profile-section">
                <p>{location.state.username}</p>
            </div>
        </ProfileGrid>
    )
}

export default Profile;