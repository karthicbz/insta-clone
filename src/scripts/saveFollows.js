import app from "./firebaseConfig";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";

const db = getFirestore(app);

const saveFollowsFollowing = async (refid, followList)=>{
    const docRef = doc(db, 'users', refid);
    try{
        await setDoc(docRef, {
            following: followList,
        }, {merge: true});
    }catch(e){
        console.error('error saving data', e);
    }
}

export default saveFollowsFollowing;