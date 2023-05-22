import app from "./firebaseConfig";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import getSingleDoc from "./getSingleUser";

const db = getFirestore(app);

const updateLikes = async (postId, currUser, userRefId)=>{
    let posts = [];
    let count = 0;
    let postPosition = 0;
    let likes = [];

    const docRef = doc(db, 'users', userRefId);

    const likedPost = await getSingleDoc(userRefId);
    likedPost.posts.forEach(post =>{
        posts = [...posts, post];
    });

    posts.filter(post =>{
        count += 1;
        if(post.postId === postId){
            postPosition = count - 1;
            post.likes.forEach(like=>{
                likes = [...likes, like];
            })
        }
    });

    if(likes.includes(currUser)){
        count = 0;
        likes.forEach(like=>{
            count += 1;
            if(like === currUser){
                likes = [...likes.slice(0, count-1), ...likes.slice(count)];
            }
        })
    }else{
        likes = [...likes, currUser];
    }

    await setDoc(docRef, {
        posts: [...posts.slice(0, postPosition),
            {...posts[postPosition], likes: likes},
            ...posts.slice(postPosition+1)
        ]
    }, {merge:true});

    return true;
}

export default updateLikes;