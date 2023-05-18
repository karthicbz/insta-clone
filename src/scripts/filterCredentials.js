import app from "./firebaseConfig";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

const db = getFirestore(app);

// const credentials = [];

async function checkCredentials(username, email){
    const details = await getDocs(collection(db, "credentials"));
    // details.forEach(detail=>{
    //     credentials = [...credentials, {email: detail.email, username: detail.username}];
    // });
    details.filter(detail=>{
        if(detail.email !== email && detail.username !== username){
            return true;
        }else{
            return false;
        }
    });
}

export default checkCredentials;