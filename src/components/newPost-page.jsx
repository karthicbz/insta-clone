import { Link, useLocation } from "react-router-dom";

const NewpostPage = ()=>{
    const location = useLocation();

    function getImageBlob(){
        
    }

    return(
        <div>
            <Link to={`/${location.state.refId}`}><span class="material-symbols-outlined">home</span></Link>
            <img src="#" alt="post image"/>
            <label htmlFor="myFile"><span class="material-symbols-outlined">add_a_photo</span></label>
            <input type="file" id="myFile" name="myFile"/>
            <form>
                <textarea className="post-desc" placeholder="say something about your post..."></textarea>
                <button className="create-post">Create Post</button>
            </form>
        </div>
    )
}

export default NewpostPage;