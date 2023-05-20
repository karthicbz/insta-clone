import app from "./firebaseConfig";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";

const db = getFirestore(app);

const saveUserPost = async (refId, postDetails)=>{
    const docRef = doc(db, 'users', refId);
    try{
        await setDoc(docRef, {
            posts:postDetails
        }, {merge:true})
    }catch(err){
        console.error('Unable to save details', err);
    }
}

export default saveUserPost;