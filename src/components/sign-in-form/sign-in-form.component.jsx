import { useState } from "react";

import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup, 
    createUserDocumentFromAuth } from "../../utils/firebase/firebase-utils";

import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

//set default values
const defaultFormFields = {
    email : '',
    password : '',
}
const SignInForm = () => {
    const [formFields, setFormFields ]= useState(defaultFormFields);
    const { email , password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    //user doc Ref creates the user document in firebase
    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try{
            const response = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response);
            resetFormFields();
        }catch(error) {
            if(error.code === "auth/user-not-found"){
                alert("User not found")
            }
            else if(error.code === "auth/wrong-password"){
                alert("Incorrect password for email")
            }
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
    <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput  label = "Email" type= "email" required name="email" value={email} onChange={handleChange}/> 
            <FormInput  label = "Password" type= "password" required name="password" value={password} onChange={handleChange}/> 
            <div className="buttons-container">
                <Button type="submit">Sign in</ Button>
                <Button  type = 'button' buttonType='google' onClick = {signInWithGoogle}>Google sign in </Button>

            </div>

        </form>

    </div>
    )
}

export default SignInForm; 