import app from "./firebaseConfig";
import {getFirestore, collection, addDoc, setDoc, doc} from 'firebase/firestore/lite';
import hashCode from "./createHash";

const db = getFirestore(app);

async function saveUserCredentials(email, fullname, username, password){
    let docRef = '';
    try{
        const newDoc = await addDoc(collection(db, 'users'), {
            email: email,
            fullname: fullname,
            username: username,
            password: hashCode(password),
            posts: [],
            following: [],
            followers: [],
        });
        // docRef = doc.id;
        await setDoc(doc(db, 'users', newDoc.id), {
            refId: newDoc.id,
        }, {merge:true});
        docRef = newDoc.id;
    }catch(e){
        console.error('error adding data', e);
    }
    return docRef;
}

export default saveUserCredentials;
