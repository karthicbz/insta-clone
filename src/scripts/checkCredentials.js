import app from "./firebaseConfig";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

const db = getFirestore(app);

async function checkCredentials(userId, password){
    const validData = {userId: false, password: false};
    try{
    const details = await getDocs(collection(db, 'credentials'));
    details.forEach(detail=>{
        if(userId === detail.data().username){
            validData.userId = true
        }

        if(userId === detail.data().email){
            validData.userId = true;
        }

        if(password === detail.data().password){
            validData.password = true;
        }
    });
    }catch(e){
        console.error('unable to fetch details', e);
    }
    return validData;
}

export default checkCredentials;