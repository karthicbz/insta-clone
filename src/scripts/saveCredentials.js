import app from "./firebaseConfig";
import {getFirestore, collection, addDoc} from 'firebase/firestore/lite';

const db = getFirestore(app);

async function saveUserCredentials(email, username, fullname, password){
    try{
        const doc = await addDoc(collection(db, 'credentials'), {
            username: username,
            email: email,
            fullname: fullname,
            password: password
        });
    }catch(e){
        console.error('error adding data', e);
    }
}

export default saveUserCredentials;
