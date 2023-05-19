import app from "./firebaseConfig";
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';

const db = getFirestore(app);

const allUserDetails = async ()=>{
    let userDetails = [];
    try{
        const details = await getDocs(collection(db, 'users'));
        details.forEach(detail=>{
            userDetails = [...userDetails, detail.data()];
        })
    }catch(e){
        console.error('error fetching details', e);
    }
    return userDetails;
}

export default allUserDetails;