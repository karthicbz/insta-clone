import app from "./firebaseConfig";
import {getFirestore, doc, getDoc} from 'firebase/firestore/lite';

const db = getFirestore(app);

const getSingleDoc = async (refId)=>{
    const docRef = doc(db, 'users', refId);
    const singleDoc = await getDoc(docRef);

    return {username: singleDoc.data().username, following: singleDoc.data().following};
}

export default getSingleDoc;