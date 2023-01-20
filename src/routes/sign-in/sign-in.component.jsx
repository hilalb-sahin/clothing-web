import SignUpForm from "../../components/sign-up-form-email/sign-up.email.component";
import { 

    createUserDocumentFromAuth ,
    signInWithGooglePopup,


} from "../../utils/firebase/firebase-utils"

const SignIn = ()=> {

    //user doc Ref creates the user document in firebase
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        //we should get userDocRef no matter what. 
        const  userDocRef =  await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />

        </div>
    )
}

export default SignIn