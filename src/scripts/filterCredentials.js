import app from "./firebaseConfig";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

const db = getFirestore(app);

async function getCredentials(){
    console.log('getting credentials...');
    let credentials = [];
    const details = await getDocs(collection(db, "credentials"));
    details.forEach(detail=>{
        credentials = [...credentials, {email: detail.data().email, username: detail.data().username}];
    });
    return credentials;
}

async function checkCredentials(username, email){
    let dataFound = {username: false, email: false};
    let details = await getCredentials();
    if(details.length !== 0){
        details.filter(detail=>{
            // console.log(detail.email, email);
            if(detail.email === email){
                dataFound.email = true;
            }

            if(detail.username === username){
                dataFound.username = true;
            }
        });
    }
    return dataFound;
    
}

export default checkCredentials;