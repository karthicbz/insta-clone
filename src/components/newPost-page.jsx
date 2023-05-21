import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../scripts/uploadToFirebase";
import HeaderMenu from "./headerMenu";
import styled from "styled-components";

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
    
    &>.post-creator{
        grid-column: 1/3;
        grid-row: 2/3;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        // border: 1px solid gray;
        // width: 700px;
        padding: 1rem;
        gap: 10px;
    }

    &>.post-creator>.post-preview{
        // background-color: red;
        font-size: 350px;
        width: 350px;
        height: 350px;
        box-shadow: 0px 2px 7px 2px rgb(202, 200, 200);   
        border-radius: 8px;
    }

    &>.post-creator>.select-photo{
        background: violet;
        width: 350px;
        padding: 8px;
        border-radius: 8px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    &>.post-creator>.select-photo:hover, .post-creator>form>.create-post:hover{
        cursor: pointer;
    }

    &>.post-creator>.select-photo:active{
        background-color: #b05fb0;
        transform: scale(0.95);
    }

    &>.post-creator>.myFile{
        opacity: 0;
    }

    &>.post-creator>form{
        display: flex;
        flex-direction: column;
        width: 350px;
        gap: 8px;
        margin-top: -32px;
    }

    &>.post-creator>form>.post-desc{
        font-family: sans;
        padding: 8px;
        font-size: 0.9rem;
        resize: none;
    }

    &>.post-creator>form>.create-post{
        padding: 8px;
        border-radius: 8px;
        background-color: rgb(67, 167, 67);
        border: none;
        color: white;
    }

    .post-creator>form>.create-post:active{
        transform: scale(0.95);
        background-color: rgb(51, 130, 51);
    }
    `;

const NewpostPage = ()=>{
    const location = useLocation();
    const [imageUrl, setImageUrl] = useState('');
    const [imageDetails, setImageDetails] = useState('');
    const [description, setDescription] = useState('');
    const [uploaded, setUploaded] = useState(false);
    
    const navigate = useNavigate();

    function getImageBlob(e){
        // const postPreview = document.querySelector('.post-preview');
        const currFile = e.target.files[0];
        setImageUrl(URL.createObjectURL(currFile));
        setImageDetails(currFile);
        // for(let file of currFile){
        //     // postPreview.src = URL.
        //     console.log(file);
        //     setImageUrl(URL.createObjectURL(file));
        // }
    }

    async function uploadImage(e){
        e.preventDefault();
        const uploadStatus = await uploadFile(imageDetails, location.state.refId, description);
        setUploaded(uploadStatus);
        // if(uploaded === true){
        //     navigate(`/${location.state.refId}`);
        // }
    }

    useEffect(()=>{
        if(uploaded === true){
            navigate(`/${location.state.refId}`);
        }
    }, [uploaded])

    function handleDescription(e){
        setDescription(e.target.value);
    }

    return(
        <Grid>
            <HeaderMenu username={location.state.username} userRefId={location.state.refId}/>
            {/* <Link to={`/${location.state.refId}`}><span class="material-symbols-outlined">home</span></Link> */}
            <div className="post-creator">
                {(imageUrl === '')?<span className="material-symbols-outlined post-preview">image</span>
                                :<img src={imageUrl} alt="post image" className="post-preview"/>}
                <label htmlFor="myFile" className="select-photo"><span class="material-symbols-outlined">add_a_photo</span>Select Photo</label>
                <input type="file" id="myFile" name="myFile" className="myFile" onChange={getImageBlob}/>
                <form>
                    <textarea rows="5" className="post-desc" placeholder="say something about your post..."
                    onChange={handleDescription}></textarea>
                    <button className="create-post" onClick={uploadImage}>Create Post</button>
                </form>
            </div>
        </Grid>
    )
}

export default NewpostPage;