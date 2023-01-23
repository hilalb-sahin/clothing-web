//import firebase 
//initialize app creates an app for you based on some kind of config
import { initializeApp } from 'firebase/app';
import { 
    getAuth , 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import {
    getFirestore,
    doc, //retrieve documents 
    getDoc, //get document data
    setDoc //set document data 
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNNip80FBOpygrfdt5ZqW6IxC25W5cueE",
    authDomain: "crwn-clothing-db-18779.firebaseapp.com",
    projectId: "crwn-clothing-db-18779",
    storageBucket: "crwn-clothing-db-18779.appspot.com",
    messagingSenderId: "203586022421",
    appId: "1:203586022421:web:8fcfe3f88281393a99b21c"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  //googleauthprovider is a class 
  //you can have different providers for different pages 
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt : "select_account"
  });

  export const auth = getAuth();
  //functions calling sign in methods 
  export const signInWithGooglePopup =  () => signInWithPopup(auth, provider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider)

  export const db = getFirestore(); //this points out to our database 

  //userAuth is what we get from google
  export const createUserDocumentFromAuth = async ( userAuth , additionalInformation ={}) =>{
    //check if existing document reference exists 
    //doc takes 3 arguments, the database , collection, identifier(tells what it is)
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid )
    console.log(userDocRef)

    //snapshot is the data, and we use getDoc to get the data from that docRef
    //the snapshot is an object now, you can check if something exists in it
    //uses the same id that points out a place in database (userAuth.id)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists())



    //if user data does not exist.  create / set the document with data in collection
    if(!userSnapshot.exists()){
        const { displayName, email }=  userAuth; //getting those data
        const createdAt = new Date();
        
        try{
            //try to set the document with userDocRef
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch (error) {
            console.log('error creating the user' , error.message)
        }
    }
    //if user data exists
    return userDocRef;
  }


  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password ) return;
    return await createUserWithEmailAndPassword(auth,email,password);
  }
  
  export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password ) return;
    return await signInWithEmailAndPassword(auth,email,password);
  }
  
   