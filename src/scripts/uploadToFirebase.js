import app from "./firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import saveUserPost from "./savePosts";
import { serverTimestamp } from "firebase/firestore/lite";
import getSingleDoc from "./getSingleUser";

const storage = getStorage(app);

async function uploadFile(imageRef, userRef){
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
    // postDetails = [...postDetails, {
    //     imgUrl: url,
    //     likes: [],
    //     comments: [],
    //     created: Date.now(),
    // }]
    // console.log(url);
    saveUserPost(userRef, [...postDetails, {
        imgUrl: url,
        likes: [],
        comments: [],
        created: Date.now(),
    }]);
}

export default uploadFile;