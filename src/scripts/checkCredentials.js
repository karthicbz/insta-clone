import app from "./firebaseConfig";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

const db = getFirestore(app);

async function checkCredentials(userId, password){
    const validData = {userId: false, password: false, userRef: ''};
    try{
    const details = await getDocs(collection(db, 'users'));
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

        if(password === detail.data().password && userId === detail.data().email || password === detail.data().password && userId === detail.data().username){
            validData.userRef = detail.id;
        }
    });
    }catch(e){
        console.error('unable to fetch details', e);
    }
    return validData;
}

export default checkCredentials;