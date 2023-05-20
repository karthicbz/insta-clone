import app from "./firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "@firebase/storage";

const storage = getStorage(app);

async function uploadFile(imageRef){
    const storageRef = ref(storage, 'post/'+imageRef.name);
    const uploadedFile = await uploadBytes(storageRef, imageRef);
    console.log(uploadedFile.ref);
    const url = await getDownloadURL(ref(storage, 'post/'+imageRef.name));
    console.log(url);
}

export default uploadFile;