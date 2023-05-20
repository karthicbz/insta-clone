import app from "./firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import saveUserPost from "./savePosts";
import { serverTimestamp } from "firebase/firestore/lite";

const storage = getStorage(app);

async function uploadFile(imageRef, userRef){
    const storageRef = ref(storage, 'post/'+imageRef.name);
    const uploadedFile = await uploadBytes(storageRef, imageRef);
    console.log(uploadedFile.ref);
    const url = await getDownloadURL(ref(storage, 'post/'+imageRef.name));
    // console.log(url);
    saveUserPost(userRef, {
        imgUrl: url,
        likes: [],
        comments: [],
        created: serverTimestamp(),
    });
}

export default uploadFile;