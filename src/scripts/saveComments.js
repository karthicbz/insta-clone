import app from "./firebaseConfig";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import allUserDetails from "./getAllUsers";
import getSingleDoc from "./getSingleUser";

const db = getFirestore(app);

const saveComments = async (commentPostId, currUser, comment, userRefId)=>{
    let posts = []
    let count = 0;
    let postPosition = 0;
    // const allUsers = await allUserDetails();
    const commentedDoc = await getSingleDoc(userRefId);
    let comments = [];
    const docRef = doc(db, 'users', userRefId);
    commentedDoc.posts.forEach(post=>{
        posts = [...posts, post]
    });
    posts.filter(post =>{
        count += 1;
        if(post.postId === commentPostId){
            postPosition = count - 1;
            post.comments.forEach(comment=>{
                comments = [...comments, comment];
            })
        }
    });
    try{
        await setDoc(docRef, {
            posts: [...posts.slice(0, postPosition),
                {...posts[postPosition], comments: [...comments, {user: currUser, comment: comment}]},
                ...posts.slice(postPosition+1)
            ]
        }, {merge:true});
    }catch(error){
        console.error('unable to save comment', error);
    }
    return true;
    // console.log(`pp: ${postPosition}, com: ${comments}, user: ${currUser}, curCom: ${comment}`);
}

export default saveComments;