import app from "./firebaseConfig";
import {getFirestore, collection, addDoc} from 'firebase/firestore/lite';

const db = getFirestore(app);

async function saveUserCredentials(email, fullname, username, password){
    try{
        const doc = await addDoc(collection(db, 'credentials'), {
            email: email,
            fullname: fullname,
            username: username,
            password: password
        });
    }catch(e){
        console.error('error adding data', e);
    }
}

export default saveUserCredentials;
