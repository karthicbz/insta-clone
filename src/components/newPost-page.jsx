import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import uploadFile from "../scripts/uploadToFirebase";

const NewpostPage = ()=>{
    const location = useLocation();
    const [imageUrl, setImageUrl] = useState('');
    const [imageDetails, setImageDetails] = useState('');

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

    function uploadImage(e){
        e.preventDefault();
        uploadFile(imageDetails, location.state.refId);
    }

    return(
        <div>
            <Link to={`/${location.state.refId}`}><span class="material-symbols-outlined">home</span></Link>
            <img src={imageUrl} alt="post image" className="post-preview"/>
            <label htmlFor="myFile"><span class="material-symbols-outlined">add_a_photo</span></label>
            <input type="file" id="myFile" name="myFile" onChange={getImageBlob}/>
            <form>
                <textarea className="post-desc" placeholder="say something about your post..."></textarea>
                <button className="create-post" onClick={uploadImage}>Create Post</button>
            </form>
        </div>
    )
}

export default NewpostPage;