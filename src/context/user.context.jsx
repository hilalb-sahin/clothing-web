import { createContext, useState, useEffect } from 'react'

import { onAuthStateChangedListener  , createUserDocumentFromAuth} from '../utils/firebase/firebase-utils';


//builds context for us , pass default value 
//the actual value you want to access
export const UserContext =  createContext({
    currentUser: null,
    setCurrentUser: ()=> null, 
});


//receives children returns usercontext
//.Provider is the component tht wraps around any other components you need to access
//provider allows to access any child component
export const UserProvider = ({ children }) => {
    //store user object with hooks
    const [currentUser , setCurrentUser] = useState(null);
    //generate the actual value, this is object
    //allows any child component to access what is inside useState
    const value = { currentUser, setCurrentUser};
   


    //run this once when the component mounts
    //controls all auth change
    useEffect(()=> {
       const unsubscribe =  onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
        console.log(user);
       })
       return unsubscribe;
    }, []);

    return <UserContext.Provider value= {value}> { children }</UserContext.Provider>
};

//the value  of the usercontext is current user and setter function

