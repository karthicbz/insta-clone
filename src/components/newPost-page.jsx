import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../scripts/uploadToFirebase";
import HeaderMenu from "./headerMenu";
import styled from "styled-components";
import Loader from "./loader";
import { Grid } from "./main-page";

const NewPostGrid = styled(Grid)`
    display: grid;
    grid-template: max-content 1fr/80% 1fr;
    align-items: center;
    height: 100%;
    width: 100%;

    &>p{
        background: #b3d1f5;
        color: aliceblue;
    }

    &>.header-menu{
        background:#b3d1f5;
    }

    &>.header-menu>a{
        text-decoration: none;
    }

    &>.header-menu>a>span{
        color: aliceblue;
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
        font-size:0.85rem;
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
        margin-top: -30px;
    }

    &>.post-creator>form>.post-desc{
        padding: 8px;
        font-size: 0.9rem;
        resize: none;
        border-radius: 8px;
    }

    &>.post-creator>form>.create-post{
        padding: 10px;
        border-radius: 8px;
        background-color: rgb(124, 184, 239);
        border: none;
        color: white;
        font-weight: 600;
    }

    .post-creator>form>.create-post:active{
        transform: scale(0.95);
        background-color: #2694ca;
    }
    `;

const NewpostPage = ()=>{
    const location = useLocation();
    const [imageUrl, setImageUrl] = useState('');
    const [imageDetails, setImageDetails] = useState('');
    const [description, setDescription] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    
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
        if(imageDetails !== ''){
            setLoading(true);
            const uploadStatus = await uploadFile(imageDetails, location.state.refId, description);
            setUploaded(uploadStatus);
        }else{
            alert("Can't post empty image");
        }
        // if(uploaded === true){
        //     navigate(`/${location.state.refId}`);
        // }
    }

    useEffect(()=>{
        if(uploaded === true){
            setLoading(false);
            navigate(`/${location.state.refId}`);
        }
    }, [uploaded])

    function handleDescription(e){
        setDescription(e.target.value);
    }

    return(
        <NewPostGrid>
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
                    <button className="create-post" onClick={uploadImage}>{(loading)?<Loader/>:'Create Post'}</button>
                </form>
            </div>
        </NewPostGrid>
    )
}

export default NewpostPage;