import app from "./firebaseConfig";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import getSingleDoc from "./getSingleUser";

const db = getFirestore(app);

const saveFollowers = async (followerName, userRef)=>{
    // console.log(followerName, userRef);
    let followers = [];
    const docRef = doc(db, 'users', userRef);
    const followersList = await getSingleDoc(userRef);
    followersList.followers.forEach(follower=>{
        followers = [...followers, follower]
    });
    try{
        await setDoc(docRef, {
            followers: [...followers, followerName],
        }, {merge: true});
    }catch(err){
        console.error('unable to save followers', err);
    }
}

export default saveFollowers;