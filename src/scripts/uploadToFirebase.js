import app from "./firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import saveUserPost from "./savePosts";
import getSingleDoc from "./getSingleUser";

const storage = getStorage(app);

async function uploadFile(imageRef, userRef, postDesc){//it uploads image to firebase, takes 3 arguments 
    //1.takes image object, 2.user ref id, 3.post description
    let postDetails = [];
    const storageRef = ref(storage, 'post/'+imageRef.name);
    const uploadedFile = await uploadBytes(storageRef, imageRef);
    console.log(uploadedFile.ref);
    const url = await getDownloadURL(ref(storage, 'post/'+imageRef.name));

    const posts = await getSingleDoc(userRef);
    console.log(posts);
    posts.posts.forEach(post=>{
        postDetails = [...postDetails, post];
    });

    console.log(postDetails);

    saveUserPost(userRef, [...postDetails, {
        imgUrl: url,
        likes: [],
        comments: [],
        created: Date.now(),
        userId: userRef,
        postId: userRef+Date.now(),
        description: postDesc,
    }]);

    return true;
}

export default uploadFile;